namespace BuyTogether.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "User"; // Required by existing DB schema
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
