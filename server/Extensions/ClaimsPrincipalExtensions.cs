// CLAIMS EXTENSION: This is a helper class that "extends" the built-in User object.
// It provides a simple way to extract the Unique User ID from the login token (JWT).
using System.Security.Claims;

namespace BuyTogether.Server.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static bool TryGetUserId(this ClaimsPrincipal principal, out Guid userId)
        {
            userId = Guid.Empty;
            var userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim != null && Guid.TryParse(userIdClaim.Value, out userId);
        }
    }
}
