using BuyTogether.Server.DTOs;

namespace BuyTogether.Server.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> SignupAsync(UserSignupDto signupDto);
        Task<AuthResponseDto> LoginAsync(UserLoginDto loginDto);
    }
}
