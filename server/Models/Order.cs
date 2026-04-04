using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyTogether.Server.Models
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid DealGroupId { get; set; }

        [Required]
        public Guid DealId { get; set; }

        // pending, confirmed, cancelled
        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = "pending";

        // unpaid, paid, refunded
        [Required]
        [MaxLength(20)]
        public string PaymentStatus { get; set; } = "unpaid";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("DealGroupId")]
        public DealGroup? DealGroup { get; set; }

        [ForeignKey("DealId")]
        public Deal? Deal { get; set; }
    }
}
