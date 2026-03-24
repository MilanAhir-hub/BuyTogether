namespace BuyTogether.Server.DTOs.Profile
{
    public class ProfileBookingSummaryDto
    {
        public Guid Id { get; set; }
        public string PropertyTitle { get; set; } = string.Empty;
        public string PropertyLocation { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public decimal DiscountApplied { get; set; }
        public decimal FinalAmount { get; set; }
        public DateTime BookingDate { get; set; }
    }
}
