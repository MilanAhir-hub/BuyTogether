using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BuyTogether.Server.Constants;

namespace BuyTogether.Server.Models
{
    public class Property
    {
        // Primary Key
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        // Basic Info
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(2000)]
        public string Description { get; set; } = string.Empty;

        // Pricing
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountPrice { get; set; }

        [Required]
        [MaxLength(20)]
        public string DiscountType { get; set; } = DiscountTypes.Fixed;

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountValue { get; set; }

        // Location Info
        [Required]
        [MaxLength(500)]
        public string Location { get; set; } = string.Empty;

        public int Bedrooms { get; set; }

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? ImageUrl { get; set; }

        // Capacity & Constraints
        [Required]
        public int MaxPeopleAllowed { get; set; }

        [Required]
        public int RequiredGroupSize { get; set; } = 1;

        // Status (available, full, sold, etc.)
        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = PropertyStatuses.Available;

        // Ownership & Tracking
        [Required]
        public Guid OwnerId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation Properties
        [ForeignKey("OwnerId")]
        public User? Owner { get; set; }

        // Relationships (Future Expansion)
        public ICollection<Group> Groups { get; set; } = new List<Group>();
        public ICollection<PropertyDiscountTier> DiscountTiers { get; set; } = new List<PropertyDiscountTier>();
    }
}
