using System.ComponentModel.DataAnnotations;

namespace BuyTogether.Server.DTOs.Buyer
{
    public class ProcessPaymentDto
    {
        [Range(typeof(decimal), "0.01", "79228162514264337593543950335")]
        public decimal Amount { get; set; }

        [MaxLength(100)]
        public string? TransactionId { get; set; }

        [RegularExpression("^(Paid|Failed)$", ErrorMessage = "RequestedStatus must be Paid or Failed.")]
        public string RequestedStatus { get; set; } = "Paid";
    }
}
