using System.ComponentModel.DataAnnotations;

namespace BuyTogether.Server.DTOs.Deals
{
    public class CreateDealDto
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(2000)]
        public string Description { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? ImageUrl { get; set; }

        [Required]
        public decimal OriginalPrice { get; set; }

        [Required]
        public decimal GroupPrice { get; set; }

        [Required]
        public int MinBuyers { get; set; }

        public int? MaxBuyers { get; set; }

        [Required]
        public int ExpiryDurationHours { get; set; }
    }
}
