using System;
using System.Security.Claims;
using System.Threading.Tasks;
using BuyTogether.Server.Hubs;
using BuyTogether.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace BuyTogether.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // All group actions require authentication
    public class DealGroupsController : ControllerBase
    {
        private readonly IDealGroupService _dealGroupService;
        private readonly IHubContext<GroupHub> _hubContext;

        public DealGroupsController(IDealGroupService dealGroupService, IHubContext<GroupHub> hubContext)
        {
            _dealGroupService = dealGroupService;
            _hubContext = hubContext;
        }

        // POST /api/dealgroups/join/{dealId}
        [HttpPost("join/{dealId}")]
        public IActionResult JoinDeal(Guid dealId)
        {
            return BadRequest(new { success = false, message = "Direct joining is disabled. Please complete the commitment payment first." });
        }

        // POST /api/dealgroups/leave/{dealId}
        [HttpPost("leave/{dealId}")]
        public async Task<IActionResult> LeaveDeal(Guid dealId)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            {
                return Unauthorized(new { success = false, message = "Invalid token." });
            }

            var result = await _dealGroupService.LeaveDealAsync(userId, dealId);

            if (!result.Success)
            {
                return BadRequest(new { success = false, message = result.Message });
            }

            // SignalR broadcast assuming we need to update clients upon leaving
            await _hubContext.Clients.Group(dealId.ToString())
                .SendAsync("GroupMemberLeft", new { dealId = dealId, userId = userId });

            return Ok(new { success = true, message = result.Message });
        }

        // GET /api/dealgroups/{groupId}
        [HttpGet("{groupId}")]
        public async Task<IActionResult> GetGroup(Guid groupId)
        {
            var group = await _dealGroupService.GetGroupStatusAsync(groupId);
            if (group == null)
            {
                return NotFound(new { success = false, message = "Group not found." });
            }

            return Ok(new { success = true, data = group });
        }

        // GET /api/dealgroups/my-groups
        [HttpGet("my-groups")]
        public async Task<IActionResult> GetMyGroups()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            {
                return Unauthorized(new { success = false, message = "Invalid token." });
            }

            var groups = await _dealGroupService.GetMyGroupsAsync(userId);
            return Ok(new { success = true, data = groups });
        }
    }
}
