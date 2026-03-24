using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyTogether.Server.Models
{
    public class GroupMember
    {
        // Primary Key
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        // Foreign Keys
        [Required]
        public Guid GroupId { get; set; }

        [Required]
        public Guid UserId { get; set; }

        // Role (Creator, Member, etc.)
        [Required]
        [MaxLength(20)]
        public string Role { get; set; } = "Member";

        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("GroupId")]
        public Group? Group { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}