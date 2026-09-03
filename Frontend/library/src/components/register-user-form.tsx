"use client";

import { useActionState } from "react";
import { registerUserAction } from "@/actions/user-actions";
import { ChevronDownIcon } from "@/components/icons";

const inputClassName =
  "h-11 w-full rounded-lg border border-black/[.08] bg-white px-3.5 text-sm text-zinc-950 outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-600";
const labelClassName = "text-sm font-medium text-zinc-700 dark:text-zinc-300";

export function RegisterUserForm() {
  const [state, action, pending] = useActionState(registerUserAction, undefined);

  return (
    <form action={action} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className={labelClassName}>
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          required
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          required
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <label htmlFor="firstName" className={labelClassName}>
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="off"
            className={inputClassName}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <label htmlFor="lastName" className={labelClassName}>
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="off"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className={labelClassName}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          pattern="(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}"
          title="At least 6 characters, including an uppercase letter and a special character."
          className={inputClassName}
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          At least 6 characters, with an uppercase letter and a special character.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="role" className={labelClassName}>
          Role
        </label>
        <div className="relative">
          <select
            id="role"
            name="role"
            defaultValue="User"
            required
            className={`w-full appearance-none pr-9 ${inputClassName}`}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        </div>
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
        {pending ? "Creating..." : "Create user"}
      </button>
    </form>
  );
}
