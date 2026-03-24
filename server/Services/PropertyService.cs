using BuyTogether.Server.Data;
using BuyTogether.Server.Constants;
using BuyTogether.Server.DTOs.Properties;
using BuyTogether.Server.Interfaces;
using BuyTogether.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BuyTogether.Server.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly AppDbContext _context;

        public PropertyService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyCollection<PropertyResponseDto>> GetAllPropertiesAsync()
        {
            var properties = await _context.Properties
                .AsNoTracking()
                .Include(property => property.Owner)
                .OrderByDescending(property => property.CreatedAt)
                .ToListAsync();

            return properties.Select(MapToResponse).ToList();
        }

        public async Task<IReadOnlyCollection<PropertyResponseDto>> GetPropertiesByOwnerAsync(Guid ownerId)
        {
            var properties = await _context.Properties
                .AsNoTracking()
                .Include(property => property.Owner)
                .Where(property => property.OwnerId == ownerId)
                .OrderByDescending(property => property.CreatedAt)
                .ToListAsync();

            return properties.Select(MapToResponse).ToList();
        }

        public async Task<PropertyResponseDto?> GetPropertyByIdAsync(Guid id)
        {
            var property = await _context.Properties
                .AsNoTracking()
                .Include(item => item.Owner)
                .SingleOrDefaultAsync(item => item.Id == id);

            return property == null ? null : MapToResponse(property);
        }

        public async Task<PropertyResponseDto> CreatePropertyAsync(CreatePropertyDto dto, Guid userId)
        {
            var owner = await _context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(user => user.Id == userId);

            if (owner == null)
            {
                throw new KeyNotFoundException("User not found.");
            }

            var location = Normalize(dto.Location);
            var property = new Property
            {
                Title = dto.Title.Trim(),
                Description = Normalize(dto.Description) ?? string.Empty,
                Price = dto.Price,
                DiscountPrice = dto.Price,
                DiscountType = DiscountTypes.Fixed,
                DiscountValue = 0m,
                Location = location ?? string.Empty,
                Bedrooms = dto.Bedrooms,
                City = ExtractCity(location),
                ImageUrl = Normalize(dto.ImageUrl),
                MaxPeopleAllowed = Math.Max(dto.Bedrooms, 1),
                RequiredGroupSize = Math.Max(dto.Bedrooms, 1),
                Status = PropertyStatuses.Available,
                OwnerId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Properties.Add(property);
            await _context.SaveChangesAsync();

            property.Owner = owner;

            return MapToResponse(property);
        }

        public async Task<PropertyDeleteResult> DeletePropertyAsync(Guid id, Guid userId)
        {
            var property = await _context.Properties
                .SingleOrDefaultAsync(item => item.Id == id);

            if (property == null)
            {
                return PropertyDeleteResult.NotFound;
            }

            if (property.OwnerId != userId)
            {
                return PropertyDeleteResult.Forbidden;
            }

            var hasLinkedGroups = await _context.Groups.AnyAsync(group => group.PropertyId == id);
            var hasLinkedBookings = await _context.Bookings.AnyAsync(booking => booking.PropertyId == id);
            if (hasLinkedGroups || hasLinkedBookings)
            {
                return PropertyDeleteResult.Conflict;
            }

            _context.Properties.Remove(property);
            await _context.SaveChangesAsync();

            return PropertyDeleteResult.Deleted;
        }

        private static PropertyResponseDto MapToResponse(Property property)
        {
            return new PropertyResponseDto
            {
                Id = property.Id,
                Title = property.Title,
                Description = property.Description,
                Price = property.Price,
                Location = property.Location,
                Bedrooms = property.Bedrooms,
                ImageUrl = property.ImageUrl ?? string.Empty,
                OwnerId = property.OwnerId,
                OwnerName = ResolveOwnerName(property.Owner),
                CreatedAt = property.CreatedAt
            };
        }

        private static string ResolveOwnerName(User? owner)
        {
            if (owner == null)
            {
                return "Unknown owner";
            }

            if (!string.IsNullOrWhiteSpace(owner.FullName))
            {
                return owner.FullName.Trim();
            }

            return string.IsNullOrWhiteSpace(owner.Username)
                ? owner.Email
                : owner.Username;
        }

        private static string ExtractCity(string? location)
        {
            if (string.IsNullOrWhiteSpace(location))
            {
                return "Not specified";
            }

            var parts = location
                .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            return parts.Length == 0 ? location.Trim() : parts[^1];
        }

        private static string? Normalize(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }
    }
}
