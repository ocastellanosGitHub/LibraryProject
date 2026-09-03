using System;
using System.Collections.Generic;

namespace LibraryStore.Dtos
{
    public class LibraryDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; } = null!;
        public IEnumerable<BookDto> Books { get; init; } = Array.Empty<BookDto>();
    }
}