using BuyTogether.Server.Constants;
using BuyTogether.Server.Extensions;
using BuyTogether.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuyTogether.Server.Controllers
{
    [Authorize(Policy = AuthorizationPolicies.BuyerOnly)]
    [Route("api/buyer/ownerships")]
    [ApiController]
    public class BuyerOwnershipController : ControllerBase
    {
        private readonly IBuyerDealService _buyerDealService;

        public BuyerOwnershipController(IBuyerDealService buyerDealService)
        {
            _buyerDealService = buyerDealService;
        }

        [HttpGet]
        public async Task<IActionResult> GetOwnerships()
        {
            if (!User.TryGetUserId(out var buyerId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            var ownerships = await _buyerDealService.GetOwnershipsAsync(buyerId);
            return Ok(ownerships);
        }
    }
}
