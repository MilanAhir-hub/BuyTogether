using System.ComponentModel.DataAnnotations;

namespace BuyTogether.Server.DTOs.Properties
{
    public class DiscountTierDto
    {
        [Required]
        [Range(1, 1000)]
        public int MinBuyers { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal DiscountPercentage { get; set; }
    }
}
