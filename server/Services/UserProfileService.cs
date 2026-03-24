using BuyTogether.Server.Data;
using BuyTogether.Server.DTOs.Profile;
using BuyTogether.Server.Interfaces;
using BuyTogether.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BuyTogether.Server.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly AppDbContext _context;

        public UserProfileService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserProfileDto?> GetProfileAsync(Guid userId)
        {
            var user = await _context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return null;
            }

            var groupMemberships = await _context.GroupMembers
                .AsNoTracking()
                .Where(member => member.UserId == userId)
                .Include(member => member.Group)
                    .ThenInclude(group => group!.Property)
                .OrderByDescending(member => member.JoinedAt)
                .ToListAsync();

            var createdGroupsCount = await _context.Groups
                .AsNoTracking()
                .CountAsync(group => group.CreatedBy == userId);

            var ownedPropertiesCount = await _context.Properties
                .AsNoTracking()
                .CountAsync(property => property.OwnerId == userId);

            var bookings = await _context.Bookings
                .AsNoTracking()
                .Where(booking => booking.Group != null && booking.Group.Members!.Any(member => member.UserId == userId))
                .Include(booking => booking.Property)
                .Include(booking => booking.Group)
                    .ThenInclude(group => group!.Members)
                .OrderByDescending(booking => booking.BookingDate)
                .ToListAsync();

            var stats = BuildStats(user, groupMemberships, bookings, createdGroupsCount, ownedPropertiesCount);

            return new UserProfileDto
            {
                Id = user.Id,
                Username = user.Username,
                FullName = user.FullName ?? user.Username,
                Email = user.Email,
                Role = user.Role,
                PhoneNumber = user.PhoneNumber ?? string.Empty,
                City = user.City ?? string.Empty,
                Bio = user.Bio ?? string.Empty,
                PreferredLocation = user.PreferredLocation ?? string.Empty,
                PreferredBudgetMin = user.PreferredBudgetMin,
                PreferredBudgetMax = user.PreferredBudgetMax,
                TargetGroupSize = user.TargetGroupSize,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                Stats = stats,
                ActiveGroups = groupMemberships
                    .Take(4)
                    .Select(member =>
                    {
                        var property = member.Group?.Property;
                        var estimatedDiscount = property == null
                            ? 0m
                            : Math.Max(property.Price - property.DiscountPrice, 0m);

                        return new ProfileGroupSummaryDto
                        {
                            Id = member.GroupId,
                            PropertyTitle = property?.Title ?? "Property",
                            PropertyCity = property?.City ?? "Unknown City",
                            PropertyLocation = property?.Location ?? "Unknown location",
                            MemberRole = member.Role,
                            GroupStatus = member.Group?.Status ?? "Unknown",
                            CurrentMembers = member.Group?.CurrentMembers ?? 0,
                            MaxMembers = member.Group?.MaxMembers ?? 0,
                            EstimatedDiscountAmount = estimatedDiscount,
                            JoinedAt = member.JoinedAt
                        };
                    })
                    .ToList(),
                RecentBookings = bookings
                    .Take(4)
                    .Select(booking => new ProfileBookingSummaryDto
                    {
                        Id = booking.Id,
                        PropertyTitle = booking.Property?.Title ?? "Property",
                        PropertyLocation = booking.Property?.Location ?? "Unknown location",
                        Status = booking.Status,
                        TotalAmount = booking.TotalAmount,
                        DiscountApplied = booking.DiscountApplied,
                        FinalAmount = booking.FinalAmount,
                        BookingDate = booking.BookingDate
                    })
                    .ToList(),
                RecentActivities = BuildActivities(groupMemberships, bookings)
            };
        }

        public async Task<UserProfileDto?> UpdateProfileAsync(Guid userId, UpdateUserProfileDto updateDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return null;
            }

            user.FullName = Normalize(updateDto.FullName);
            user.PhoneNumber = Normalize(updateDto.PhoneNumber);
            user.City = Normalize(updateDto.City);
            user.Bio = Normalize(updateDto.Bio);
            user.PreferredLocation = Normalize(updateDto.PreferredLocation);
            user.PreferredBudgetMin = updateDto.PreferredBudgetMin;
            user.PreferredBudgetMax = updateDto.PreferredBudgetMax;
            user.TargetGroupSize = updateDto.TargetGroupSize;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetProfileAsync(userId);
        }

        private static ProfileDashboardStatsDto BuildStats(
            User user,
            IReadOnlyCollection<GroupMember> groupMemberships,
            IReadOnlyCollection<Booking> bookings,
            int createdGroupsCount,
            int ownedPropertiesCount)
        {
            var completedFields = new[]
            {
                !string.IsNullOrWhiteSpace(user.FullName),
                !string.IsNullOrWhiteSpace(user.PhoneNumber),
                !string.IsNullOrWhiteSpace(user.City),
                !string.IsNullOrWhiteSpace(user.Bio),
                !string.IsNullOrWhiteSpace(user.PreferredLocation),
                user.PreferredBudgetMin.HasValue,
                user.PreferredBudgetMax.HasValue,
                user.TargetGroupSize.HasValue
            };

            var completionPercentage = (int)Math.Round(completedFields.Count(field => field) / (double)completedFields.Length * 100);

            return new ProfileDashboardStatsDto
            {
                GroupsJoinedCount = groupMemberships.Count,
                GroupsCreatedCount = createdGroupsCount,
                PropertiesOwnedCount = ownedPropertiesCount,
                ConfirmedBookingsCount = bookings.Count(booking =>
                    string.Equals(booking.Status, "Confirmed", StringComparison.OrdinalIgnoreCase)),
                TotalSavingsAmount = bookings.Sum(booking => booking.DiscountApplied),
                ProfileCompletionPercentage = completionPercentage
            };
        }

        private static List<ProfileActivityDto> BuildActivities(
            IReadOnlyCollection<GroupMember> groupMemberships,
            IReadOnlyCollection<Booking> bookings)
        {
            var groupActivities = groupMemberships.Select(member => new ProfileActivityDto
            {
                Id = $"group-{member.Id}",
                Type = "group",
                Title = $"Joined {member.Group?.Property?.Title ?? "a property"} group",
                Subtitle = member.Group?.Property?.City ?? "Group membership",
                Status = member.Group?.Status ?? "Active",
                Amount = member.Group?.Property == null
                    ? null
                    : Math.Max(member.Group.Property.Price - member.Group.Property.DiscountPrice, 0m),
                OccurredAt = member.JoinedAt
            });

            var bookingActivities = bookings.Select(booking => new ProfileActivityDto
            {
                Id = $"booking-{booking.Id}",
                Type = "booking",
                Title = $"Booking {booking.Status.ToLowerInvariant()}",
                Subtitle = booking.Property?.Title ?? "Property booking",
                Status = booking.Status,
                Amount = booking.FinalAmount,
                OccurredAt = booking.BookingDate
            });

            return groupActivities
                .Concat(bookingActivities)
                .OrderByDescending(activity => activity.OccurredAt)
                .Take(6)
                .ToList();
        }

        private static string? Normalize(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }
    }
}
