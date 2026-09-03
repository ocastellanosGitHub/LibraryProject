"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { createBook, updateBook, deleteBook } from "@/services/books-service";
import { ApiError, ForbiddenError } from "@/lib/api-client";
import type { BookInput } from "@/types/book";

export type BookFormState = { error: string; status?: number } | undefined;

function parseBookFields(formData: FormData): BookInput | null {
  const title = formData.get("title");
  const author = formData.get("author");
  const isbn = formData.get("isbn");

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof author !== "string" ||
    !author.trim() ||
    typeof isbn !== "string" ||
    !isbn.trim()
  ) {
    return null;
  }

  return { title: title.trim(), author: author.trim(), isbn: isbn.trim() };
}

export async function createBookAction(
  _prevState: BookFormState,
  formData: FormData
): Promise<BookFormState> {
  const fields = parseBookFields(formData);
  if (!fields) {
    return { error: "Title, author, and ISBN are required." };
  }

  const session = await verifySession();

  try {
    await createBook(fields, session.token);
  } catch (err) {
    if (err instanceof ForbiddenError) {
      return { error: err.message, status: err.status };
    }
    if (err instanceof ApiError) {
      return {
        error: err.message || "Could not create the book.",
        status: err.status,
      };
    }
    return { error: "Unable to reach the server. Please try again." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteBookAction(
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _prevState: BookFormState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _formData: FormData
): Promise<BookFormState> {
  const session = await verifySession();

  try {
    await deleteBook(id, session.token);
  } catch (err) {
    if (err instanceof ForbiddenError) {
      return { error: err.message, status: err.status };
    }
    if (err instanceof ApiError) {
      return {
        error: err.message || "Could not delete the book.",
        status: err.status,
      };
    }
    return { error: "Unable to reach the server. Please try again." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateBookAction(
  id: string,
  _prevState: BookFormState,
  formData: FormData
): Promise<BookFormState> {
  const fields = parseBookFields(formData);
  if (!fields) {
    return { error: "Title, author, and ISBN are required." };
  }

  const session = await verifySession();

  try {
    await updateBook(id, fields, session.token);
  } catch (err) {
    if (err instanceof ForbiddenError) {
      return { error: err.message, status: err.status };
    }
    if (err instanceof ApiError) {
      return {
        error: err.message || "Could not update the book.",
        status: err.status,
      };
    }
    return { error: "Unable to reach the server. Please try again." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
