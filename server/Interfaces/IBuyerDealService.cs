using BuyTogether.Server.DTOs.Buyer;

namespace BuyTogether.Server.Interfaces
{
    public interface IBuyerDealService
    {
        Task<BuyerGroupDetailDto> JoinPropertyGroupAsync(Guid propertyId, Guid buyerId);
        Task LeaveGroupAsync(Guid groupId, Guid buyerId);
        Task<IReadOnlyCollection<BuyerGroupSummaryDto>> GetBuyerGroupsAsync(Guid buyerId);
        Task<BuyerGroupDetailDto?> GetGroupAsync(Guid groupId, Guid buyerId);
        Task<BuyerPaymentSummaryDto?> GetPaymentSummaryAsync(Guid groupId, Guid buyerId);
        Task<BuyerPaymentSummaryDto?> ProcessPaymentAsync(Guid groupId, Guid buyerId, ProcessPaymentDto request);
        Task<IReadOnlyCollection<BuyerOwnershipDto>> GetOwnershipsAsync(Guid buyerId);
    }
}
