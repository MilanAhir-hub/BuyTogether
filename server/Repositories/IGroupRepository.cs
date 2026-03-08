using BuyTogether.Server.Models;
using System.Threading.Tasks;

namespace BuyTogether.Server.Repositories
{
    public interface IGroupRepository
    {
        Task<int> GetBuyersCountAsync(int propertyId);
        Task<bool> HasUserJoinedGroupAsync(int propertyId, int userId);
        Task AddGroupMemberAsync(GroupMember member);
        Task SaveChangesAsync();
    }
}
