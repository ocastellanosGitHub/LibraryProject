import { redirect } from "next/navigation";
import { verifySession, hasRole, ADMIN_ROLE } from "@/lib/dal";
import { BookForm } from "@/components/book-form";

export default async function NewBookPage() {
  const session = await verifySession();
  if (!hasRole(session, ADMIN_ROLE)) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-8 px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Add a book
      </h1>
      <div className="max-w-sm rounded-2xl border border-black/[.06] bg-white p-6 shadow-sm dark:border-white/[.08] dark:bg-zinc-900">
        <BookForm />
      </div>
    </div>
  );
}
