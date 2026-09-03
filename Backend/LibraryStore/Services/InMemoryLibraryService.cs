using System;
using LibraryStore;

namespace LibraryStore.Services
{
    public class InMemoryLibraryService : ILibraryService
    {
        private readonly Library _library;

        public InMemoryLibraryService()
        {
            _library = new Library("Central Library");
        }

        public Library GetLibrary() => _library;
    }
}