using BuyTogether.Server.DTOs.Auth;

namespace BuyTogether.Server.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> SignupAsync(UserSignupDto signupDto);
        Task<AuthResponseDto> LoginAsync(UserLoginDto loginDto);
        Task<AuthResponseDto> UpgradeToSellerAsync(Guid userId);
    }
}
