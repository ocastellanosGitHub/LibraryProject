using System;

namespace LibraryStore.Dtos
{
    public class UserDto
    {
        public int Id { get; init; }
        public string Username { get; init; } = null!;
        public string Email { get; init; } = null!;
        public string? FirstName { get; init; }
        public string? LastName { get; init; }
        public string Role { get; init; } = null!;
        public bool IsActive { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; init; }
    }
}