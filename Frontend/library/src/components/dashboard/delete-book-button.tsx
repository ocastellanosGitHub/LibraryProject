"use client";

import { useActionState, useEffect, useState } from "react";
import { deleteBookAction } from "@/actions/book-actions";
import { TrashIcon } from "@/components/icons";
import type { Book } from "@/types/book";

export function DeleteBookButton({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);
  const deleteWithId = deleteBookAction.bind(null, book.id);
  const [state, action, pending] = useActionState(deleteWithId, undefined);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Delete ${book.title}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[.08] text-red-600 transition-colors hover:bg-red-50 dark:border-white/[.145] dark:text-red-400 dark:hover:bg-red-950/40"
      >
        <TrashIcon className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`delete-book-title-${book.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900"
          >
            <div className="flex flex-col gap-1.5">
              <h2
                id={`delete-book-title-${book.id}`}
                className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
              >
                Delete book?
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                This will permanently remove{" "}
                <span className="font-medium text-zinc-900 dark:text-zinc-200">
                  {book.title}
                </span>{" "}
                from the library. This action cannot be undone.
              </p>
            </div>

            {state?.error && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                {state.error}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 items-center justify-center rounded-full border border-black/[.08] px-4 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <form action={action}>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex h-10 items-center justify-center rounded-full bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-60"
                >
                  {pending ? "Deleting..." : "Delete"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
