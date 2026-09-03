namespace LibraryStore.Dtos
{
    public class AuthResponse
    {
        public string Token { get; init; } = null!;
        public DateTime Expires { get; init; }
    }
}