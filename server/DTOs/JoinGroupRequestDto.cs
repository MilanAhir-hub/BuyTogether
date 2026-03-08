using System.ComponentModel.DataAnnotations;

namespace BuyTogether.Server.DTOs
{
    public class JoinGroupRequestDto
    {
        [Required]
        public int PropertyId { get; set; }
        
        [Required]
        public int UserId { get; set; }
    }
}
