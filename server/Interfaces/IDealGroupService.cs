using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BuyTogether.Server.DTOs.Deals;

namespace BuyTogether.Server.Interfaces
{
    public interface IDealGroupService
    {
        Task<(bool Success, string Message, DealGroupDto? Group)> JoinDealAsync(Guid userId, Guid dealId);
        Task<DealGroupDto?> GetGroupStatusAsync(Guid groupId);
        Task<IEnumerable<DealGroupDto>> GetMyGroupsAsync(Guid userId);
    }
}
