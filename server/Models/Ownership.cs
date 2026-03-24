using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyTogether.Server.Models
{
    public class Ownership
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid BuyerId { get; set; }

        [Required]
        public Guid PropertyId { get; set; }

        [Required]
        public Guid GroupId { get; set; }

        [Required]
        [Column(TypeName = "decimal(9,4)")]
        public decimal OwnershipPercentage { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey(nameof(BuyerId))]
        public User? Buyer { get; set; }

        [ForeignKey(nameof(PropertyId))]
        public Property? Property { get; set; }

        [ForeignKey(nameof(GroupId))]
        public Group? Group { get; set; }
    }
}
