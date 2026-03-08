using BuyTogether.Server.Data;
using BuyTogether.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BuyTogether.Server.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly AppDbContext _context;

        public GroupRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetBuyersCountAsync(int propertyId)
        {
            return await _context.GroupMembers
                .Where(g => g.PropertyId == propertyId)
                .CountAsync();
        }

        public async Task<bool> HasUserJoinedGroupAsync(int propertyId, int userId)
        {
            return await _context.GroupMembers
                .AnyAsync(g => g.PropertyId == propertyId && g.UserId == userId);
        }

        public async Task AddGroupMemberAsync(GroupMember member)
        {
            await _context.GroupMembers.AddAsync(member);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
