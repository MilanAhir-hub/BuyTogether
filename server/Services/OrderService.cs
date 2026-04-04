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
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(bool Success, string Message, OrderDto? Order)> ConfirmOrderAsync(Guid userId, Guid groupId)
        {
            var group = await _context.DealGroups
                .Include(g => g.Deal)
                .SingleOrDefaultAsync(g => g.Id == groupId);

            if (group == null)
            {
                return (false, "Group not found.", null);
            }

            if (group.Status != "active" && group.Status != "completed")
            {
                return (false, "Group is not active yet.", null);
            }

            // Check if user is actually in this group
            var isMember = await _context.DealGroupMembers
                .AnyAsync(m => m.DealGroupId == groupId && m.UserId == userId);

            if (!isMember)
            {
                return (false, "You are not a member of this group.", null);
            }

            // Check if order already exists
            var existingOrder = await _context.Orders
                .SingleOrDefaultAsync(o => o.DealGroupId == groupId && o.UserId == userId);

            if (existingOrder != null)
            {
                return (true, "Order already verified/confirmed.", MapToDto(existingOrder, group.Deal));
            }

            // Create new confirmed order
            var newOrder = new Order
            {
                UserId = userId,
                DealGroupId = groupId,
                DealId = group.DealId,
                Status = "confirmed",
                PaymentStatus = "paid" // Simulating immediate payment for now
            };

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            // Optionally check if ALL members confirmed and move status to "completed"
            // omitted for brevity, but easily added here.

            return (true, "Order confirmed successfully.", MapToDto(newOrder, group.Deal));
        }

        public async Task<IEnumerable<OrderDto>> GetMyOrdersAsync(Guid userId)
        {
            var orders = await _context.Orders
                .Include(o => o.Deal)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            return orders.Select(o => MapToDto(o, o.Deal)).ToList();
        }

        private static OrderDto MapToDto(Order order, Deal? deal)
        {
            return new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                DealGroupId = order.DealGroupId,
                DealId = order.DealId,
                Status = order.Status,
                PaymentStatus = order.PaymentStatus,
                CreatedAt = order.CreatedAt,
                DealTitle = deal?.Title,
                PricePaid = deal?.GroupPrice
            };
        }
    }
}
