using System.Data;
using BuyTogether.Server.Constants;
using BuyTogether.Server.Data;
using BuyTogether.Server.DTOs.Buyer;
using BuyTogether.Server.Helpers;
using BuyTogether.Server.Interfaces;
using BuyTogether.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BuyTogether.Server.Services
{
    public class BuyerDealService : IBuyerDealService
    {
        private const int PaymentWindowHours = 24;

        private readonly AppDbContext _context;

        public BuyerDealService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<BuyerGroupDetailDto> JoinPropertyGroupAsync(Guid propertyId, Guid buyerId)
        {
            await EnsureBuyerExistsAsync(buyerId);

            var nowUtc = DateTime.UtcNow;
            await using var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);

            var property = await _context.Properties
                .SingleOrDefaultAsync(item => item.Id == propertyId && item.Status == PropertyStatuses.Available);

            if (property == null)
            {
                throw new KeyNotFoundException("Property not found.");
            }

            var group = await LoadLatestActiveGroupForUpdateAsync(propertyId);
            if (group != null && await TryCancelExpiredGroupAsync(group, property, nowUtc))
            {
                group = null;
            }

            if (group == null)
            {
                group = new Group
                {
                    PropertyId = propertyId,
                    CreatedBy = buyerId,
                    MaxMembers = BuyerPricingCalculator.ResolveRequiredGroupSize(property),
                    CurrentMembers = 0,
                    Status = GroupStatuses.Open,
                    CreatedAt = nowUtc,
                    UpdatedAt = nowUtc,
                    Members = new List<GroupMember>()
                };

                _context.Groups.Add(group);
            }

            if (!string.Equals(group.Status, GroupStatuses.Open, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("Only open groups can accept new buyers.");
            }

            if (group.Members?.Any(member => member.UserId == buyerId) == true)
            {
                throw new InvalidOperationException("Buyer has already joined this group.");
            }

            if (group.CurrentMembers >= group.MaxMembers)
            {
                throw new InvalidOperationException("This group is already full.");
            }

            var membership = new GroupMember
            {
                Group = group,
                UserId = buyerId,
                Role = group.CurrentMembers == 0 ? "Creator" : "Member",
                JoinedAt = nowUtc
            };

            group.Members ??= new List<GroupMember>();
            group.Members.Add(membership);

            _context.GroupMembers.Add(membership);
            group.CurrentMembers += 1;
            group.UpdatedAt = nowUtc;

            await _context.SaveChangesAsync();

            await AddNotificationAsync(
                buyerId,
                NotificationTypes.GroupJoined,
                "Group joined successfully",
                $"You joined the buyer group for {property.Title}.",
                group.Id,
                property.Id,
                nowUtc);

            if (group.CurrentMembers == group.MaxMembers)
            {
                await TransitionGroupToFullAsync(group, property, nowUtc);
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return await GetGroupRequiredAsync(group.Id, buyerId);
        }

        public async Task LeaveGroupAsync(Guid groupId, Guid buyerId)
        {
            await EnsureBuyerExistsAsync(buyerId);

            var nowUtc = DateTime.UtcNow;
            await using var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);

            var group = await LoadGroupForUpdateAsync(groupId);
            if (group == null)
            {
                throw new KeyNotFoundException("Group not found.");
            }

            if (!string.Equals(group.Status, GroupStatuses.Open, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("You can only leave a group while it is open.");
            }

            var membership = group.Members?.SingleOrDefault(member => member.UserId == buyerId);
            if (membership == null)
            {
                throw new KeyNotFoundException("Buyer is not a member of this group.");
            }

            group.Members?.Remove(membership);
            _context.GroupMembers.Remove(membership);
            group.CurrentMembers = Math.Max(group.CurrentMembers - 1, 0);
            group.UpdatedAt = nowUtc;

            if (group.CurrentMembers == 0)
            {
                _context.Groups.Remove(group);
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
        }

        public async Task<IReadOnlyCollection<BuyerGroupSummaryDto>> GetBuyerGroupsAsync(Guid buyerId)
        {
            await EnsureBuyerExistsAsync(buyerId);

            var membershipGroupIds = await _context.GroupMembers
                .AsNoTracking()
                .Where(member => member.UserId == buyerId)
                .Select(member => member.GroupId)
                .Distinct()
                .ToListAsync();

            if (membershipGroupIds.Count == 0)
            {
                return new List<BuyerGroupSummaryDto>();
            }

            await CancelExpiredGroupsIfNeededAsync(membershipGroupIds);

            var groups = await _context.Groups
                .AsNoTracking()
                .Include(group => group.Property)
                .Include(group => group.Members)
                .Include(group => group.Payments)
                .Include(group => group.Ownerships)
                .Where(group => membershipGroupIds.Contains(group.Id))
                .OrderByDescending(group => group.UpdatedAt ?? group.CreatedAt)
                .ToListAsync();

            return groups
                .Select(group => MapGroupSummary(group, buyerId))
                .ToList();
        }

        public async Task<BuyerGroupDetailDto?> GetGroupAsync(Guid groupId, Guid buyerId)
        {
            await EnsureBuyerExistsAsync(buyerId);

            await CancelExpiredGroupsIfNeededAsync(new[] { groupId });

            var group = await LoadGroupForReadAsync(groupId);
            if (group == null || group.Members?.Any(member => member.UserId == buyerId) != true)
            {
                return null;
            }

            return MapGroupDetail(group, buyerId);
        }

        public async Task<BuyerPaymentSummaryDto?> GetPaymentSummaryAsync(Guid groupId, Guid buyerId)
        {
            await EnsureBuyerExistsAsync(buyerId);

            await CancelExpiredGroupsIfNeededAsync(new[] { groupId });

            var group = await LoadGroupForReadAsync(groupId);
            if (group == null || group.Members?.Any(member => member.UserId == buyerId) != true)
            {
                return null;
            }

            var payment = group.Payments?.SingleOrDefault(item => item.UserId == buyerId);
            return BuildPaymentSummary(group, payment);
        }

        public async Task<BuyerPaymentSummaryDto?> ProcessPaymentAsync(Guid groupId, Guid buyerId, ProcessPaymentDto request)
        {
            await EnsureBuyerExistsAsync(buyerId);

            var nowUtc = DateTime.UtcNow;
            await using var transaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);

            var group = await LoadGroupForUpdateAsync(groupId);
            if (group == null)
            {
                throw new KeyNotFoundException("Group not found.");
            }

            if (group.Members?.Any(member => member.UserId == buyerId) != true)
            {
                throw new UnauthorizedAccessException("Buyer is not a member of this group.");
            }

            if (group.Property == null)
            {
                throw new KeyNotFoundException("Property not found for this group.");
            }

            await TryCancelExpiredGroupAsync(group, group.Property, nowUtc);

            if (string.Equals(group.Status, GroupStatuses.Cancelled, StringComparison.OrdinalIgnoreCase))
            {
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return BuildPaymentSummary(group, group.Payments?.SingleOrDefault(item => item.UserId == buyerId));
            }

            if (!string.Equals(group.Status, GroupStatuses.Full, StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(group.Status, GroupStatuses.Locked, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("Payments are only available when the group is ready for payment.");
            }

            var expectedAmount = group.FinalPricePerBuyer > 0
                ? group.FinalPricePerBuyer
                : BuyerPricingCalculator.CalculateFinalPricePerBuyer(
                    group.Property.Price,
                    group.Property.DiscountType,
                    group.Property.DiscountValue,
                    group.MaxMembers);

            if (decimal.Round(request.Amount, 2, MidpointRounding.AwayFromZero) != expectedAmount)
            {
                throw new InvalidOperationException($"The payable amount for this group is {expectedAmount:0.00}.");
            }

            if (group.PaymentDueAt.HasValue && group.PaymentDueAt.Value < nowUtc)
            {
                await TryCancelExpiredGroupAsync(group, group.Property, nowUtc);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return BuildPaymentSummary(group, group.Payments?.SingleOrDefault(item => item.UserId == buyerId));
            }

            var payment = group.Payments?.SingleOrDefault(item => item.UserId == buyerId);
            if (payment == null)
            {
                payment = new Payment
                {
                    GroupId = group.Id,
                    UserId = buyerId,
                    Amount = expectedAmount
                };

                _context.Payments.Add(payment);
                group.Payments ??= new List<Payment>();
                group.Payments.Add(payment);
            }

            payment.Amount = expectedAmount;
            payment.TransactionId = request.TransactionId?.Trim();
            payment.PaymentDate = nowUtc;
            payment.UpdatedAt = nowUtc;

            if (string.Equals(request.RequestedStatus, PaymentStatuses.Failed, StringComparison.OrdinalIgnoreCase))
            {
                payment.PaymentStatus = PaymentStatuses.Failed;
                group.Status = GroupStatuses.Locked;
                group.UpdatedAt = nowUtc;

                await AddNotificationAsync(
                    buyerId,
                    NotificationTypes.PaymentFailure,
                    "Payment failed",
                    $"Your payment for {group.Property.Title} was marked as failed. You can retry before the deadline.",
                    group.Id,
                    group.PropertyId,
                    nowUtc);
            }
            else
            {
                payment.PaymentStatus = PaymentStatuses.Paid;
                group.Status = GroupStatuses.Locked;
                group.UpdatedAt = nowUtc;

                await AddNotificationAsync(
                    buyerId,
                    NotificationTypes.PaymentSuccess,
                    "Payment received",
                    $"Your payment for {group.Property.Title} was received successfully.",
                    group.Id,
                    group.PropertyId,
                    nowUtc);
            }

            await TryCompleteGroupAsync(group, group.Property, nowUtc);

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return BuildPaymentSummary(group, payment);
        }

        public async Task<IReadOnlyCollection<BuyerOwnershipDto>> GetOwnershipsAsync(Guid buyerId)
        {
            await EnsureBuyerExistsAsync(buyerId);

            return await _context.Ownerships
                .AsNoTracking()
                .Include(ownership => ownership.Property)
                .Where(ownership => ownership.BuyerId == buyerId)
                .OrderByDescending(ownership => ownership.CreatedAt)
                .Select(ownership => new BuyerOwnershipDto
                {
                    Id = ownership.Id,
                    GroupId = ownership.GroupId,
                    PropertyId = ownership.PropertyId,
                    PropertyTitle = ownership.Property!.Title,
                    PropertyLocation = ownership.Property.Location,
                    OwnershipPercentage = ownership.OwnershipPercentage,
                    CreatedAt = ownership.CreatedAt
                })
                .ToListAsync();
        }

        private async Task EnsureBuyerExistsAsync(Guid buyerId)
        {
            var buyer = await _context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(user => user.Id == buyerId);

            if (buyer == null)
            {
                throw new KeyNotFoundException("Buyer not found.");
            }

            var isBuyer = UserRoles.BuyerEquivalentRoles.Any(role =>
                string.Equals(role, buyer.Role, StringComparison.OrdinalIgnoreCase));

            if (!isBuyer)
            {
                throw new UnauthorizedAccessException("This action is only available to buyers.");
            }
        }

        private async Task<Group?> LoadLatestActiveGroupForUpdateAsync(Guid propertyId)
        {
            var groups = await _context.Groups
                .Include(group => group.Property)
                .Include(group => group.Members)
                    .ThenInclude(member => member.User)
                .Include(group => group.Payments)
                .Include(group => group.Ownerships)
                .Where(group => group.PropertyId == propertyId && GroupStatuses.Active.Contains(group.Status))
                .OrderByDescending(group => group.CreatedAt)
                .ToListAsync();

            return groups.FirstOrDefault();
        }

        private async Task<Group?> LoadGroupForUpdateAsync(Guid groupId)
        {
            return await _context.Groups
                .Include(group => group.Property)
                .Include(group => group.Members)
                    .ThenInclude(member => member.User)
                .Include(group => group.Payments)
                .Include(group => group.Ownerships)
                .SingleOrDefaultAsync(group => group.Id == groupId);
        }

        private async Task<Group?> LoadGroupForReadAsync(Guid groupId)
        {
            return await _context.Groups
                .AsNoTracking()
                .Include(group => group.Property)
                .Include(group => group.Members)
                    .ThenInclude(member => member.User)
                .Include(group => group.Payments)
                .Include(group => group.Ownerships)
                .SingleOrDefaultAsync(group => group.Id == groupId);
        }

        private async Task<BuyerGroupDetailDto> GetGroupRequiredAsync(Guid groupId, Guid buyerId)
        {
            var group = await LoadGroupForReadAsync(groupId);
            if (group == null)
            {
                throw new KeyNotFoundException("Group not found.");
            }

            return MapGroupDetail(group, buyerId);
        }

        private async Task TransitionGroupToFullAsync(Group group, Property property, DateTime nowUtc)
        {
            group.TotalPriceSnapshot = property.Price;
            group.DiscountTypeSnapshot = BuyerPricingCalculator.NormalizeDiscountType(property.DiscountType);
            group.DiscountValueSnapshot = property.DiscountValue;
            group.DiscountAmount = BuyerPricingCalculator.CalculateDiscountAmount(property.Price, property.DiscountType, property.DiscountValue);
            group.FinalPricePerBuyer = BuyerPricingCalculator.CalculateFinalPricePerBuyer(property.Price, property.DiscountType, property.DiscountValue, group.MaxMembers);
            group.Status = GroupStatuses.Full;
            group.PaymentDueAt = nowUtc.AddHours(PaymentWindowHours);
            group.UpdatedAt = nowUtc;

            await EnsurePendingPaymentsAsync(group, nowUtc);

            var memberIds = group.Members?
                .Select(member => member.UserId)
                .Distinct()
                .ToList() ?? new List<Guid>();

            foreach (var memberId in memberIds)
            {
                await AddNotificationAsync(
                    memberId,
                    NotificationTypes.GroupFull,
                    "Group is now full",
                    $"Your group for {property.Title} reached {group.MaxMembers}/{group.MaxMembers}. Payments are now enabled.",
                    group.Id,
                    property.Id,
                    nowUtc);

                await AddNotificationAsync(
                    memberId,
                    NotificationTypes.PaymentReminder,
                    "Payment reminder",
                    $"Complete your payment of {group.FinalPricePerBuyer:0.00} before {group.PaymentDueAt:yyyy-MM-dd HH:mm} UTC.",
                    group.Id,
                    property.Id,
                    nowUtc);
            }
        }

        private async Task EnsurePendingPaymentsAsync(Group group, DateTime nowUtc)
        {
            var existingPaymentUserIds = group.Payments?
                .Select(payment => payment.UserId)
                .ToHashSet() ?? new HashSet<Guid>();

            var members = group.Members?.ToList() ?? new List<GroupMember>();
            foreach (var member in members.Where(member => !existingPaymentUserIds.Contains(member.UserId)))
            {
                var payment = new Payment
                {
                    GroupId = group.Id,
                    UserId = member.UserId,
                    Amount = group.FinalPricePerBuyer,
                    PaymentStatus = PaymentStatuses.Pending,
                    PaymentDate = nowUtc,
                    UpdatedAt = nowUtc
                };

                _context.Payments.Add(payment);
                group.Payments ??= new List<Payment>();
                group.Payments.Add(payment);
            }

            await Task.CompletedTask;
        }

        private async Task<bool> TryCancelExpiredGroupAsync(Group group, Property property, DateTime nowUtc)
        {
            if (!RequiresCancellation(group, nowUtc))
            {
                return false;
            }

            if (AllPaymentsCompleted(group))
            {
                await TryCompleteGroupAsync(group, property, nowUtc);
                return false;
            }

            group.Status = GroupStatuses.Cancelled;
            group.CancelledAt = nowUtc;
            group.UpdatedAt = nowUtc;
            property.Status = PropertyStatuses.Available;

            foreach (var payment in group.Payments?.Where(item => !string.Equals(item.PaymentStatus, PaymentStatuses.Paid, StringComparison.OrdinalIgnoreCase)) ?? Enumerable.Empty<Payment>())
            {
                payment.PaymentStatus = PaymentStatuses.Failed;
                payment.UpdatedAt = nowUtc;
            }

            foreach (var memberId in group.Members?.Select(member => member.UserId).Distinct() ?? Enumerable.Empty<Guid>())
            {
                await AddNotificationAsync(
                    memberId,
                    NotificationTypes.DealCancelled,
                    "Group deal cancelled",
                    $"The buyer group for {property.Title} was cancelled because the payment deadline passed.",
                    group.Id,
                    property.Id,
                    nowUtc);
            }

            return true;
        }

        private async Task CancelExpiredGroupsIfNeededAsync(IEnumerable<Guid> groupIds)
        {
            var nowUtc = DateTime.UtcNow;
            var groups = await _context.Groups
                .Include(group => group.Property)
                .Include(group => group.Members)
                .Include(group => group.Payments)
                .Where(group => groupIds.Contains(group.Id))
                .ToListAsync();

            var changed = false;
            foreach (var group in groups.Where(group => group.Property != null))
            {
                changed |= await TryCancelExpiredGroupAsync(group, group.Property!, nowUtc);
            }

            if (changed)
            {
                await _context.SaveChangesAsync();
            }
        }

        private async Task<bool> TryCompleteGroupAsync(Group group, Property property, DateTime nowUtc)
        {
            if (!AllPaymentsCompleted(group))
            {
                return false;
            }

            group.Status = GroupStatuses.Completed;
            group.CompletedAt = nowUtc;
            group.UpdatedAt = nowUtc;
            property.Status = PropertyStatuses.Sold;

            await EnsureOwnershipRecordsAsync(group, property, nowUtc);
            await EnsureBookingAsync(group, property, nowUtc);

            foreach (var memberId in group.Members?.Select(member => member.UserId).Distinct() ?? Enumerable.Empty<Guid>())
            {
                await AddNotificationAsync(
                    memberId,
                    NotificationTypes.DealCompleted,
                    "Deal completed",
                    $"All buyers completed payment for {property.Title}. Ownership shares are now available.",
                    group.Id,
                    property.Id,
                    nowUtc);
            }

            return true;
        }

        private async Task EnsureOwnershipRecordsAsync(Group group, Property property, DateTime nowUtc)
        {
            var members = group.Members?
                .OrderBy(member => member.JoinedAt)
                .ToList() ?? new List<GroupMember>();

            if (members.Count == 0)
            {
                return;
            }

            var hasAnyOwnership = await _context.Ownerships
                .AnyAsync(ownership => ownership.GroupId == group.Id);

            if (hasAnyOwnership)
            {
                return;
            }

            var runningTotal = 0m;
            var equalShare = decimal.Round(100m / members.Count, 4, MidpointRounding.AwayFromZero);

            for (var index = 0; index < members.Count; index++)
            {
                var share = index == members.Count - 1
                    ? decimal.Round(100m - runningTotal, 4, MidpointRounding.AwayFromZero)
                    : equalShare;

                runningTotal += share;

                _context.Ownerships.Add(new Ownership
                {
                    BuyerId = members[index].UserId,
                    PropertyId = property.Id,
                    GroupId = group.Id,
                    OwnershipPercentage = share,
                    CreatedAt = nowUtc
                });
            }
        }

        private async Task EnsureBookingAsync(Group group, Property property, DateTime nowUtc)
        {
            var hasBooking = await _context.Bookings.AnyAsync(booking => booking.GroupId == group.Id);
            if (hasBooking)
            {
                return;
            }

            _context.Bookings.Add(new Booking
            {
                GroupId = group.Id,
                PropertyId = property.Id,
                TotalAmount = group.TotalPriceSnapshot > 0 ? group.TotalPriceSnapshot : property.Price,
                DiscountApplied = group.DiscountAmount,
                FinalAmount = (group.TotalPriceSnapshot > 0 ? group.TotalPriceSnapshot : property.Price) - group.DiscountAmount,
                Status = "Confirmed",
                BookingDate = nowUtc
            });
        }

        private static bool RequiresCancellation(Group group, DateTime nowUtc)
        {
            if (!string.Equals(group.Status, GroupStatuses.Full, StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(group.Status, GroupStatuses.Locked, StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            return group.PaymentDueAt.HasValue && group.PaymentDueAt.Value < nowUtc;
        }

        private static bool AllPaymentsCompleted(Group group)
        {
            var memberCount = group.Members?.Count ?? 0;
            if (memberCount == 0)
            {
                return false;
            }

            var paidCount = group.Payments?
                .Count(payment => string.Equals(payment.PaymentStatus, PaymentStatuses.Paid, StringComparison.OrdinalIgnoreCase))
                ?? 0;

            return paidCount == memberCount;
        }

        private async Task AddNotificationAsync(
            Guid userId,
            string type,
            string title,
            string message,
            Guid? groupId,
            Guid? propertyId,
            DateTime createdAt)
        {
            _context.UserNotifications.Add(new UserNotification
            {
                UserId = userId,
                Type = type,
                Title = title,
                Message = message,
                GroupId = groupId,
                PropertyId = propertyId,
                CreatedAt = createdAt
            });

            await Task.CompletedTask;
        }

        private static BuyerGroupSummaryDto MapGroupSummary(Group group, Guid buyerId)
        {
            var property = group.Property ?? throw new InvalidOperationException("Property must be loaded.");
            var membership = group.Members?.SingleOrDefault(member => member.UserId == buyerId);
            var payment = group.Payments?.SingleOrDefault(item => item.UserId == buyerId);
            var ownership = group.Ownerships?.SingleOrDefault(item => item.BuyerId == buyerId);

            return new BuyerGroupSummaryDto
            {
                GroupId = group.Id,
                PropertyId = property.Id,
                PropertyTitle = property.Title,
                PropertyLocation = property.Location,
                GroupStatus = group.Status,
                CurrentMembers = group.CurrentMembers,
                RequiredGroupSize = group.MaxMembers,
                RemainingSlots = Math.Max(group.MaxMembers - group.CurrentMembers, 0),
                FinalPricePerBuyer = ResolveFinalPricePerBuyer(group, property),
                PaymentDueAt = group.PaymentDueAt,
                MyPaymentStatus = payment?.PaymentStatus ?? PaymentStatuses.Pending,
                MyOwnershipPercentage = ownership?.OwnershipPercentage,
                JoinedAt = membership?.JoinedAt ?? group.CreatedAt
            };
        }

        private static BuyerGroupDetailDto MapGroupDetail(Group group, Guid buyerId)
        {
            var property = group.Property ?? throw new InvalidOperationException("Property must be loaded.");
            var payment = group.Payments?.SingleOrDefault(item => item.UserId == buyerId);
            var ownership = group.Ownerships?.SingleOrDefault(item => item.BuyerId == buyerId);

            return new BuyerGroupDetailDto
            {
                GroupId = group.Id,
                PropertyId = property.Id,
                PropertyTitle = property.Title,
                PropertyDescription = property.Description,
                PropertyLocation = property.Location,
                TotalPrice = group.TotalPriceSnapshot > 0 ? group.TotalPriceSnapshot : property.Price,
                DiscountType = string.IsNullOrWhiteSpace(group.DiscountTypeSnapshot)
                    ? BuyerPricingCalculator.NormalizeDiscountType(property.DiscountType)
                    : group.DiscountTypeSnapshot,
                DiscountValue = group.DiscountValueSnapshot > 0 ? group.DiscountValueSnapshot : property.DiscountValue,
                GroupStatus = group.Status,
                CurrentMembers = group.CurrentMembers,
                RequiredGroupSize = group.MaxMembers,
                RemainingSlots = Math.Max(group.MaxMembers - group.CurrentMembers, 0),
                DiscountAmount = group.DiscountAmount > 0
                    ? group.DiscountAmount
                    : BuyerPricingCalculator.CalculateDiscountAmount(property.Price, property.DiscountType, property.DiscountValue),
                FinalPricePerBuyer = ResolveFinalPricePerBuyer(group, property),
                PaymentDueAt = group.PaymentDueAt,
                CanLeave = string.Equals(group.Status, GroupStatuses.Open, StringComparison.OrdinalIgnoreCase),
                MyPayment = BuildPaymentSummary(group, payment),
                MyOwnershipPercentage = ownership?.OwnershipPercentage,
                Members = group.Members?
                    .OrderBy(member => member.JoinedAt)
                    .Select(member => new BuyerGroupMemberDto
                    {
                        BuyerId = member.UserId,
                        BuyerName = ResolveBuyerName(member.User),
                        PaymentStatus = group.Payments?.SingleOrDefault(paymentRecord => paymentRecord.UserId == member.UserId)?.PaymentStatus ?? PaymentStatuses.Pending,
                        OwnershipPercentage = group.Ownerships?.SingleOrDefault(ownershipRecord => ownershipRecord.BuyerId == member.UserId)?.OwnershipPercentage,
                        JoinedAt = member.JoinedAt,
                        IsCurrentBuyer = member.UserId == buyerId
                    })
                    .ToList() ?? new List<BuyerGroupMemberDto>()
            };
        }

        private static BuyerPaymentSummaryDto BuildPaymentSummary(Group group, Payment? payment)
        {
            var canPay = (string.Equals(group.Status, GroupStatuses.Full, StringComparison.OrdinalIgnoreCase) ||
                          string.Equals(group.Status, GroupStatuses.Locked, StringComparison.OrdinalIgnoreCase)) &&
                         (!group.PaymentDueAt.HasValue || group.PaymentDueAt.Value >= DateTime.UtcNow) &&
                         !string.Equals(payment?.PaymentStatus, PaymentStatuses.Paid, StringComparison.OrdinalIgnoreCase);

            return new BuyerPaymentSummaryDto
            {
                PaymentId = payment?.Id,
                Amount = payment?.Amount ?? group.FinalPricePerBuyer,
                Status = payment?.PaymentStatus ?? PaymentStatuses.Pending,
                TransactionId = payment?.TransactionId,
                PaymentDate = payment?.PaymentDate,
                PaymentDueAt = group.PaymentDueAt,
                CanPay = canPay,
                CanRetry = canPay && string.Equals(payment?.PaymentStatus, PaymentStatuses.Failed, StringComparison.OrdinalIgnoreCase)
            };
        }

        private static decimal ResolveFinalPricePerBuyer(Group group, Property property)
        {
            return group.FinalPricePerBuyer > 0
                ? group.FinalPricePerBuyer
                : BuyerPricingCalculator.CalculateFinalPricePerBuyer(
                    property.Price,
                    property.DiscountType,
                    property.DiscountValue,
                    Math.Max(group.MaxMembers, 1));
        }

        private static string ResolveBuyerName(User? buyer)
        {
            if (buyer == null)
            {
                return "Buyer";
            }

            if (!string.IsNullOrWhiteSpace(buyer.FullName))
            {
                return buyer.FullName.Trim();
            }

            if (!string.IsNullOrWhiteSpace(buyer.Username))
            {
                return buyer.Username.Trim();
            }

            return buyer.Email;
        }
    }
}
