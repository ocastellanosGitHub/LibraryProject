using System;
using System.Collections.Generic;
using LibraryStore;

namespace LibraryStore.Services
{
    public class InMemoryBookService : IBookService
    {
        private readonly ILibraryService _libraryService;

        public InMemoryBookService(ILibraryService libraryService)
        {
            _libraryService = libraryService;
        }

        public IEnumerable<Book> GetBooks() => _libraryService.GetLibrary().Books;

        public Book GetBook(Guid id) => _libraryService.GetLibrary().GetBook(id);

        public Book AddBook(string title, string author, string isbn)
        {
            var book = new Book(title, author, isbn);
            _libraryService.GetLibrary().AddBook(book);
            return book;
        }

        public Book UpdateBook(Guid id, string? title = null, string? author = null, string? isbn = null)
        {
            _libraryService.GetLibrary().UpdateBook(id, title, author, isbn);
            return _libraryService.GetLibrary().GetBook(id);
        }

        public void RemoveBook(Guid id) => _libraryService.GetLibrary().RemoveBook(id);
    }
}