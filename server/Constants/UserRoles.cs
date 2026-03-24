namespace BuyTogether.Server.Constants
{
    public static class UserRoles
    {
        public const string Admin = "Admin";
        public const string Buyer = "Buyer";
        public const string Seller = "Seller";
        public const string User = "User";

        public static readonly string[] BuyerEquivalentRoles =
        [
            Buyer,
            User
        ];
    }
}
