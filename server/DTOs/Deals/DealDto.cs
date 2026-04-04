using System;

namespace BuyTogether.Server.DTOs.Deals
{
    public class DealDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public decimal OriginalPrice { get; set; }
        public decimal GroupPrice { get; set; }
        public int MinBuyers { get; set; }
        public int? MaxBuyers { get; set; }
        public int ExpiryDurationHours { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
