using System;
using LibraryStore.Data.Entities;

namespace LibraryStore.Data.Repositories
{
    public interface ILibraryRepository
    {
        LibraryEntity GetLibrary(); // single default library for now
        LibraryEntity Add(LibraryEntity library);
    }
}