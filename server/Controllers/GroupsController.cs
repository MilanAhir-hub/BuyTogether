using BuyTogether.Server.DTOs;
using BuyTogether.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BuyTogether.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupsController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        // POST: api/groups/join
        [HttpPost("join")]
        [Authorize] // Requires user to be logged in
        public async Task<IActionResult> JoinGroup([FromBody] JoinGroupRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Optional: Ensure the request.UserId matches the logged-in user 
            // string? loggedInUserIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            // if (loggedInUserIdStr != null && int.TryParse(loggedInUserIdStr, out int loggedInUserId))
            // {
            //     if (loggedInUserId != request.UserId)
            //     {
            //         return Forbid();
            //     }
            // }

            var (success, message) = await _groupService.JoinGroupAsync(request);

            if (!success)
            {
                if (message.Contains("not found")) return NotFound(new { message });
                if (message.Contains("already joined")) return Conflict(new { message });
                if (message.Contains("full")) return BadRequest(new { message });
                
                return BadRequest(new { message });
            }

            return Ok(new { message });
        }
    }
}
