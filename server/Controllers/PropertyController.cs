// PROPERTY CONTROLLER: Manages property listings, allowing sellers to create/delete properties and users to view them.
using BuyTogether.Server.Constants;
using BuyTogether.Server.DTOs.Properties;
using BuyTogether.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BuyTogether.Server.Controllers
{
    [Route("api/properties")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertyController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProperties()
        {
            var properties = await _propertyService.GetAllPropertiesAsync();
            return Ok(properties);
        }

        [Authorize(Roles = UserRoles.Seller)]
        [HttpGet("my-properties")]
        public async Task<IActionResult> GetMyProperties()
        {
            if (!TryGetUserId(out var userId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            var properties = await _propertyService.GetPropertiesByOwnerAsync(userId);
            return Ok(properties);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetPropertyById(Guid id)
        {
            var property = await _propertyService.GetPropertyByIdAsync(id);
            if (property == null)
            {
                return NotFound(new { message = "Property not found." });
            }

            return Ok(property);
        }

        [Authorize(Roles = UserRoles.Seller)]
        [HttpPost]
        public async Task<IActionResult> CreateProperty([FromBody] CreatePropertyDto dto)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            if (!TryGetUserId(out var userId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            try
            {
                var createdProperty = await _propertyService.CreatePropertyAsync(dto, userId);
                return CreatedAtAction(nameof(GetPropertyById), new { id = createdProperty.Id }, createdProperty);
            }
            catch (KeyNotFoundException)
            {
                return Unauthorized(new { message = "Unable to resolve the authenticated user." });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Unable to create property right now." });
            }
        }

        [Authorize(Roles = UserRoles.Seller)]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateProperty(Guid id, [FromBody] UpdatePropertyDto dto)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            if (!TryGetUserId(out var userId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            try
            {
                var updatedProperty = await _propertyService.UpdatePropertyAsync(id, dto, userId);
                return Ok(updatedProperty);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Unable to update property right now." });
            }
        }

        [Authorize(Roles = UserRoles.Seller)]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteProperty(Guid id)
        {
            if (!TryGetUserId(out var userId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            try
            {
                var result = await _propertyService.DeletePropertyAsync(id, userId);

                return result switch
                {
                    PropertyDeleteResult.Deleted => NoContent(),
                    PropertyDeleteResult.NotFound => NotFound(new { message = "Property not found." }),
                    PropertyDeleteResult.Forbidden => StatusCode(StatusCodes.Status403Forbidden, new { message = "You can only delete your own properties." }),
                    PropertyDeleteResult.Conflict => Conflict(new { message = "This property is linked to existing groups or bookings and cannot be deleted." }),
                    _ => StatusCode(StatusCodes.Status500InternalServerError, new { message = "Unable to delete property right now." })
                };
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Unable to delete property right now." });
            }
        }

        private bool TryGetUserId(out Guid userId)
        {
            userId = Guid.Empty;
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim != null && Guid.TryParse(userIdClaim.Value, out userId);
        }
    }
}
