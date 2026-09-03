using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LibraryStore.Dtos;
using LibraryStore.Services;

namespace LibraryStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService) => _userService = userService;

        // Register new user (Admin only)
        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (!Enum.TryParse<Role>(request.Role, true, out var role))
                return BadRequest(new { Error = "Invalid role. Use 'Admin' or 'User'." });

            var created = _userService.CreateUser(request.Username, request.Email, request.Password, role, request.FirstName, request.LastName);
            if (!created) return Conflict(new { Error = "User already exists or invalid data." });

            return CreatedAtAction(nameof(Register), new { username = request.Username }, null);
        }

        // Get all users (Admin only) - does not expose passwords
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ActionResult<UserDto[]> GetAll()
        {
            var users = _userService.GetAllUsers()
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Role = u.Role.ToString(),
                    IsActive = u.IsActive,
                    CreatedAt = u.CreatedAt,
                    UpdatedAt = u.UpdatedAt
                })
                .ToArray();
            return Ok(users);
        }
    }
}