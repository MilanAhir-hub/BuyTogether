using BuyTogether.Server.Constants;
using BuyTogether.Server.Data;
using BuyTogether.Server.DTOs.Buyer;
using BuyTogether.Server.Helpers;
using BuyTogether.Server.Interfaces;
using BuyTogether.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BuyTogether.Server.Services
{
    public class BuyerPropertyService : IBuyerPropertyService
    {
        private readonly AppDbContext _context;

        public BuyerPropertyService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyCollection<BuyerPropertyDto>> GetAvailablePropertiesAsync(Guid? buyerId = null)
        {
            var nowUtc = DateTime.UtcNow;
            var properties = await _context.Properties
                .AsNoTracking()
                .Where(property => property.Status == PropertyStatuses.Available)
                .Include(property => property.Owner)
                .Include(property => property.Groups!)
                    .ThenInclude(group => group.Members)
                .OrderByDescending(property => property.CreatedAt)
                .ToListAsync();

            return properties
                .Select(property => MapProperty(property, nowUtc, buyerId))
                .ToList();
        }

        public async Task<BuyerPropertyDto?> GetPropertyByIdAsync(Guid propertyId, Guid? buyerId = null)
        {
            var nowUtc = DateTime.UtcNow;
            var property = await _context.Properties
                .AsNoTracking()
                .Include(item => item.Owner)
                .Include(item => item.Groups!)
                    .ThenInclude(group => group.Members)
                .SingleOrDefaultAsync(item => item.Id == propertyId && item.Status == PropertyStatuses.Available);

            return property == null ? null : MapProperty(property, nowUtc, buyerId);
        }

        private static BuyerPropertyDto MapProperty(Property property, DateTime nowUtc, Guid? buyerId)
        {
            var requiredGroupSize = BuyerPricingCalculator.ResolveRequiredGroupSize(property);
            var activeGroup = ResolveActiveGroup(property.Groups, nowUtc);
            var currentMembers = activeGroup?.CurrentMembers ?? 0;
            var groupId = activeGroup?.Id;
            var groupStatus = activeGroup?.Status ?? GroupStatuses.Open;
            var hasJoined = buyerId.HasValue && activeGroup?.Members?.Any(member => member.UserId == buyerId.Value) == true;
            var discountAmount = activeGroup?.DiscountAmount > 0
                ? activeGroup.DiscountAmount
                : BuyerPricingCalculator.CalculateDiscountAmount(property.Price, property.DiscountType, property.DiscountValue);
            var finalPricePerBuyer = activeGroup?.FinalPricePerBuyer > 0
                ? activeGroup.FinalPricePerBuyer
                : BuyerPricingCalculator.CalculateFinalPricePerBuyer(property.Price, property.DiscountType, property.DiscountValue, requiredGroupSize);

            return new BuyerPropertyDto
            {
                Id = property.Id,
                Title = property.Title,
                Description = property.Description,
                Location = property.Location,
                TotalPrice = property.Price,
                RequiredGroupSize = requiredGroupSize,
                DiscountType = BuyerPricingCalculator.NormalizeDiscountType(property.DiscountType),
                DiscountValue = property.DiscountValue,
                ImageUrl = property.ImageUrl,
                Bedrooms = property.Bedrooms,
                CreatedAt = property.CreatedAt,
                OwnerId = property.OwnerId,
                OwnerName = property.Owner?.FullName ?? property.Owner?.Username,
                Group = new BuyerActiveGroupSummaryDto
                {
                    GroupId = groupId,
                    Status = groupStatus,
                    CurrentMembers = currentMembers,
                    RequiredGroupSize = requiredGroupSize,
                    RemainingSlots = Math.Max(requiredGroupSize - currentMembers, 0),
                    DiscountAmount = discountAmount,
                    FinalPricePerBuyer = finalPricePerBuyer,
                    PaymentDueAt = activeGroup?.PaymentDueAt,
                    CanJoin = !hasJoined && string.Equals(groupStatus, GroupStatuses.Open, StringComparison.OrdinalIgnoreCase) && currentMembers < requiredGroupSize,
                    CanLeave = hasJoined && string.Equals(groupStatus, GroupStatuses.Open, StringComparison.OrdinalIgnoreCase),
                    HasJoined = hasJoined
                }
            };
        }

        private static Group? ResolveActiveGroup(IEnumerable<Group>? groups, DateTime nowUtc)
        {
            return groups?
                .OrderByDescending(group => group.CreatedAt)
                .FirstOrDefault(group =>
                    GroupStatuses.Active.Contains(group.Status) &&
                    !RequiresCancellation(group, nowUtc));
        }

        private static bool RequiresCancellation(Group group, DateTime nowUtc)
        {
            if (string.Equals(group.Status, GroupStatuses.Open, StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            return group.PaymentDueAt.HasValue && group.PaymentDueAt.Value < nowUtc;
        }
    }
}
