using BuyTogether.Server.DTOs;
using BuyTogether.Server.Models;
using BuyTogether.Server.Repositories;
using System.Threading.Tasks;

namespace BuyTogether.Server.Services
{
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IPropertyRepository _propertyRepository;

        public GroupService(IGroupRepository groupRepository, IPropertyRepository propertyRepository)
        {
            _groupRepository = groupRepository;
            _propertyRepository = propertyRepository;
        }

        public async Task<(bool Success, string Message)> JoinGroupAsync(JoinGroupRequestDto request)
        {
            var property = await _propertyRepository.GetPropertyByIdAsync(request.PropertyId);
            if (property == null)
            {
                return (false, "Property not found.");
            }

            var hasJoined = await _groupRepository.HasUserJoinedGroupAsync(request.PropertyId, request.UserId);
            if (hasJoined)
            {
                return (false, "User has already joined this group.");
            }

            var currentBuyersCount = await _groupRepository.GetBuyersCountAsync(request.PropertyId);
            if (currentBuyersCount >= property.MaxBuyers)
            {
                return (false, "Group is already full.");
            }

            var member = new GroupMember
            {
                PropertyId = request.PropertyId,
                UserId = request.UserId
            };

            await _groupRepository.AddGroupMemberAsync(member);
            await _groupRepository.SaveChangesAsync();

            return (true, "Successfully joined group.");
        }
    }
}
