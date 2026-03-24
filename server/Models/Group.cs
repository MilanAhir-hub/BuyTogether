using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BuyTogether.Server.Constants;

namespace BuyTogether.Server.Models
{
    public class Group
    {
        // Primary Key
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        // Foreign Key to Property
        [Required]
        public Guid PropertyId { get; set; }

        // Creator Identification
        [Required]
        public Guid CreatedBy { get; set; }

        // Group Constraints
        [Required]
        public int MaxMembers { get; set; }

        public int CurrentMembers { get; set; }

        // Status (Open, Full, Closed, etc.)
        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = GroupStatuses.Open;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPriceSnapshot { get; set; }

        [MaxLength(20)]
        public string? DiscountTypeSnapshot { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountValueSnapshot { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal FinalPricePerBuyer { get; set; }

        public DateTime? PaymentDueAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public DateTime? CancelledAt { get; set; }

        // Timestamp
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation Properties
        [ForeignKey("PropertyId")]
        public Property? Property { get; set; }

        // Relationships
        // [ForeignKey("CreatedBy")]
        // public User? Creator { get; set; }

        public ICollection<GroupMember> Members { get; set; } = new List<GroupMember>();
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
        public Booking? Booking { get; set; } 
        public ICollection<Ownership> Ownerships { get; set; } = new List<Ownership>();
    }
}
