using System.ComponentModel.DataAnnotations;

namespace BuyTogether.Server.DTOs.Properties
{
    public class UpdatePropertyDto
    {
        [MaxLength(200)]
        public string? Title { get; set; }

        [MaxLength(2000)]
        public string? Description { get; set; }

        [Range(typeof(decimal), "0.01", "79228162514264337593543950335")]
        public decimal? Price { get; set; }

        [MaxLength(500)]
        public string? Location { get; set; }

        [Range(0, 100)]
        public int? Bedrooms { get; set; }

        [Url]
        [MaxLength(1000)]
        public string? ImageUrl { get; set; }
    }
}
