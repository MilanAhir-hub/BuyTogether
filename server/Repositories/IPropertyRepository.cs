using BuyTogether.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BuyTogether.Server.Repositories
{
    public interface IPropertyRepository
    {
        Task<(IEnumerable<Property> Properties, int TotalCount)> GetPropertiesAsync(int pageNumber, int pageSize, string? location, decimal? minPrice, decimal? maxPrice);
        Task<Property?> GetPropertyByIdAsync(int id);
        Task<bool> PropertyExistsAsync(int id);
    }
}
