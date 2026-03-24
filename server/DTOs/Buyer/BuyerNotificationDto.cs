namespace BuyTogether.Server.DTOs.Buyer
{
    public class BuyerNotificationDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; }
        public Guid? GroupId { get; set; }
        public Guid? PropertyId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
