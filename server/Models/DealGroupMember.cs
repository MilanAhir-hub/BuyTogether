using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyTogether.Server.Models
{
    public class DealGroupMember
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid DealGroupId { get; set; }

        [Required]
        public Guid UserId { get; set; }

        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("DealGroupId")]
        public DealGroup? DealGroup { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
