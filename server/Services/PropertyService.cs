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
                .Include(property => property.DiscountTiers)
                .OrderByDescending(property => property.CreatedAt)
                .ToListAsync();

            return properties.Select(MapToResponse).ToList();
        }

        public async Task<IReadOnlyCollection<PropertyResponseDto>> GetPropertiesByOwnerAsync(Guid ownerId)
        {
            var properties = await _context.Properties
                .AsNoTracking()
                .Include(property => property.Owner)
                .Include(property => property.DiscountTiers)
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
                .Include(item => item.DiscountTiers)
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
                CreatedAt = DateTime.UtcNow,
                DiscountTiers = dto.DiscountTiers.Select(t => new PropertyDiscountTier
                {
                    MinBuyers = t.MinBuyers,
                    DiscountPercentage = t.DiscountPercentage
                }).ToList()
            };

            _context.Properties.Add(property);
            await _context.SaveChangesAsync();

            property.Owner = owner;

            return MapToResponse(property);
        }

        public async Task<PropertyResponseDto> UpdatePropertyAsync(Guid id, UpdatePropertyDto dto, Guid userId)
        {
            var property = await _context.Properties
                .Include(p => p.DiscountTiers)
                .SingleOrDefaultAsync(p => p.Id == id);

            if (property == null)
            {
                throw new KeyNotFoundException("Property not found.");
            }

            if (property.OwnerId != userId)
            {
                throw new UnauthorizedAccessException("You are not authorized to update this property.");
            }

            // Update simple fields
            if (dto.Title != null) property.Title = dto.Title.Trim();
            if (dto.Description != null) property.Description = dto.Description.Trim();
            if (dto.Price.HasValue) 
            {
                property.Price = dto.Price.Value;
                property.DiscountPrice = dto.Price.Value; // Reset discount price for now
            }
            if (dto.Location != null) 
            {
                var location = Normalize(dto.Location);
                property.Location = location ?? string.Empty;
                property.City = ExtractCity(location);
            }
            if (dto.Bedrooms.HasValue) 
            {
                property.Bedrooms = dto.Bedrooms.Value;
                property.MaxPeopleAllowed = Math.Max(dto.Bedrooms.Value, 1);
                property.RequiredGroupSize = Math.Max(dto.Bedrooms.Value, 1);
            }
            if (dto.ImageUrl != null) property.ImageUrl = dto.ImageUrl.Trim();

            // Update Tiers if provided
            if (dto.DiscountTiers != null)
            {
                // Remove existing tiers
                _context.PropertyDiscountTiers.RemoveRange(property.DiscountTiers);
                
                // Add new tiers
                property.DiscountTiers = dto.DiscountTiers.Select(t => new PropertyDiscountTier
                {
                    PropertyId = property.Id,
                    MinBuyers = t.MinBuyers,
                    DiscountPercentage = t.DiscountPercentage
                }).ToList();
            }

            await _context.SaveChangesAsync();

            // Reload property with owner for response
            return await GetPropertyByIdAsync(id) ?? throw new Exception("Failed to reload property after update.");
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
                CreatedAt = property.CreatedAt,
                MaxPeopleAllowed = property.MaxPeopleAllowed,
                RequiredGroupSize = property.RequiredGroupSize,
                DiscountTiers = property.DiscountTiers.Select(t => new DiscountTierDto
                {
                    MinBuyers = t.MinBuyers,
                    DiscountPercentage = t.DiscountPercentage
                }).ToList()
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
