namespace LibraryStore.Validators
{
    public record ValidationResult(bool IsValid, IEnumerable<string> Errors);
}