using LibraryStore.Dtos;
using LibraryStore.Utils;

namespace LibraryStore.Validators
{
    public class CreateBookDtoValidator : IValidator<CreateBookDto>
    {
        public ValidationResult Validate(CreateBookDto dto)
        {
            var errors = new List<string>();
            if (string.IsNullOrWhiteSpace(dto.Title)) errors.Add("Title is required.");
            if (string.IsNullOrWhiteSpace(dto.Author)) errors.Add("Author is required.");
            if (string.IsNullOrWhiteSpace(dto.Isbn)) errors.Add("Isbn is required.");
            else if (!IsbnHelper.IsValidIsbn(dto.Isbn)) errors.Add("Isbn format is invalid.");
            return new ValidationResult(!errors.Any(), errors);
        }
    }
}