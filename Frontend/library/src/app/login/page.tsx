import { redirect } from "next/navigation";
import { getOptionalSession } from "@/lib/dal";
import { LoginForm } from "@/components/login-form";
import { BookIcon } from "@/components/icons";
import { LibraryIllustration } from "@/components/library-illustration";

export default async function LoginPage() {
  const session = await getOptionalSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 dark:bg-black">
        <main className="flex w-full max-w-sm flex-col items-center gap-8 py-16">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
              <BookIcon className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
                Sign in to Library
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Enter your credentials to access your books.
              </p>
            </div>
          </div>
          <LoginForm />
        </main>
      </div>

      <div className="hidden flex-1 flex-col items-center justify-center gap-10 bg-[#0B1220] px-12 lg:flex">
        <LibraryIllustration className="h-auto w-full max-w-sm" />
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-lg font-semibold text-white">
            Your library, always open
          </p>
          <p className="max-w-xs text-sm text-slate-400">
            Track every title, keep your shelves organized, and pick up right
            where you left off.
          </p>
        </div>
      </div>
    </div>
  );
}
