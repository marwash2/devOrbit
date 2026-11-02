import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function NavbarAuth() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm text-slate-300 transition hover:text-cyan-400"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Register
        </Link>
      </div>
    );
  }

  const displayName =
    session.user.name?.split(" ")[0] || session.user.email || "Developer";

  return (
    <div className="flex items-center gap-4">
      <span className="hidden text-sm text-slate-300 sm:inline">
        Hi, {displayName}
      </span>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium transition hover:border-cyan-400 hover:text-cyan-400"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
