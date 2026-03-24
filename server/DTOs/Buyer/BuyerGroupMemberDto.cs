namespace BuyTogether.Server.DTOs.Buyer
{
    public class BuyerGroupMemberDto
    {
        public Guid BuyerId { get; set; }
        public string BuyerName { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = string.Empty;
        public decimal? OwnershipPercentage { get; set; }
        public DateTime JoinedAt { get; set; }
        public bool IsCurrentBuyer { get; set; }
    }
}
