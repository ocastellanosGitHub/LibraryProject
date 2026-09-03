"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth-actions";
import { BookIcon, UsersIcon, LogoutIcon, XIcon } from "@/components/icons";

const activeLinkClassName =
  "flex items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50";
const inactiveLinkClassName =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900";

export function Sidebar({
  isAdmin,
  displayName,
  isOpen,
  onClose,
}: {
  isAdmin: boolean;
  displayName: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const booksActive =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/books");
  const usersActive = pathname.startsWith("/dashboard/users");

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 -translate-x-full flex-col border-r border-black/[.08] bg-white px-4 py-6 transition-transform duration-200 ease-in-out dark:border-white/[.145] dark:bg-zinc-950 lg:static lg:translate-x-0 ${
        isOpen ? "translate-x-0" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2.5 px-2 pb-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
            <BookIcon className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Library
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900 lg:hidden"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        <Link
          href="/dashboard"
          onClick={onClose}
          className={booksActive ? activeLinkClassName : inactiveLinkClassName}
        >
          <BookIcon className="h-4 w-4" />
          Books
        </Link>
        {isAdmin && (
          <Link
            href="/dashboard/users"
            onClick={onClose}
            className={usersActive ? activeLinkClassName : inactiveLinkClassName}
          >
            <UsersIcon className="h-4 w-4" />
            Users
          </Link>
        )}
      </nav>

      <div className="flex flex-col gap-3 border-t border-black/[.08] pt-4 dark:border-white/[.145]">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            {displayName.slice(0, 1).toUpperCase()}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {displayName}
            </span>
            {isAdmin && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Admin
              </span>
            )}
          </div>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            <LogoutIcon className="h-4 w-4" />
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
