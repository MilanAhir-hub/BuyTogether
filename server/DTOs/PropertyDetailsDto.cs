namespace BuyTogether.Server.DTOs
{
    public class PropertyDetailsDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string PropertyType { get; set; } = string.Empty;
        public int Bedrooms { get; set; }
        public int Area { get; set; }
        public string BuilderName { get; set; } = string.Empty;
        public int MaxBuyers { get; set; }
        public int BuyersJoined { get; set; }
    }
}
