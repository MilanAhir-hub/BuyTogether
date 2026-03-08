using System;

namespace BuyTogether.Server.Models
{
    public class GroupMember
    {
        public int Id { get; set; }
        
        public int PropertyId { get; set; }
        public Property? Property { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    }
}
