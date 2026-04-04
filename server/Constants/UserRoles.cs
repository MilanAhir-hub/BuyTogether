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
            Buyer, // Role "Buyer"
            User,  // Role "User"
            Seller, // Allow Sellers to join groups too
            Admin   // Allow Admins to join groups too
        ];
    }
}
