// DATABASE MODEL: Represents a registered user in the system (Buyer, Seller, or Admin).
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyTogether.Server.Models
{
    public class User
    {
        // Primary Key
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        // Basic Info
        [Required]
        [MaxLength(50)]
        public string Username { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? FullName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? PhoneNumber { get; set; }

        [MaxLength(100)]
        public string? City { get; set; }

        [MaxLength(500)]
        public string? Bio { get; set; }

        [MaxLength(150)]
        public string? PreferredLocation { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? PreferredBudgetMin { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? PreferredBudgetMax { get; set; }

        public int? TargetGroupSize { get; set; }

        //  Authentication
        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        // Authorization (Role-based)
        [Required]
        [MaxLength(20)]
        public string Role { get; set; } = "User"; // Admin, User, Seller

        public string? PasswordResetToken { get; set; }
        public DateTime? PasswordResetTokenExpiry { get; set; }

        //  Account Status
        public bool IsActive { get; set; } = true;
        public bool IsBlocked { get; set; } = false;

        //  Tracking
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }

        //  Relationships (Future Expansion)
        // Example: One user can have many orders
        // public ICollection<Order>? Orders { get; set; }

        // Example: One user can have many products (if seller)
        // public ICollection<Product>? Products { get; set; }
    }
}
