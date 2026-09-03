using System;
using System.Collections.Generic;
using System.Linq;
using LibraryStore.Data.Repositories;
using LibraryStore.Data.Entities;
using LibraryStore;

namespace LibraryStore.Services
{
    public class PersistenceBookService : IBookService
    {
        private readonly IBookRepository _bookRepo;
        private readonly ILibraryRepository _libraryRepo;

        public PersistenceBookService(IBookRepository bookRepo, ILibraryRepository libraryRepo)
        {
            _bookRepo = bookRepo;
            _libraryRepo = libraryRepo;
        }

        private static Book ToDomain(BookEntity e)
        {
            var b = new Book(e.Title, e.Author, e.Isbn);
            typeof(Book).GetProperty("Id")!.SetValue(b, e.Id);
            return b;
        }

        public IEnumerable<Book> GetBooks()
        {
            var lib = _libraryRepo.GetLibrary();
            return _bookRepo.GetAll(lib.Id).Select(ToDomain).ToList();
        }

        public Book GetBook(Guid id)
        {
            var e = _bookRepo.GetById(id);
            return ToDomain(e);
        }

        public Book AddBook(string title, string author, string isbn)
        {
            var lib = _libraryRepo.GetLibrary();
            var entity = new BookEntity
            {
                Id = Guid.NewGuid(),
                LibraryId = lib.Id,
                Title = title,
                Author = author,
                Isbn = isbn
            };
            var added = _bookRepo.Add(entity);
            return ToDomain(added);
        }

        public Book UpdateBook(Guid id, string? title = null, string? author = null, string? isbn = null)
        {
            var existing = _bookRepo.GetById(id);
            if (title is not null) existing.Title = title;
            if (author is not null) existing.Author = author;
            if (isbn is not null) existing.Isbn = isbn;
            var updated = _bookRepo.Update(existing);
            return ToDomain(updated);
        }

        public void RemoveBook(Guid id) => _bookRepo.Remove(id);
    }
}