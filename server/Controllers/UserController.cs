// USER CONTROLLER: Manages user profiles (viewing/updating) and allows regular users to upgrade to 'Seller' status.
using BuyTogether.Server.DTOs.Profile;
using BuyTogether.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BuyTogether.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;
        private readonly IAuthService _authService;

        public UserController(IUserProfileService userProfileService, IAuthService authService)
        {
            _userProfileService = userProfileService;
            _authService = authService;
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetUserProfile()
        {
            if (!TryGetUserId(out var userId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            var userProfile = await _userProfileService.GetProfileAsync(userId);
            if (userProfile == null)
            {
                return NotFound(new { message = "User not found." });
            }

            return Ok(userProfile);
        }

        [Authorize]
        [HttpPut("me")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserProfileDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            if (!TryGetUserId(out var userId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            if (updateDto.PreferredBudgetMin.HasValue &&
                updateDto.PreferredBudgetMax.HasValue &&
                updateDto.PreferredBudgetMin > updateDto.PreferredBudgetMax)
            {
                return BadRequest(new { message = "Minimum budget cannot exceed maximum budget." });
            }

            var updatedProfile = await _userProfileService.UpdateProfileAsync(userId, updateDto);
            if (updatedProfile == null)
            {
                return NotFound(new { message = "User not found." });
            }

            return Ok(updatedProfile);
        }

        [Authorize]
        [HttpPost("become-seller")]
        public async Task<IActionResult> BecomeSeller()
        {
            if (!TryGetUserId(out var userId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            var result = await _authService.UpgradeToSellerAsync(userId);
            if (string.IsNullOrEmpty(result.Token))
            {
                return BadRequest(new { message = result.Message });
            }

            return Ok(result);
        }

        private bool TryGetUserId(out Guid userId)
        {
            userId = Guid.Empty;
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim != null && Guid.TryParse(userIdClaim.Value, out userId);
        }
    }
}
