using System.ComponentModel.DataAnnotations;

namespace BuyTogether.Server.DTOs.Profile
{
    public class UpdateUserProfileDto
    {
        [MaxLength(100)]
        public string? FullName { get; set; }

        [MaxLength(20)]
        [RegularExpression(@"^[0-9+\-\s()]{7,20}$", ErrorMessage = "Phone number format is invalid.")]
        public string? PhoneNumber { get; set; }

        [MaxLength(100)]
        public string? City { get; set; }

        [MaxLength(500)]
        public string? Bio { get; set; }

        [MaxLength(150)]
        public string? PreferredLocation { get; set; }

        [Range(typeof(decimal), "0", "1000000000000")]
        public decimal? PreferredBudgetMin { get; set; }

        [Range(typeof(decimal), "0", "1000000000000")]
        public decimal? PreferredBudgetMax { get; set; }

        [Range(2, 20)]
        public int? TargetGroupSize { get; set; }
    }
}
