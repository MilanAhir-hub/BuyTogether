namespace BuyTogether.Server.DTOs.Profile
{
    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string PreferredLocation { get; set; } = string.Empty;
        public decimal? PreferredBudgetMin { get; set; }
        public decimal? PreferredBudgetMax { get; set; }
        public int? TargetGroupSize { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public ProfileDashboardStatsDto Stats { get; set; } = new();
        public List<ProfileGroupSummaryDto> ActiveGroups { get; set; } = new();
        public List<ProfileBookingSummaryDto> RecentBookings { get; set; } = new();
        public List<ProfileActivityDto> RecentActivities { get; set; } = new();
    }
}
