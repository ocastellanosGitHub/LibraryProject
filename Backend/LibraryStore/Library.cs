using System;
using System.Collections.Generic;
using System.Linq;

namespace LibraryStore
{
    public class Library
    {
        public Guid Id { get; }
        public string Name { get; }
        public List<Book> Books { get; }

        public Library(Guid id, string name)
        {
            Id = id;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Books = new List<Book>();
        }

        public Library(string name) : this(Guid.NewGuid(), name) { }

        public void AddBook(Book book)
        {
            if (book is null) throw new ArgumentNullException(nameof(book));
            Books.Add(book);
        }

        public Book GetBook(Guid id)
        {
            var book = Books.FirstOrDefault(b => b.Id == id);
            if (book is null) throw new KeyNotFoundException($"Book with id {id} not found.");
            return book;
        }

        public void UpdateBook(Guid id, string? title = null, string? author = null, string? isbn = null)
        {
            var book = Books.FirstOrDefault(b => b.Id == id);
            if (book is null) throw new KeyNotFoundException($"Book with id {id} not found.");

            if (title is not null) book.Title = title;
            if (author is not null) book.Author = author;
            if (isbn is not null) book.Isbn = isbn;
        }

        public void RemoveBook(Guid id)
        {
            var book = Books.FirstOrDefault(b => b.Id == id);
            if (book is null) throw new KeyNotFoundException($"Book with id {id} not found.");
            Books.Remove(book);
        }
    }
}