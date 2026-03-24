using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyTogether.Server.Models
{
    public class Booking
    {
        // Primary Key
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        // Foreign Keys
        [Required]
        public Guid GroupId { get; set; }

        [Required]
        public Guid PropertyId { get; set; }

        // Pricing Info
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountApplied { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal FinalAmount { get; set; }

        // Status (Pending, Confirmed, Cancelled, etc.)
        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = "Pending";

        // Tracking
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("GroupId")]
        public Group? Group { get; set; }

        [ForeignKey("PropertyId")]
        public Property? Property { get; set; }
    }
}