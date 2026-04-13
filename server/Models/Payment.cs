using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BuyTogether.Server.Constants;

namespace BuyTogether.Server.Models
{
    public class Payment
    {
        // Primary Key
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        // Foreign Keys
        [Required]
        public Guid UserId { get; set; }

        public Guid? GroupId { get; set; }

        public Guid? DealGroupId { get; set; }

        // Payment Details
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        // Status (Pending, Completed, Failed, etc.)
        [Required]
        [MaxLength(20)]
        public string PaymentStatus { get; set; } = PaymentStatuses.Pending;

        // Razorpay Details
        [MaxLength(100)]
        public string? RazorpayOrderId { get; set; }

        [MaxLength(100)]
        public string? RazorpayPaymentId { get; set; }

        [MaxLength(200)]
        public string? RazorpaySignature { get; set; }

        // Timestamp
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation Properties
        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("GroupId")]
        public Group? Group { get; set; }

        [ForeignKey("DealGroupId")]
        public DealGroup? DealGroup { get; set; }
    }
}
