using System;
using System.Collections.Generic;

namespace LibraryStore.Data.Entities
{
    public class LibraryEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public ICollection<BookEntity> Books { get; set; } = new List<BookEntity>();
    }
}