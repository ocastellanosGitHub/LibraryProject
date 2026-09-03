"use client";

import { useMemo, useState } from "react";
import { BookCard } from "./book-card";
import { SearchIcon } from "@/components/icons";
import type { Book } from "@/types/book";

export function BooksGrid({
  books,
  isAdmin,
}: {
  books: Book[];
  isAdmin: boolean;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.isbn.toLowerCase().includes(q)
    );
  }, [books, query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative max-w-sm">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="Search your books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 w-full rounded-full border border-black/[.08] bg-white pl-10 pr-4 text-sm text-zinc-950 outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-600"
        />
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {books.length === 0
            ? "No books yet. Add your first one."
            : "No books match your search."}
        </p>
      )}

      {filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}
