namespace BuyTogether.Server.DTOs.Buyer
{
    public class BuyerGroupSummaryDto
    {
        public Guid GroupId { get; set; }
        public Guid PropertyId { get; set; }
        public string PropertyTitle { get; set; } = string.Empty;
        public string PropertyLocation { get; set; } = string.Empty;
        public string GroupStatus { get; set; } = string.Empty;
        public int CurrentMembers { get; set; }
        public int RequiredGroupSize { get; set; }
        public int RemainingSlots { get; set; }
        public decimal FinalPricePerBuyer { get; set; }
        public DateTime? PaymentDueAt { get; set; }
        public string MyPaymentStatus { get; set; } = string.Empty;
        public decimal? MyOwnershipPercentage { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}
