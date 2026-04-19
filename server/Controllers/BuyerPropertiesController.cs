// BUYER PROPERTIES CONTROLLER: Allows buyers to view available properties they might want to join or invest in.
using BuyTogether.Server.Constants;
using BuyTogether.Server.Extensions;
using BuyTogether.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuyTogether.Server.Controllers
{
    [Route("api/buyer/properties")]
    [ApiController]
    public class BuyerPropertiesController : ControllerBase
    {
        private readonly IBuyerPropertyService _buyerPropertyService;
        private readonly IBuyerDealService _buyerDealService;

        public BuyerPropertiesController(
            IBuyerPropertyService buyerPropertyService,
            IBuyerDealService buyerDealService)
        {
            _buyerPropertyService = buyerPropertyService;
            _buyerDealService = buyerDealService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAvailableProperties()
        {
            Guid? buyerId = User.TryGetUserId(out var resolvedBuyerId) ? resolvedBuyerId : null;
            var properties = await _buyerPropertyService.GetAvailablePropertiesAsync(buyerId);
            return Ok(properties);
        }

        [HttpGet("{propertyId:guid}")]
        public async Task<IActionResult> GetPropertyById(Guid propertyId)
        {
            Guid? buyerId = User.TryGetUserId(out var resolvedBuyerId) ? resolvedBuyerId : null;
            var property = await _buyerPropertyService.GetPropertyByIdAsync(propertyId, buyerId);
            return property == null
                ? NotFound(new { message = "Property not found." })
                : Ok(property);
        }

        [Authorize(Policy = AuthorizationPolicies.BuyerOnly)]
        [HttpPost("{propertyId:guid}/join")]
        public async Task<IActionResult> JoinGroup(Guid propertyId)
        {
            // Payment functionality is now mandatory. This endpoint handles free joins, so it is disabled.
            // Joining is now completed via the PaymentController flow.
            return BadRequest(new { message = "Joining a group requires a commitment payment. Please use the secure checkout." });
        }
    }
}
