using System;
using System.Threading.Tasks;
using BuyTogether.Server.Constants;
using BuyTogether.Server.DTOs.Deals;
using BuyTogether.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuyTogether.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DealsController : ControllerBase
    {
        private readonly IDealService _dealService;

        public DealsController(IDealService dealService)
        {
            _dealService = dealService;
        }

        // GET: api/deals
        [HttpGet]
        public async Task<IActionResult> GetAllActiveDeals()
        {
            var deals = await _dealService.GetAllActiveDealsAsync();
            return Ok(new { success = true, data = deals });
        }

        // GET: api/deals/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDealById(Guid id)
        {
            var deal = await _dealService.GetDealByIdAsync(id);
            if (deal == null)
                return NotFound(new { success = false, message = "Deal not found" });

            return Ok(new { success = true, data = deal });
        }

        // POST: api/deals
        [HttpPost]
        [Authorize(Roles = UserRoles.Seller + "," + UserRoles.Admin)] // Only Seller/Admin can create deals
        public async Task<IActionResult> CreateDeal([FromBody] CreateDealDto createDealDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { success = false, message = "Invalid data", errors = ModelState });
            }

            try
            {
                var deal = await _dealService.CreateDealAsync(createDealDto);
                return CreatedAtAction(nameof(GetDealById), new { id = deal.Id }, new { success = true, message = "Deal created successfully", data = deal });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Internal server error", error = ex.Message });
            }
        }
    }
}
