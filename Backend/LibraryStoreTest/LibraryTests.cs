using System;
using Xunit;
using LibraryStore;

namespace LibraryStoreTest
{
    public class LibraryTests
    {
        [Fact]
        public void CreateLibrary_ShouldInitializeWithEmptyListAndName()
        {
            var library = new Library("Central Library");
            Assert.NotEqual(Guid.Empty, library.Id);
            Assert.Equal("Central Library", library.Name);
            Assert.NotNull(library.Books);
            Assert.Empty(library.Books);
        }

        [Fact]
        public void GetNonexistentBook_ShouldThrowKeyNotFoundException()
        {
            var library = new Library("Library");
            var nonExistingId = Guid.NewGuid();

            Assert.Throws<KeyNotFoundException>(() => library.GetBook(nonExistingId));
        }
    }
}