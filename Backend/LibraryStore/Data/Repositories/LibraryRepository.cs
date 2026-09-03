using System;
using System.Linq;
using LibraryStore.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryStore.Data.Repositories
{
    public class LibraryRepository : ILibraryRepository
    {
        private readonly LibraryContext _context;

        public LibraryRepository(LibraryContext context) => _context = context;

        public LibraryEntity GetLibrary()
        {
            var lib = _context.Set<LibraryEntity>().Include(l => l.Books).FirstOrDefault();
            if (lib is null)
            {
                // ensure a default library exists
                lib = new LibraryEntity { Id = Guid.NewGuid(), Name = "Biblioteca Central" };
                _context.Set<LibraryEntity>().Add(lib);
                _context.SaveChanges();
            }
            return lib;
        }

        public LibraryEntity Add(LibraryEntity library)
        {
            library.Id = Guid.NewGuid();
            _context.Set<LibraryEntity>().Add(library);
            _context.SaveChanges();
            return library;
        }
    }
}