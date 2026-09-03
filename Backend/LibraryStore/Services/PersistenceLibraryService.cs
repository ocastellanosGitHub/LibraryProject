using System.Linq;
using LibraryStore.Data.Repositories;
using LibraryStore;
using LibraryStore.Data.Entities;

namespace LibraryStore.Services
{
    public class PersistenceLibraryService : ILibraryService
    {
        private readonly ILibraryRepository _libraryRepo;

        public PersistenceLibraryService(ILibraryRepository libraryRepo)
        {
            _libraryRepo = libraryRepo;
        }

        public Library GetLibrary()
        {
            var libEntity = _libraryRepo.GetLibrary();
            var domain = new Library(libEntity.Name);
            foreach (var be in libEntity.Books)
            {
                var b = new Book(be.Title, be.Author, be.Isbn);
                typeof(Book).GetProperty("Id")!.SetValue(b, be.Id);
                domain.AddBook(b);
            }
            typeof(Library).GetProperty("Id")!.SetValue(domain, libEntity.Id);
            return domain;
        }
    }
}