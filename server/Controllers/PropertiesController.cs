using BuyTogether.Server.DTOs;
using BuyTogether.Server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BuyTogether.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertiesController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        // GET: api/properties?pageNumber=1&pageSize=9&location=Gurgaon
        [HttpGet]
        public async Task<ActionResult<PaginatedResponseDto<PropertyListDto>>> GetProperties(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 9,
            [FromQuery] string? location = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 9;

            var result = await _propertyService.GetPropertiesAsync(pageNumber, pageSize, location, minPrice, maxPrice);
            return Ok(result);
        }

        // GET: api/properties/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyDetailsDto>> GetProperty(int id)
        {
            var property = await _propertyService.GetPropertyDetailsAsync(id);

            if (property == null)
            {
                return NotFound(new { message = $"Property with ID {id} not found." });
            }

            return Ok(property);
        }
    }
}
