namespace BuyTogether.Server.DTOs.Profile
{
    public class ProfileDashboardStatsDto
    {
        public int GroupsJoinedCount { get; set; }
        public int GroupsCreatedCount { get; set; }
        public int PropertiesOwnedCount { get; set; }
        public int ConfirmedBookingsCount { get; set; }
        public decimal TotalSavingsAmount { get; set; }
        public int ProfileCompletionPercentage { get; set; }
    }
}
