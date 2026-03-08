using BuyTogether.Server.Data;
using BuyTogether.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BuyTogether.Server.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly AppDbContext _context;

        public PropertyRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(IEnumerable<Property> Properties, int TotalCount)> GetPropertiesAsync(int pageNumber, int pageSize, string? location, decimal? minPrice, decimal? maxPrice)
        {
            var query = _context.Properties
                .Include(p => p.GroupMembers) // Included for BuyersJoined count
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(location))
            {
                query = query.Where(p => p.Location.ToLower().Contains(location.ToLower()));
            }

            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            var totalCount = await query.CountAsync();

            var properties = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (properties, totalCount);
        }

        public async Task<Property?> GetPropertyByIdAsync(int id)
        {
            return await _context.Properties
                .Include(p => p.GroupMembers)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> PropertyExistsAsync(int id)
        {
            return await _context.Properties.AnyAsync(p => p.Id == id);
        }
    }
}
