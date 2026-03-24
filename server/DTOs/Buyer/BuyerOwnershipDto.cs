namespace BuyTogether.Server.DTOs.Buyer
{
    public class BuyerOwnershipDto
    {
        public Guid Id { get; set; }
        public Guid GroupId { get; set; }
        public Guid PropertyId { get; set; }
        public string PropertyTitle { get; set; } = string.Empty;
        public string PropertyLocation { get; set; } = string.Empty;
        public decimal OwnershipPercentage { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
