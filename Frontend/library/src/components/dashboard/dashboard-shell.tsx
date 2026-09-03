"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MenuIcon } from "@/components/icons";

export function DashboardShell({
  isAdmin,
  displayName,
  children,
}: {
  isAdmin: boolean;
  displayName: string;
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-zinc-950 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Library
        </span>
      </header>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        isAdmin={isAdmin}
        displayName={displayName}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 bg-zinc-50 dark:bg-black">{children}</div>
    </div>
  );
}
