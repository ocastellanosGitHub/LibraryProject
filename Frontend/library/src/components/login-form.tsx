"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth-actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="h-11 rounded-lg border border-black/[.08] bg-white px-3.5 text-sm text-zinc-950 outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-600"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-11 rounded-lg border border-black/[.08] bg-white px-3.5 text-sm text-zinc-950 outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-600"
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-11 w-full items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
