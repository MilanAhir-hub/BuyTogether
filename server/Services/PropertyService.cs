using BuyTogether.Server.DTOs;
using BuyTogether.Server.Repositories;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BuyTogether.Server.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _propertyRepository;
        private readonly IMemoryCache _cache;

        public PropertyService(IPropertyRepository propertyRepository, IMemoryCache cache)
        {
            _propertyRepository = propertyRepository;
            _cache = cache;
        }

        public async Task<PaginatedResponseDto<PropertyListDto>> GetPropertiesAsync(int pageNumber, int pageSize, string? location, decimal? minPrice, decimal? maxPrice)
        {
            var cacheKey = $"properties_p{pageNumber}_s{pageSize}_l{location}_min{minPrice}_max{maxPrice}";

            if (_cache.TryGetValue(cacheKey, out PaginatedResponseDto<PropertyListDto>? cachedResult) && cachedResult != null)
            {
                return cachedResult;
            }

            var (properties, totalCount) = await _propertyRepository.GetPropertiesAsync(pageNumber, pageSize, location, minPrice, maxPrice);

            var dtos = properties.Select(p => new PropertyListDto
            {
                Id = p.Id,
                Title = p.Title,
                Location = p.Location,
                Price = p.Price,
                ImageUrl = p.ImageUrl,
                MaxBuyers = p.MaxBuyers,
                BuyersJoined = p.GroupMembers?.Count ?? 0
            }).ToList();

            var response = new PaginatedResponseDto<PropertyListDto>
            {
                Data = dtos,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount
            };

            var cacheOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(30)
            };
            
            _cache.Set(cacheKey, response, cacheOptions);

            return response;
        }

        public async Task<PropertyDetailsDto?> GetPropertyDetailsAsync(int id)
        {
            var property = await _propertyRepository.GetPropertyByIdAsync(id);
            if (property == null) return null;

            return new PropertyDetailsDto
            {
                Id = property.Id,
                Title = property.Title,
                Location = property.Location,
                Price = property.Price,
                Description = property.Description,
                ImageUrl = property.ImageUrl,
                PropertyType = property.PropertyType,
                Bedrooms = property.Bedrooms,
                Area = property.Area,
                BuilderName = property.BuilderName,
                MaxBuyers = property.MaxBuyers,
                BuyersJoined = property.GroupMembers?.Count ?? 0
            };
        }
    }
}
