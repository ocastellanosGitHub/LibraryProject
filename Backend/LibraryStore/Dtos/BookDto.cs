using System;

namespace LibraryStore.Dtos
{
    public class BookDto
    {
        public Guid Id { get; init; }
        public string Title { get; init; } = null!;
        public string Author { get; init; } = null!;
        public string Isbn { get; init; } = null!;
    }
}