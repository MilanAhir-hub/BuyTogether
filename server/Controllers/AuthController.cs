// AUTHENTICATION CONTROLLER: Handles User Registration (Signup), Login, and Logout.
using BuyTogether.Server.DTOs.Auth;
using BuyTogether.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuyTogether.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // SIGNUP
        [HttpPost("signup")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Signup([FromBody] UserSignupDto signupDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Invalid input data",
                    errors = ModelState
                });
            }

            try
            {
                var result = await _authService.SignupAsync(signupDto);

                if (string.IsNullOrEmpty(result.Token))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = result.Message
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "User registered successfully",
                    data = result
                });
            }
            catch (Exception ex)
            {
                // Print the error to the console for debugging
                Console.WriteLine("Signup Error: " + ex.Message);
                if (ex.InnerException != null) Console.WriteLine("Inner Error: " + ex.InnerException.Message);
                Console.WriteLine(ex.StackTrace);

                return StatusCode(500, new
                {
                    success = false,
                    message = "Internal server error",
                    error = ex.Message
                });
            }
        }

        // LOGIN
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Invalid input data",
                    errors = ModelState
                });
            }

            try
            {
                var result = await _authService.LoginAsync(loginDto);

                if (string.IsNullOrEmpty(result.Token))
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = result.Message
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Login successful",
                    data = result
                });
            }
            catch (Exception ex)
            {
                // Print the error to the console for debugging
                Console.WriteLine("Login Error: " + ex.Message);
                if (ex.InnerException != null) Console.WriteLine("Inner Error: " + ex.InnerException.Message);
                Console.WriteLine(ex.StackTrace);

                return StatusCode(500, new
                {
                    success = false,
                    message = "Internal server error",
                    error = ex.Message
                });
            }
        }

        // LOGOUT
        [Authorize]
        [HttpPost("logout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Logout()
        {
            return Ok(new
            {
                success = true,
                message = "Logged out successfully (client should delete token)"
            });
        }
    }
}
