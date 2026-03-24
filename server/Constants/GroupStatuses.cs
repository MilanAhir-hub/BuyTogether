namespace BuyTogether.Server.Constants
{
    public static class GroupStatuses
    {
        public const string Open = "OPEN";
        public const string Full = "FULL";
        public const string Locked = "LOCKED";
        public const string Completed = "COMPLETED";
        public const string Cancelled = "CANCELLED";

        public static readonly string[] Active =
        [
            Open,
            Full,
            Locked
        ];
    }
}
