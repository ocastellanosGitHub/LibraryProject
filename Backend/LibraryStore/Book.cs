using System;

namespace LibraryStore
{
    public class Book
    {
        public Guid Id { get; private set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public string Isbn { get; set; }

        public Book(string title, string author, string isbn)
        {
            Id = Guid.NewGuid();
            Title = title ?? throw new ArgumentNullException(nameof(title));
            Author = author ?? throw new ArgumentNullException(nameof(author));
            Isbn = isbn ?? throw new ArgumentNullException(nameof(isbn));
        }
    }
}