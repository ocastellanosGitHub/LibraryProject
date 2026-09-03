using LibraryStore.Dtos;
using LibraryStore.Utils;

namespace LibraryStore.Validators
{
    public class UpdateBookDtoValidator : IValidator<UpdateBookDto>
    {
        public ValidationResult Validate(UpdateBookDto dto)
        {
            var errors = new List<string>();
            // If client sends fields, validate their format
            if (dto.Title != null && string.IsNullOrWhiteSpace(dto.Title)) errors.Add("Title cannot be empty.");
            if (dto.Author != null && string.IsNullOrWhiteSpace(dto.Author)) errors.Add("Author cannot be empty.");
            if (dto.Isbn != null)
            {
                if (string.IsNullOrWhiteSpace(dto.Isbn)) errors.Add("Isbn cannot be empty.");
                else if (!IsbnHelper.IsValidIsbn(dto.Isbn)) errors.Add("Isbn format is invalid.");
            }
            return new ValidationResult(!errors.Any(), errors);
        }
    }
}