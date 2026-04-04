using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyTogether.Server.Models
{
    public class PropertyDiscountTier
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid PropertyId { get; set; }

        [Required]
        [Range(1, 1000)]
        public int MinBuyers { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        [Range(0, 100)]
        public decimal DiscountPercentage { get; set; }

        [ForeignKey("PropertyId")]
        public Property? Property { get; set; }
    }
}
