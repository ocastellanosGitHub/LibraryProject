"use client";

import { useActionState } from "react";
import { updateBookAction } from "@/actions/book-actions";
import type { Book } from "@/types/book";

const inputClassName =
  "h-11 rounded-lg border border-black/[.08] bg-white px-3.5 text-sm text-zinc-950 outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-600";
const labelClassName = "text-sm font-medium text-zinc-700 dark:text-zinc-300";

export function EditBookForm({ book }: { book: Book }) {
  const updateBookWithId = updateBookAction.bind(null, book.id);
  const [state, action, pending] = useActionState(updateBookWithId, undefined);

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className={labelClassName}>
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={book.title}
          required
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="author" className={labelClassName}>
          Author
        </label>
        <input
          id="author"
          name="author"
          type="text"
          defaultValue={book.author}
          required
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="isbn" className={labelClassName}>
          ISBN
        </label>
        <input
          id="isbn"
          name="isbn"
          type="text"
          defaultValue={book.isbn}
          required
          className={inputClassName}
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-11 w-full items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
      >
        {pending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
