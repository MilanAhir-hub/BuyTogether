using BuyTogether.Server.Data;
using BuyTogether.Server.Constants;
using BuyTogether.Server.DTOs.Auth;
using BuyTogether.Server.Interfaces;
using BuyTogether.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BuyTogether.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto> SignupAsync(UserSignupDto signupDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == signupDto.Email))
            {
                return new AuthResponseDto { Message = "Email already in use." };
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(signupDto.Password);

            var user = new User
            {
                Username = ResolveUsername(signupDto),
                FullName = NormalizeName(signupDto),
                Email = signupDto.Email.Trim(),
                PasswordHash = passwordHash,
                Role = UserRoles.User
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return await LoginAsync(new UserLoginDto { Email = signupDto.Email, Password = signupDto.Password });
        }

        public async Task<AuthResponseDto> LoginAsync(UserLoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                return new AuthResponseDto { Message = "Invalid email or password." };
            }

            var token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                Token = token,
                Message = "Login successful.",
                User = new AuthenticatedUserDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    Role = user.Role
                }
            };
        }

        public async Task<AuthResponseDto> UpgradeToSellerAsync(Guid userId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return new AuthResponseDto { Message = "User not found." };
            }

            user.Role = UserRoles.Seller;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);
            return new AuthResponseDto
            {
                Token = token,
                Message = "User upgraded to Seller successfully.",
                User = new AuthenticatedUserDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    Role = user.Role
                }
            };
        }

        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static string ResolveUsername(UserSignupDto signupDto)
        {
            var name = NormalizeName(signupDto);
            if (!string.IsNullOrWhiteSpace(signupDto.Username))
            {
                return signupDto.Username.Trim();
            }

            if (!string.IsNullOrWhiteSpace(name))
            {
                return name;
            }

            return signupDto.Email.Trim().Split('@')[0];
        }

        private static string? NormalizeName(UserSignupDto signupDto)
        {
            return string.IsNullOrWhiteSpace(signupDto.Name)
                ? null
                : signupDto.Name.Trim();
        }
    }
}
