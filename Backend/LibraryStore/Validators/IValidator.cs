namespace LibraryStore.Validators
{
    public interface IValidator<T>
    {
        ValidationResult Validate(T dto);
    }
}