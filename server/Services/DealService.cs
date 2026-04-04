using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BuyTogether.Server.Data;
using BuyTogether.Server.DTOs.Deals;
using BuyTogether.Server.Interfaces;
using BuyTogether.Server.Models;

namespace BuyTogether.Server.Services
{
    public class DealService : IDealService
    {
        private readonly AppDbContext _context;

        public DealService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DealDto> CreateDealAsync(CreateDealDto createDealDto)
        {
            var deal = new Deal
            {
                Title = createDealDto.Title,
                Description = createDealDto.Description,
                ImageUrl = createDealDto.ImageUrl,
                OriginalPrice = createDealDto.OriginalPrice,
                GroupPrice = createDealDto.GroupPrice,
                MinBuyers = createDealDto.MinBuyers,
                MaxBuyers = createDealDto.MaxBuyers,
                ExpiryDurationHours = createDealDto.ExpiryDurationHours,
                IsActive = true
            };

            _context.Deals.Add(deal);
            await _context.SaveChangesAsync();

            return MapToDto(deal);
        }

        public async Task<IEnumerable<DealDto>> GetAllActiveDealsAsync()
        {
            var deals = await _context.Deals
                .Where(d => d.IsActive)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();

            return deals.Select(MapToDto);
        }

        public async Task<DealDto?> GetDealByIdAsync(Guid id)
        {
            var deal = await _context.Deals.FindAsync(id);
            if (deal == null) return null;
            return MapToDto(deal);
        }

        private static DealDto MapToDto(Deal deal)
        {
            return new DealDto
            {
                Id = deal.Id,
                Title = deal.Title,
                Description = deal.Description,
                ImageUrl = deal.ImageUrl,
                OriginalPrice = deal.OriginalPrice,
                GroupPrice = deal.GroupPrice,
                MinBuyers = deal.MinBuyers,
                MaxBuyers = deal.MaxBuyers,
                ExpiryDurationHours = deal.ExpiryDurationHours,
                IsActive = deal.IsActive,
                CreatedAt = deal.CreatedAt
            };
        }
    }
}
