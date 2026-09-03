using System;

namespace LibraryStore.Data.Entities
{
    public class BookEntity
    {
        public Guid Id { get; set; }
        public Guid LibraryId { get; set; }
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Isbn { get; set; } = null!;
        public LibraryEntity? Library { get; set; }
    }
}