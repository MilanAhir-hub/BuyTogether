using System;

namespace BuyTogether.Server.DTOs.Deals
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid DealGroupId { get; set; }
        public Guid DealId { get; set; }
        public string Status { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        
        // Contextual info
        public string? DealTitle { get; set; }
        public decimal? PricePaid { get; set; }
    }
}
