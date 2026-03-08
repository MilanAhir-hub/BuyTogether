using BuyTogether.Server.DTOs;
using System.Threading.Tasks;

namespace BuyTogether.Server.Services
{
    public interface IPropertyService
    {
        Task<PaginatedResponseDto<PropertyListDto>> GetPropertiesAsync(int pageNumber, int pageSize, string? location, decimal? minPrice, decimal? maxPrice);
        Task<PropertyDetailsDto?> GetPropertyDetailsAsync(int id);
    }
}
