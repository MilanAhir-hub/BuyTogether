namespace BuyTogether.Server.Constants
{
    public static class DiscountTypes
    {
        public const string Fixed = "Fixed";
        public const string Percentage = "Percentage";

        public static readonly string[] All =
        [
            Fixed,
            Percentage
        ];
    }
}
