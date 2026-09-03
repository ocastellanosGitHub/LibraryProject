import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession, hasRole, ADMIN_ROLE } from "@/lib/dal";
import { getUsers } from "@/services/users-service";
import { ApiError } from "@/lib/api-client";
import { UsersTable } from "@/components/dashboard/users-table";
import { UserPlusIcon } from "@/components/icons";
import type { User } from "@/types/user";

export default async function UsersPage() {
  const session = await verifySession();
  if (!hasRole(session, ADMIN_ROLE)) {
    redirect("/dashboard");
  }

  let users: User[] = [];
  let loadError: string | null = null;
  try {
    users = await getUsers(session.token);
  } catch (err) {
    loadError =
      err instanceof ApiError
        ? err.message || "Could not load users."
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
            Users
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {users.length} {users.length === 1 ? "user" : "users"}
          </p>
        </div>
        <Link
          href="/dashboard/users/new"
          className="flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          <UserPlusIcon className="h-4 w-4" />
          Create user
        </Link>
      </div>

      {loadError ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {loadError}
        </p>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
}
