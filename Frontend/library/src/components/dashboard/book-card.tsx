import Link from "next/link";
import { getCoverStyle } from "@/lib/book-cover";
import { PencilIcon } from "@/components/icons";
import { DeleteBookButton } from "@/components/dashboard/delete-book-button";
import type { Book } from "@/types/book";

export function BookCard({ book, isAdmin }: { book: Book; isAdmin: boolean }) {
  const { bg, text } = getCoverStyle(book.title);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-black/[.06] bg-white shadow-sm transition-shadow hover:shadow-md dark:border-white/[.08] dark:bg-zinc-900">
      <div
        className="flex h-36 items-center justify-center p-4 text-center"
        style={{ backgroundColor: bg, color: text }}
      >
        <span className="line-clamp-4 text-base font-semibold leading-snug">
          {book.title}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="line-clamp-1 font-medium text-zinc-900 dark:text-zinc-100">
            {book.title}
          </h3>
          <p className="line-clamp-1 text-sm text-zinc-500 dark:text-zinc-400">
            {book.author}
          </p>
        </div>
        <span className="mt-auto inline-flex w-fit rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          ISBN {book.isbn}
        </span>
        {isAdmin && (
          <div className="mt-2 flex items-center gap-2">
            <Link
              href={`/dashboard/books/${book.id}/edit`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-black/[.08] py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </Link>
            <DeleteBookButton book={book} />
          </div>
        )}
      </div>
    </div>
  );
}
