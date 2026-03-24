namespace BuyTogether.Server.DTOs.Buyer
{
    public class BuyerActiveGroupSummaryDto
    {
        public Guid? GroupId { get; set; }
        public string Status { get; set; } = string.Empty;
        public int CurrentMembers { get; set; }
        public int RequiredGroupSize { get; set; }
        public int RemainingSlots { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal FinalPricePerBuyer { get; set; }
        public DateTime? PaymentDueAt { get; set; }
        public bool CanJoin { get; set; }
        public bool CanLeave { get; set; }
        public bool HasJoined { get; set; }
    }
}
