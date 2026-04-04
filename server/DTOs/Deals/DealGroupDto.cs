using System;
using System.Collections.Generic;

namespace BuyTogether.Server.DTOs.Deals
{
    public class DealGroupDto
    {
        public Guid Id { get; set; }
        public Guid DealId { get; set; }
        public int CurrentCount { get; set; }
        public string Status { get; set; } = string.Empty; // "waiting", "active", "expired", "completed"
        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }

        // Optionally include minimal Deal info so frontend doesn't have to fetch it separately
        public string? DealTitle { get; set; }
        public decimal? DealGroupPrice { get; set; }
        public int? MinBuyers { get; set; }
        public int? MaxBuyers { get; set; }
    }
}
