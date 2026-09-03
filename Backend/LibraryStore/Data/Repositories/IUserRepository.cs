using System.Collections.Generic;
using LibraryStore.Services;

namespace LibraryStore.Data.Repositories
{
    public interface IUserRepository
    {
        User? GetByUsername(string username);
        User? GetById(int id);
        bool Add(User user);
        IEnumerable<User> GetAllUsers();
    }
}