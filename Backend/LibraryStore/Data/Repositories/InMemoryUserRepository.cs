using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using LibraryStore.Services;

namespace LibraryStore.Data.Repositories
{
    public class InMemoryUserRepository : IUserRepository
    {
        // username -> User (case-insensitive)
        private readonly ConcurrentDictionary<string, User> _usersByName =
            new(StringComparer.OrdinalIgnoreCase);

        private int _nextId;

        public User? GetByUsername(string username)
        {
            if (username is null) return null;
            _usersByName.TryGetValue(username, out var user);
            return user;
        }

        public User? GetById(int id)
        {
            foreach (var u in _usersByName.Values)
            {
                if (u.Id == id) return u;
            }
            return null;
        }

        public bool Add(User user)
        {
            if (user is null) return false;
            // assign id
            user.Id = Interlocked.Increment(ref _nextId);
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;
            return _usersByName.TryAdd(user.Username, user);
        }

        public IEnumerable<User> GetAllUsers() => _usersByName.Values;
    }
}