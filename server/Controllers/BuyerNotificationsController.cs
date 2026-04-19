// BUYER NOTIFICATIONS CONTROLLER: Manages notifications sent to buyers, such as updates on their group status or new deals.
using BuyTogether.Server.Constants;
using BuyTogether.Server.Extensions;
using BuyTogether.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuyTogether.Server.Controllers
{
    [Authorize(Policy = AuthorizationPolicies.BuyerOnly)]
    [Route("api/buyer/notifications")]
    [ApiController]
    public class BuyerNotificationsController : ControllerBase
    {
        private readonly IUserNotificationService _userNotificationService;

        public BuyerNotificationsController(IUserNotificationService userNotificationService)
        {
            _userNotificationService = userNotificationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            if (!User.TryGetUserId(out var buyerId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            var notifications = await _userNotificationService.GetNotificationsAsync(buyerId);
            return Ok(notifications);
        }

        [HttpPost("{notificationId:guid}/read")]
        public async Task<IActionResult> MarkAsRead(Guid notificationId)
        {
            if (!User.TryGetUserId(out var buyerId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            var success = await _userNotificationService.MarkAsReadAsync(notificationId, buyerId);
            return success
                ? Ok(new { message = "Notification marked as read." })
                : NotFound(new { message = "Notification not found." });
        }
    }
}
