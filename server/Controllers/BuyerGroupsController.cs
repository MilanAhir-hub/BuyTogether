// BUYER GROUPS CONTROLLER: Handles everything a buyer does with their groups, like viewing joined groups, leaving groups, and processing internal payments.
using BuyTogether.Server.Constants;
using BuyTogether.Server.DTOs.Buyer;
using BuyTogether.Server.Extensions;
using BuyTogether.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuyTogether.Server.Controllers
{
    [Authorize(Policy = AuthorizationPolicies.BuyerOnly)]
    [Route("api/buyer/groups")]
    [ApiController]
    public class BuyerGroupsController : ControllerBase
    {
        private readonly IBuyerDealService _buyerDealService;

        public BuyerGroupsController(IBuyerDealService buyerDealService)
        {
            _buyerDealService = buyerDealService;
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyGroups()
        {
            if (!User.TryGetUserId(out var buyerId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            var groups = await _buyerDealService.GetBuyerGroupsAsync(buyerId);
            return Ok(groups);
        }

        [HttpGet("{groupId:guid}")]
        public async Task<IActionResult> GetGroup(Guid groupId)
        {
            if (!User.TryGetUserId(out var buyerId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            var group = await _buyerDealService.GetGroupAsync(groupId, buyerId);
            return group == null
                ? NotFound(new { message = "Group not found." })
                : Ok(group);
        }

        [HttpPost("{groupId:guid}/leave")]
        public async Task<IActionResult> LeaveGroup(Guid groupId)
        {
            if (!User.TryGetUserId(out var buyerId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            try
            {
                await _buyerDealService.LeaveGroupAsync(groupId, buyerId);
                return Ok(new { message = "Group left successfully." });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{groupId:guid}/payment")]
        public async Task<IActionResult> GetPaymentSummary(Guid groupId)
        {
            if (!User.TryGetUserId(out var buyerId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            var paymentSummary = await _buyerDealService.GetPaymentSummaryAsync(groupId, buyerId);
            return paymentSummary == null
                ? NotFound(new { message = "Payment details not found." })
                : Ok(paymentSummary);
        }

        [HttpPost("{groupId:guid}/payment")]
        public async Task<IActionResult> ProcessPayment(Guid groupId, [FromBody] ProcessPaymentDto request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            if (!User.TryGetUserId(out var buyerId))
            {
                return Unauthorized(new { message = "Invalid user token." });
            }

            try
            {
                var paymentSummary = await _buyerDealService.ProcessPaymentAsync(groupId, buyerId, request);
                return paymentSummary == null
                    ? NotFound(new { message = "Payment details not found." })
                    : Ok(paymentSummary);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
