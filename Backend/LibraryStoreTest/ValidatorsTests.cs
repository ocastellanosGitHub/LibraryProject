using System.Linq;
using LibraryStore.Validators;
using LibraryStore.Dtos;
using Xunit;

namespace LibraryStoreTest
{
    public class ValidatorsTests
    {
        [Fact]
        public void CreateBookDtoValidator_InvalidFields_ReturnsErrors()
        {
            var validator = new CreateBookDtoValidator();
            var dto = new CreateBookDto { Title = "", Author = null!, Isbn = "invalid" };

            var result = validator.Validate(dto);

            Assert.False(result.IsValid);
            Assert.NotEmpty(result.Errors);
            Assert.Contains(result.Errors, e => e.Contains("Title") || e.Contains("Author") || e.Contains("Isbn"));
        }

        [Fact]
        public void CreateBookDtoValidator_ValidIsbn_Passes()
        {
            var validator = new CreateBookDtoValidator();
            var dto = new CreateBookDto { Title = "T", Author = "A", Isbn = "9783161484100" };

            var result = validator.Validate(dto);

            Assert.True(result.IsValid);
            Assert.Empty(result.Errors);
        }

        [Fact]
        public void UpdateBookDtoValidator_PartialUpdate_ValidatesOnlyProvidedFields()
        {
            var validator = new UpdateBookDtoValidator();
            var dto = new UpdateBookDto { Title = " ", Isbn = "invalid" };

            var result = validator.Validate(dto);

            // Title is whitespace -> error; Isbn invalid -> error
            Assert.False(result.IsValid);
            Assert.Equal(2, result.Errors.Count());
        }

        [Fact]
        public void UpdateBookDtoValidator_NoFields_Valid()
        {
            var validator = new UpdateBookDtoValidator();
            var dto = new UpdateBookDto(); // all null

            var result = validator.Validate(dto);

            Assert.True(result.IsValid);
            Assert.Empty(result.Errors);
        }
    }
}