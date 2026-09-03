using System;
using System.Collections.Generic;
using System.Linq;
using LibraryStore.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryStore.Data.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly LibraryContext _context;

        public BookRepository(LibraryContext context) => _context = context;

        public IEnumerable<BookEntity> GetAll(Guid libraryId) =>
            _context.Books.AsNoTracking().Where(b => b.LibraryId == libraryId).ToList();

        public BookEntity GetById(Guid id)
        {
            var book = _context.Books.Find(id);
            if (book is null) throw new KeyNotFoundException($"Book with id {id} not found.");
            return book;
        }

        public BookEntity Add(BookEntity book)
        {
            book.Id = Guid.NewGuid();
            _context.Books.Add(book);
            _context.SaveChanges();
            return book;
        }

        public BookEntity Update(BookEntity book)
        {
            var existing = _context.Books.Find(book.Id);
            if (existing is null) throw new KeyNotFoundException($"Book with id {book.Id} not found.");

            existing.Title = book.Title;
            existing.Author = book.Author;
            existing.Isbn = book.Isbn;

            _context.SaveChanges();
            return existing;
        }

        public void Remove(Guid id)
        {
            var book = _context.Books.Find(id);
            if (book is null) throw new KeyNotFoundException($"Book with id {id} not found.");
            _context.Books.Remove(book);
            _context.SaveChanges();
        }
    }
}