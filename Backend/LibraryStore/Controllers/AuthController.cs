using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using LibraryStore.Dtos;
using LibraryStore.Services;

namespace LibraryStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _config;

        public AuthController(IUserService userService, IConfiguration config)
        {
            _userService = userService;
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (!_userService.ValidateCredentials(request.Username, request.Password, out var role))
                return Unauthorized();

            var jwt = _config.GetSection("Jwt");
            var key = jwt.GetValue<string>("Key")!;
            var issuer = jwt.GetValue<string>("Issuer")!;
            var audience = jwt.GetValue<string>("Audience")!;
            var expiresMinutes = jwt.GetValue<int>("ExpiresMinutes");

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, request.Username),
                new Claim(ClaimTypes.Role, role)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new AuthResponse { Token = tokenString, Expires = token.ValidTo });
        }

        // Register new user (Admin only)
        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (!Enum.TryParse<Role>(request.Role, true, out var role))
                return BadRequest(new { Error = "Invalid role. Use 'Admin' or 'User'." });

            // Call CreateUser with signature: (username, email, password, role, firstName?, lastName?)
            var created = _userService.CreateUser(request.Username, request.Email, request.Password, role, request.FirstName, request.LastName);
            if (!created) return Conflict(new { Error = "User already exists or invalid data." });

            return CreatedAtAction(nameof(Register), new { username = request.Username }, null);
        }
    }
}