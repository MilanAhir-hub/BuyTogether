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
    public class DealGroupService : IDealGroupService
    {
        private readonly AppDbContext _context;

        public DealGroupService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(bool Success, string Message, DealGroupDto? Group)> JoinDealAsync(Guid userId, Guid dealId)
        {
            // Transaction to prevent race conditions when checking group limits
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var deal = await _context.Deals.FindAsync(dealId);
                if (deal == null || !deal.IsActive)
                {
                    return (false, "Deal is not active or found.", null);
                }

                // Check if user is already in an open/active group for this deal
                var existingMembership = await _context.DealGroupMembers
                    .Include(m => m.DealGroup)
                    .FirstOrDefaultAsync(m => m.UserId == userId && m.DealGroup!.DealId == dealId && (m.DealGroup.Status == "waiting" || m.DealGroup.Status == "active"));
                
                if (existingMembership != null)
                {
                    return (false, "You have already joined this deal.", null);
                }

                // Find an OPEN group
                var openGroup = await _context.DealGroups
                    .Where(g => g.DealId == dealId && g.Status == "waiting" && (deal.MaxBuyers == null || g.CurrentCount < deal.MaxBuyers))
                    .OrderBy(g => g.CreatedAt) // fill oldest open group first
                    .FirstOrDefaultAsync();

                if (openGroup != null)
                {
                    // Update existing group
                    openGroup.CurrentCount++;
                    var member = new DealGroupMember { DealGroupId = openGroup.Id, UserId = userId };
                    _context.DealGroupMembers.Add(member);

                    // Status transitions
                    if (openGroup.CurrentCount >= deal.MinBuyers)
                    {
                        openGroup.Status = "active";
                    }

                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();

                    // TODO: Trigger SignalR Hub here or in controller
                    return (true, "Joined existing group successfully.", MapToDto(openGroup, deal));
                }
                else
                {
                    // Create new group
                    var newGroup = new DealGroup
                    {
                        DealId = dealId,
                        CurrentCount = 1,
                        Status = "waiting",
                        ExpiresAt = DateTime.UtcNow.AddHours(deal.ExpiryDurationHours)
                    };

                    _context.DealGroups.Add(newGroup);
                    
                    var member = new DealGroupMember { DealGroupId = newGroup.Id, UserId = userId };
                    _context.DealGroupMembers.Add(member);

                    if (newGroup.CurrentCount >= deal.MinBuyers)
                    {
                        // edge case where minBuyers = 1
                        newGroup.Status = "active";
                    }

                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();

                    return (true, "Created and joined new group.", MapToDto(newGroup, deal));
                }
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return (false, "An error occurred while joining the deal: " + ex.Message, null);
            }
        }

        public async Task<(bool Success, string Message)> LeaveDealAsync(Guid userId, Guid dealId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var membership = await _context.DealGroupMembers
                    .Include(m => m.DealGroup)
                    .ThenInclude(g => g!.Deal)
                    .FirstOrDefaultAsync(m => m.UserId == userId && m.DealGroup!.DealId == dealId && m.Status == "Active");

                if (membership == null)
                {
                    return (false, "You are not an active member of this deal.");
                }

                if (membership.DealGroup?.Status == "completed" || membership.DealGroup?.Status == "expired")
                {
                    return (false, $"Cannot leave because the group is already {membership.DealGroup.Status}.");
                }

                membership.Status = "Left";
                
                if (membership.DealGroup != null)
                {
                    membership.DealGroup.CurrentCount = Math.Max(0, membership.DealGroup.CurrentCount - 1);
                    
                    if (membership.DealGroup.CurrentCount < membership.DealGroup.Deal?.MinBuyers)
                    {
                        membership.DealGroup.Status = "waiting";
                    }
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return (true, "You successfully left the deal.");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return (false, "An error occurred while leaving the deal: " + ex.Message);
            }
        }

        public async Task<DealGroupDto?> GetGroupStatusAsync(Guid groupId)
        {
            var group = await _context.DealGroups
                .Include(g => g.Deal)
                .SingleOrDefaultAsync(g => g.Id == groupId);

            if (group == null) return null;

            return MapToDto(group, group.Deal);
        }

        public async Task<IEnumerable<DealGroupDto>> GetMyGroupsAsync(Guid userId)
        {
            var groups = await _context.DealGroupMembers
                .Include(m => m.DealGroup)
                .ThenInclude(g => g.Deal)
                .Where(m => m.UserId == userId)
                .Select(m => m.DealGroup!)
                .OrderByDescending(g => g.CreatedAt)
                .ToListAsync();

            return groups.Select(g => MapToDto(g, g.Deal)).ToList();
        }

        private static DealGroupDto MapToDto(DealGroup group, Deal? deal)
        {
            return new DealGroupDto
            {
                Id = group.Id,
                DealId = group.DealId,
                CurrentCount = group.CurrentCount,
                Status = group.Status,
                CreatedAt = group.CreatedAt,
                ExpiresAt = group.ExpiresAt,
                DealTitle = deal?.Title,
                DealGroupPrice = deal?.GroupPrice,
                MinBuyers = deal?.MinBuyers,
                MaxBuyers = deal?.MaxBuyers
            };
        }
    }
}
