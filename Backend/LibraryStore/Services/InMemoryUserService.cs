using System.Collections.Generic;
using LibraryStore.Data.Repositories;

namespace LibraryStore.Services
{
    // Lightweight user service that delegates storage to IUserRepository.
    // Suitable for development/testing only.
    public class InMemoryUserService : IUserService
    {
        private readonly IUserRepository _repo;

        public InMemoryUserService(IUserRepository repo)
        {
            _repo = repo;

            // Ensure default accounts exist on startup (idempotent)
            _repo.Add(new User("admin", "admin@example.com", "adminpass", Role.Admin, null, null));
            _repo.Add(new User("user", "user@example.com", "userpass", Role.User, null, null));
        }

        public bool ValidateCredentials(string username, string password, out string role)
        {
            role = string.Empty;
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
                return false;

            var user = _repo.GetByUsername(username);
            if (user is null) return false;
            if (user.PasswordHash != password) return false; // demo only; compare hash in real apps

            role = user.Role.ToString();
            return true;
        }

        public bool CreateUser(string username, string email, string password, Role role, string? firstName = null, string? lastName = null)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                return false;

            var existing = _repo.GetByUsername(username);
            if (existing is not null) return false;

            var user = new User(username, email, password, role, firstName, lastName);
            return _repo.Add(user);
        }

        public IEnumerable<User> GetAllUsers() => _repo.GetAllUsers();
    }
}