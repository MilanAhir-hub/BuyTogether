using System.ComponentModel.DataAnnotations;

namespace BuyTogether.Server.DTOs.Auth
{
    public class UserSignupDto
    {
        [MaxLength(50)]
        public string? Username { get; set; }

        [MaxLength(100)]
        public string? Name { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        [MaxLength(100)]
        public string Password { get; set; } = string.Empty;
    }
}
