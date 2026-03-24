namespace BuyTogether.Server.DTOs.Buyer
{
    public class BuyerPropertyDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public int RequiredGroupSize { get; set; }
        public string DiscountType { get; set; } = string.Empty;
        public decimal DiscountValue { get; set; }
        public BuyerActiveGroupSummaryDto Group { get; set; } = new();
    }
}
