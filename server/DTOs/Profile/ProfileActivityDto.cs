namespace BuyTogether.Server.DTOs.Profile
{
    public class ProfileActivityDto
    {
        public string Id { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public decimal? Amount { get; set; }
        public DateTime OccurredAt { get; set; }
    }
}
