import type { User } from "@/types/user";

export function UsersTable({ users }: { users: User[] }) {
  if (users.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No users yet.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[.06] bg-white shadow-sm dark:border-white/[.08] dark:bg-zinc-900">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-black/[.06] text-xs uppercase tracking-wide text-zinc-500 dark:border-white/[.08] dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">User</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {users.map((user) => {
            const fullName = [user.firstName, user.lastName]
              .filter(Boolean)
              .join(" ");
            return (
              <tr key={user.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {user.username.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {user.username}
                      </span>
                      {fullName && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {fullName}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {user.email}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      user.role === "Admin"
                        ? "inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                        : "inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                    }
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      user.isActive
                        ? "inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                    }
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
