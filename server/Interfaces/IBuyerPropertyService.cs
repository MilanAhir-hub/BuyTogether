using BuyTogether.Server.DTOs.Buyer;

namespace BuyTogether.Server.Interfaces
{
    public interface IBuyerPropertyService
    {
        Task<IReadOnlyCollection<BuyerPropertyDto>> GetAvailablePropertiesAsync(Guid? buyerId = null);
        Task<BuyerPropertyDto?> GetPropertyByIdAsync(Guid propertyId, Guid? buyerId = null);
    }
}
