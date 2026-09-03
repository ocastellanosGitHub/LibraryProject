import "server-only";
import { apiFetch, ApiError, ForbiddenError } from "@/lib/api-client";
import type { Book, BookInput } from "@/types/book";

export function getBooks(token: string) {
  return apiFetch<Book[]>("/api/books", { token });
}

export function getBook(id: string, token: string) {
  return apiFetch<Book>(`/api/books/${id}`, { token });
}

export async function createBook(data: BookInput, token: string) {
  try {
    return await apiFetch<Book>("/api/books", {
      method: "POST",
      body: data,
      token,
    });
  } catch (err) {
    if (err instanceof ApiError && err.status === 403) {
      throw new ForbiddenError("You do not have permission to create books.");
    }
    throw err;
  }
}

export async function updateBook(id: string, data: BookInput, token: string) {
  try {
    return await apiFetch<Book>(`/api/books/${id}`, {
      method: "PUT",
      body: data,
      token,
    });
  } catch (err) {
    if (err instanceof ApiError && err.status === 403) {
      throw new ForbiddenError("You do not have permission to update books.");
    }
    throw err;
  }
}

export async function deleteBook(id: string, token: string) {
  try {
    return await apiFetch<void>(`/api/books/${id}`, { method: "DELETE", token });
  } catch (err) {
    if (err instanceof ApiError && err.status === 403) {
      throw new ForbiddenError("You do not have permission to delete books.");
    }
    throw err;
  }
}
