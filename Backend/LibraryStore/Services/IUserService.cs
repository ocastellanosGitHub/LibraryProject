using System.Collections.Generic;

namespace LibraryStore.Services
{
    public interface IUserService
    {
        bool ValidateCredentials(string username, string password, out string role);
        bool CreateUser(string username, string email, string password, Role role, string? firstName = null, string? lastName = null);
        IEnumerable<User> GetAllUsers();
    }
}