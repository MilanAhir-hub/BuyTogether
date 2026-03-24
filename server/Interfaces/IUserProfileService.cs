using BuyTogether.Server.DTOs.Profile;

namespace BuyTogether.Server.Interfaces
{
    public interface IUserProfileService
    {
        Task<UserProfileDto?> GetProfileAsync(Guid userId);
        Task<UserProfileDto?> UpdateProfileAsync(Guid userId, UpdateUserProfileDto updateDto);
    }
}
