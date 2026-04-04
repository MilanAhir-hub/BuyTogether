using System;
using System.Security.Claims;
using System.Threading.Tasks;
using BuyTogether.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuyTogether.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // POST /api/orders/confirm/{groupId}
        [HttpPost("confirm/{groupId}")]
        public async Task<IActionResult> ConfirmOrder(Guid groupId)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            {
                return Unauthorized(new { success = false, message = "Invalid token." });
            }

            var result = await _orderService.ConfirmOrderAsync(userId, groupId);

            if (!result.Success)
            {
                return BadRequest(new { success = false, message = result.Message });
            }

            return Ok(new { success = true, message = result.Message, data = result.Order });
        }

        // GET /api/orders/my-orders
        [HttpGet("my-orders")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            {
                return Unauthorized(new { success = false, message = "Invalid token." });
            }

            var orders = await _orderService.GetMyOrdersAsync(userId);
            return Ok(new { success = true, data = orders });
        }
    }
}
