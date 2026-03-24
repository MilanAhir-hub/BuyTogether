namespace BuyTogether.Server.DTOs.Buyer
{
    public class BuyerPaymentSummaryDto
    {
        public Guid? PaymentId { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? TransactionId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public DateTime? PaymentDueAt { get; set; }
        public bool CanPay { get; set; }
        public bool CanRetry { get; set; }
    }
}
