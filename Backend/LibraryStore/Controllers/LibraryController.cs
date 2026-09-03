using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LibraryStore.Services;
using LibraryStore.Dtos;

namespace LibraryStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LibraryController : ControllerBase
    {
        private readonly ILibraryService _service;

        public LibraryController(ILibraryService service) => _service = service;

        /// <summary>
        /// Get all the library information including its books.
        /// </summary>
        /// <returns>The library information including its books.</returns>
        [HttpGet]
        public IActionResult Get()
        {
            var lib = _service.GetLibrary();
            var dto = new LibraryDto
            {
                Id = lib.Id,
                Name = lib.Name,
                Books = lib.Books.Select(b => new BookDto
                {
                    Id = b.Id,
                    Title = b.Title,
                    Author = b.Author,
                    Isbn = b.Isbn
                }).ToArray()
            };
            return Ok(dto);
        }
    }
}