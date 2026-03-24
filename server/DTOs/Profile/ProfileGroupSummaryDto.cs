namespace BuyTogether.Server.DTOs.Profile
{
    public class ProfileGroupSummaryDto
    {
        public Guid Id { get; set; }
        public string PropertyTitle { get; set; } = string.Empty;
        public string PropertyCity { get; set; } = string.Empty;
        public string PropertyLocation { get; set; } = string.Empty;
        public string MemberRole { get; set; } = string.Empty;
        public string GroupStatus { get; set; } = string.Empty;
        public int CurrentMembers { get; set; }
        public int MaxMembers { get; set; }
        public decimal EstimatedDiscountAmount { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}
