import Link from "next/link";
import { verifySession, hasRole, ADMIN_ROLE } from "@/lib/dal";
import { getBooks } from "@/services/books-service";
import { ApiError } from "@/lib/api-client";
import { BooksGrid } from "@/components/dashboard/books-grid";
import { PlusIcon } from "@/components/icons";
import type { Book } from "@/types/book";

export default async function DashboardPage() {
  const session = await verifySession();
  const isAdmin = hasRole(session, ADMIN_ROLE);

  let books: Book[] = [];
  let loadError: string | null = null;
  try {
    books = await getBooks(session.token);
  } catch (err) {
    loadError =
      err instanceof ApiError
        ? err.message || "Could not load books."
        : "Unable to reach the server. Please try again.";
  }

  return (
    <div className="flex flex-col gap-8 px-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Library
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Books
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {books.length} {books.length === 1 ? "book" : "books"} in the
            library
          </p>
        </div>
        {isAdmin && (
          <Link
            href="/dashboard/books/new"
            className="flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            <PlusIcon className="h-4 w-4" />
            Add book
          </Link>
        )}
      </div>

      {loadError ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {loadError}
        </p>
      ) : (
        <BooksGrid books={books} isAdmin={isAdmin} />
      )}
    </div>
  );
}
