using System;
using System.Collections.Generic;

namespace BuyTogether.Server.Models
{
    public class Property
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string PropertyType { get; set; } = string.Empty;
        public int Bedrooms { get; set; }
        public int Area { get; set; }
        public string BuilderName { get; set; } = string.Empty;
        public int MaxBuyers { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property for EF Core
        public ICollection<GroupMember> GroupMembers { get; set; } = new List<GroupMember>();
    }
}
