import { redirect } from "next/navigation";
import { verifySession, hasRole, ADMIN_ROLE } from "@/lib/dal";
import { getBook } from "@/services/books-service";
import { EditBookForm } from "@/components/edit-book-form";

export default async function EditBookPage(
  props: PageProps<"/dashboard/books/[id]/edit">
) {
  const { id } = await props.params;

  const session = await verifySession();
  if (!hasRole(session, ADMIN_ROLE)) {
    redirect("/dashboard");
  }

  let book;
  try {
    book = await getBook(id, session.token);
  } catch {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-8 px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Edit book
      </h1>
      <div className="max-w-sm rounded-2xl border border-black/[.06] bg-white p-6 shadow-sm dark:border-white/[.08] dark:bg-zinc-900">
        <EditBookForm book={book} />
      </div>
    </div>
  );
}
