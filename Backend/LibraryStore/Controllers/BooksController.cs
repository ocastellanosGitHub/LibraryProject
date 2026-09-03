using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LibraryStore.Services;
using LibraryStore.Dtos;

namespace LibraryStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _service;

        public BooksController(IBookService service) => _service = service;

        /// <summary>
        /// Get all the Books in the library store.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetAll()
        {
            var dtos = _service.GetBooks().Select(b => new BookDto
            {
                Id = b.Id,
                Title = b.Title,
                Author = b.Author,
                Isbn = b.Isbn
            });
            return Ok(dtos);
        }

        /// <summary>
        /// Get a specific Book by its ID.
        /// </summary>
        /// <param name="id">The ID of the Book to retrieve.</param>
        /// <returns>The Book with the specified ID.</returns>
        [HttpGet("{id:guid}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                var b = _service.GetBook(id);
                var dto = new BookDto { Id = b.Id, Title = b.Title, Author = b.Author, Isbn = b.Isbn };
                return Ok(dto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Create a new Book in the library store.
        /// </summary>
        /// <param name="create">The details of the Book to create.</param>
        /// <returns>The created Book.</returns>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Create([FromBody] CreateBookDto create)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var book = _service.AddBook(create.Title, create.Author, create.Isbn);
            var dto = new BookDto { Id = book.Id, Title = book.Title, Author = book.Author, Isbn = book.Isbn };
            return CreatedAtAction(nameof(Get), new { id = dto.Id }, dto);
        }

        /// <summary>
        /// Update an existing Book in the library store.
        /// </summary>
        /// <param name="id">The ID of the Book to update.</param>
        /// <param name="update">The updated details of the Book.</param>
        /// <returns>The updated Book.</returns>
        [HttpPut("{id:guid}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update(Guid id, [FromBody] UpdateBookDto update)
        {
            try
            {
                var book = _service.UpdateBook(id, update.Title, update.Author, update.Isbn);
                var dto = new BookDto { Id = book.Id, Title = book.Title, Author = book.Author, Isbn = book.Isbn };
                return Ok(dto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Delete a Book from the library store by its ID.
        /// </summary>
        /// <param name="id">The ID of the Book to delete.</param>
        /// <returns>No content if the deletion was successful; NotFound if the Book does not exist.</returns>
        [HttpDelete("{id:guid}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _service.RemoveBook(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("library")]
        public ActionResult<LibraryDto> GetLibrary()
        {
            // Replace with real mapping / repository call
            return Ok(new LibraryDto { Id = Guid.NewGuid(), Name = "Biblioteca", Books = Array.Empty<BookDto>() });
        }
    }
}