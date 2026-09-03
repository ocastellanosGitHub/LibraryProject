using System;
using System.Collections.Generic;
using LibraryStore.Data.Entities;

namespace LibraryStore.Data.Repositories
{
    public interface IBookRepository
    {
        IEnumerable<BookEntity> GetAll(Guid libraryId);
        BookEntity GetById(Guid id);
        BookEntity Add(BookEntity book);
        BookEntity Update(BookEntity book);
        void Remove(Guid id);
    }
}