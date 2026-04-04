using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BuyTogether.Server.DTOs.Deals;

namespace BuyTogether.Server.Interfaces
{
    public interface IDealService
    {
        Task<DealDto> CreateDealAsync(CreateDealDto createDealDto);
        Task<IEnumerable<DealDto>> GetAllActiveDealsAsync();
        Task<DealDto?> GetDealByIdAsync(Guid id);
    }
}
