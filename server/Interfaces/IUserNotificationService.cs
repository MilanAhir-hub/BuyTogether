using BuyTogether.Server.DTOs.Buyer;

namespace BuyTogether.Server.Interfaces
{
    public interface IUserNotificationService
    {
        Task<IReadOnlyCollection<BuyerNotificationDto>> GetNotificationsAsync(Guid buyerId);
        Task<bool> MarkAsReadAsync(Guid notificationId, Guid buyerId);
    }
}
