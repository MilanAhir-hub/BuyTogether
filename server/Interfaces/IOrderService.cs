using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BuyTogether.Server.DTOs.Deals;

namespace BuyTogether.Server.Interfaces
{
    public interface IOrderService
    {
        Task<(bool Success, string Message, OrderDto? Order)> ConfirmOrderAsync(Guid userId, Guid groupId);
        Task<IEnumerable<OrderDto>> GetMyOrdersAsync(Guid userId);
    }
}
