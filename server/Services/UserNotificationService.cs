using BuyTogether.Server.Data;
using BuyTogether.Server.DTOs.Buyer;
using BuyTogether.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BuyTogether.Server.Services
{
    public class UserNotificationService : IUserNotificationService
    {
        private readonly AppDbContext _context;

        public UserNotificationService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyCollection<BuyerNotificationDto>> GetNotificationsAsync(Guid buyerId)
        {
            return await _context.UserNotifications
                .AsNoTracking()
                .Where(notification => notification.UserId == buyerId)
                .OrderByDescending(notification => notification.CreatedAt)
                .Select(notification => new BuyerNotificationDto
                {
                    Id = notification.Id,
                    Type = notification.Type,
                    Title = notification.Title,
                    Message = notification.Message,
                    IsRead = notification.IsRead,
                    GroupId = notification.GroupId,
                    PropertyId = notification.PropertyId,
                    CreatedAt = notification.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<bool> MarkAsReadAsync(Guid notificationId, Guid buyerId)
        {
            var notification = await _context.UserNotifications
                .SingleOrDefaultAsync(item => item.Id == notificationId && item.UserId == buyerId);

            if (notification == null)
            {
                return false;
            }

            if (!notification.IsRead)
            {
                notification.IsRead = true;
                await _context.SaveChangesAsync();
            }

            return true;
        }
    }
}
