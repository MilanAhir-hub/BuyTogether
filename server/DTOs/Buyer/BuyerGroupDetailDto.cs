namespace BuyTogether.Server.DTOs.Buyer
{
    public class BuyerGroupDetailDto
    {
        public Guid GroupId { get; set; }
        public Guid PropertyId { get; set; }
        public string PropertyTitle { get; set; } = string.Empty;
        public string PropertyDescription { get; set; } = string.Empty;
        public string PropertyLocation { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public string DiscountType { get; set; } = string.Empty;
        public decimal DiscountValue { get; set; }
        public string GroupStatus { get; set; } = string.Empty;
        public int CurrentMembers { get; set; }
        public int RequiredGroupSize { get; set; }
        public int RemainingSlots { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal FinalPricePerBuyer { get; set; }
        public DateTime? PaymentDueAt { get; set; }
        public bool CanLeave { get; set; }
        public BuyerPaymentSummaryDto? MyPayment { get; set; }
        public decimal? MyOwnershipPercentage { get; set; }
        public IReadOnlyCollection<BuyerGroupMemberDto> Members { get; set; } = [];
    }
}
