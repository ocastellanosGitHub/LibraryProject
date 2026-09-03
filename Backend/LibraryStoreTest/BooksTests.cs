using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LibraryStore.Controllers;
using LibraryStore.Dtos;
using LibraryStore.Services;
using LibraryStore;
using Xunit;

namespace LibraryStoreTest
{
    public class BooksTests
    {
        // Fake IBookService implementation used by controller tests (nested to keep a single top-level class)
        private class FakeBookService : IBookService
        {
            public Func<IEnumerable<Book>>? GetBooksFunc { get; set; }
            public Func<Guid, Book>? GetBookFunc { get; set; }
            public Func<string, string, string, Book>? AddBookFunc { get; set; }
            public Func<Guid, string?, string?, string?, Book>? UpdateBookFunc { get; set; }
            public Action<Guid>? RemoveBookAction { get; set; }

            public IEnumerable<Book> GetBooks() => GetBooksFunc?.Invoke() ?? Enumerable.Empty<Book>();
            public Book GetBook(Guid id) => GetBookFunc != null ? GetBookFunc(id) : throw new KeyNotFoundException();
            public Book AddBook(string title, string author, string isbn) => AddBookFunc != null ? AddBookFunc(title, author, isbn) : throw new InvalidOperationException();
            public Book UpdateBook(Guid id, string? title = null, string? author = null, string? isbn = null) =>
                UpdateBookFunc != null ? UpdateBookFunc(id, title, author, isbn) : throw new KeyNotFoundException();
            public void RemoveBook(Guid id) => RemoveBookAction?.Invoke(id);
        }

        // Controller tests
        [Fact]
        public void GetAll_ReturnsOkWithMappedDtos()
        {
            var book = new Book("T", "A", "9783161484100");
            var fake = new FakeBookService { GetBooksFunc = () => new[] { book } };
            var controller = new BooksController(fake);

            var result = controller.GetAll() as OkObjectResult;
            Assert.NotNull(result);

            var dtos = Assert.IsAssignableFrom<IEnumerable<BookDto>>(result!.Value!);
            var dto = Assert.Single(dtos);
            Assert.Equal(book.Id, dto.Id);
            Assert.Equal("T", dto.Title);
            Assert.Equal("A", dto.Author);
            Assert.Equal("9783161484100", dto.Isbn);
        }

        [Fact]
        public void Get_WithExistingId_ReturnsOk()
        {
            var book = new Book("Title", "Author", "0306406152");
            var fake = new FakeBookService { GetBookFunc = id => book };
            var controller = new BooksController(fake);

            var result = controller.Get(book.Id) as OkObjectResult;
            Assert.NotNull(result);

            var dto = Assert.IsType<BookDto>(result!.Value!);
            Assert.Equal(book.Id, dto.Id);
        }

        [Fact]
        public void Get_WithMissingId_ReturnsNotFound()
        {
            var fake = new FakeBookService { GetBookFunc = id => throw new KeyNotFoundException() };
            var controller = new BooksController(fake);

            var result = controller.Get(Guid.NewGuid());
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Create_ReturnsCreatedAtAction_WithDto()
        {
            var created = new Book("New", "Author", "9783161484100");
            var fake = new FakeBookService
            {
                AddBookFunc = (t, a, i) => created
            };
            var controller = new BooksController(fake);

            var dtoIn = new CreateBookDto { Title = "New", Author = "Author", Isbn = "9783161484100" };
            var result = controller.Create(dtoIn) as CreatedAtActionResult;
            Assert.NotNull(result);

            var dto = Assert.IsType<BookDto>(result!.Value!);
            Assert.Equal(created.Id, dto.Id);
            Assert.Equal("New", dto.Title);
        }

        [Fact]
        public void Update_WhenExists_ReturnsOk()
        {
            var book = new Book("Old", "OldAuthor", "0306406152");
            var fake = new FakeBookService
            {
                UpdateBookFunc = (id, t, a, i) =>
                {
                    book.Title = t ?? book.Title;
                    book.Author = a ?? book.Author;
                    book.Isbn = i ?? book.Isbn;
                    return book;
                }
            };
            var controller = new BooksController(fake);

            var update = new UpdateBookDto { Title = "NewTitle" };
            var result = controller.Update(book.Id, update) as OkObjectResult;
            Assert.NotNull(result);

            var dto = Assert.IsType<BookDto>(result!.Value!);
            Assert.Equal("NewTitle", dto.Title);
        }

        [Fact]
        public void Update_WhenMissing_ReturnsNotFound()
        {
            var fake = new FakeBookService
            {
                UpdateBookFunc = (id, t, a, i) => throw new KeyNotFoundException()
            };
            var controller = new BooksController(fake);

            var update = new UpdateBookDto { Title = "X" };
            var result = controller.Update(Guid.NewGuid(), update);
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Delete_WhenExists_ReturnsNoContent()
        {
            var called = false;
            var fake = new FakeBookService
            {
                RemoveBookAction = id => called = true
            };
            var controller = new BooksController(fake);

            var result = controller.Delete(Guid.NewGuid());
            Assert.IsType<NoContentResult>(result);
            Assert.True(called);
        }

        [Fact]
        public void Delete_WhenMissing_ReturnsNotFound()
        {
            var fake = new FakeBookService
            {
                RemoveBookAction = id => throw new KeyNotFoundException()
            };
            var controller = new BooksController(fake);

            var result = controller.Delete(Guid.NewGuid());
            Assert.IsType<NotFoundResult>(result);
        }

        // Domain tests (Library / Book) consolidated here with English names
        [Fact]
        public void AddBook_ShouldAddAndAllowRetrieveById()
        {
            var library = new Library("Library");
            var book = new Book("The Little Prince", "Antoine de Saint-Exupéry", "9783161484100");

            library.AddBook(book);
            var obtained = library.GetBook(book.Id);

            Assert.Single(library.Books);
            Assert.Equal(book.Id, obtained.Id);
            Assert.Equal("The Little Prince", obtained.Title);
            Assert.Equal("Antoine de Saint-Exupéry", obtained.Author);
        }

        [Fact]
        public void UpdateBook_ShouldModifyFields()
        {
            var library = new Library("Library");
            var book = new Book("Old Title", "Old Author", "OLD-ISBN");
            library.AddBook(book);

            library.UpdateBook(book.Id, title: "New Title", author: "New Author", isbn: "NEW-ISBN");
            var updated = library.GetBook(book.Id);

            Assert.Equal("New Title", updated.Title);
            Assert.Equal("New Author", updated.Author);
            Assert.Equal("NEW-ISBN", updated.Isbn);
        }

        [Fact]
        public void RemoveBook_ShouldRemoveFromCollectionAndNotBeFound()
        {
            var library = new Library("Library");
            var book = new Book("To Delete", "Author", "DEL-ISBN");
            library.AddBook(book);

            library.RemoveBook(book.Id);

            Assert.Empty(library.Books);
            Assert.Throws<KeyNotFoundException>(() => library.GetBook(book.Id));
        }
    }
}