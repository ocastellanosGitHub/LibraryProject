using System;
using System.Collections.Generic;
using LibraryStore;

namespace LibraryStore.Services
{
    public interface IBookService
    {
        IEnumerable<Book> GetBooks();
        Book GetBook(Guid id);
        Book AddBook(string title, string author, string isbn);
        Book UpdateBook(Guid id, string? title = null, string? author = null, string? isbn = null);
        void RemoveBook(Guid id);
    }
}