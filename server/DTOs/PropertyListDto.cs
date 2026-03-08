namespace BuyTogether.Server.DTOs
{
    public class PropertyListDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int BuyersJoined { get; set; }
        public int MaxBuyers { get; set; }
    }
}
