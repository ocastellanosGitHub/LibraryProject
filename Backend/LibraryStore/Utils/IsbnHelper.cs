using System.Linq;
using System.Text.RegularExpressions;

namespace LibraryStore.Utils
{
    public static class IsbnHelper
    {
        public static string Normalize(string isbn) =>
            Regex.Replace(isbn ?? string.Empty, @"[\s-]", string.Empty);

        public static bool IsValidIsbn(string isbn)
        {
            var n = Normalize(isbn);
            if (n.Length == 10) return IsValidIsbn10(n);
            if (n.Length == 13) return IsValidIsbn13(n);
            return false;
        }

        private static bool IsValidIsbn10(string s)
        {
            if (!s.Take(9).All(char.IsDigit)) return false;
            int sum = 0;
            for (int i = 0; i < 9; i++) sum += (10 - i) * (s[i] - '0');
            char last = s[9];
            sum += last == 'X' ? 10 : (char.IsDigit(last) ? last - '0' : 0);
            return sum % 11 == 0;
        }

        private static bool IsValidIsbn13(string s)
        {
            if (!s.All(char.IsDigit)) return false;
            int sum = 0;
            for (int i = 0; i < 13; i++)
            {
                int d = s[i] - '0';
                sum += (i % 2 == 0) ? d : d * 3;
            }
            return sum % 10 == 0;
        }
    }
}