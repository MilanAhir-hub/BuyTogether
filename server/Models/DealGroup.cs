using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyTogether.Server.Models
{
    public class DealGroup
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid DealId { get; set; }

        public int CurrentCount { get; set; } = 0;

        // "waiting", "active", "expired", "completed"
        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = "waiting";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime ExpiresAt { get; set; }

        // Navigation Property
        [ForeignKey("DealId")]
        public Deal? Deal { get; set; }
        
        public ICollection<DealGroupMember> Members { get; set; } = new List<DealGroupMember>();
    }
}
