using BuyTogether.Server.Constants;
using BuyTogether.Server.Models;

namespace BuyTogether.Server.Helpers
{
    public static class BuyerPricingCalculator
    {
        public static int ResolveRequiredGroupSize(Property property)
        {
            if (property.RequiredGroupSize > 0)
            {
                return property.RequiredGroupSize;
            }

            return Math.Max(property.MaxPeopleAllowed, 1);
        }

        public static decimal CalculateDiscountAmount(decimal totalPrice, string? discountType, decimal discountValue)
        {
            if (totalPrice <= 0)
            {
                return 0m;
            }

            var normalizedDiscountType = NormalizeDiscountType(discountType);
            var rawDiscountAmount = string.Equals(normalizedDiscountType, DiscountTypes.Percentage, StringComparison.OrdinalIgnoreCase)
                ? totalPrice * (Math.Max(discountValue, 0m) / 100m)
                : Math.Max(discountValue, 0m);

            return Math.Min(decimal.Round(rawDiscountAmount, 2, MidpointRounding.AwayFromZero), totalPrice);
        }

        public static decimal CalculateFinalPricePerBuyer(decimal totalPrice, string? discountType, decimal discountValue, int memberCount)
        {
            var safeMemberCount = Math.Max(memberCount, 1);
            var discountAmount = CalculateDiscountAmount(totalPrice, discountType, discountValue);
            var discountedTotal = Math.Max(totalPrice - discountAmount, 0m);
            return decimal.Round(discountedTotal / safeMemberCount, 2, MidpointRounding.AwayFromZero);
        }

        public static string NormalizeDiscountType(string? discountType)
        {
            return string.Equals(discountType, DiscountTypes.Percentage, StringComparison.OrdinalIgnoreCase)
                ? DiscountTypes.Percentage
                : DiscountTypes.Fixed;
        }
    }
}
