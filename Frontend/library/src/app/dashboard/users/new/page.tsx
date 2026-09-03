import { redirect } from "next/navigation";
import { verifySession, hasRole, ADMIN_ROLE } from "@/lib/dal";
import { RegisterUserForm } from "@/components/register-user-form";

export default async function NewUserPage() {
  const session = await verifySession();
  if (!hasRole(session, ADMIN_ROLE)) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-8 px-4 py-6 sm:px-8 sm:py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Create user
      </h1>
      <div className="w-full max-w-md rounded-2xl border border-black/[.06] bg-white p-6 shadow-sm dark:border-white/[.08] dark:bg-zinc-900">
        <RegisterUserForm />
      </div>
    </div>
  );
}
