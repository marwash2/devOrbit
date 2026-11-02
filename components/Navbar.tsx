import Link from "next/link";
import { Suspense } from "react";
import NavbarAuth from "@/components/navbar-auth";

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-white">
          Dev<span className="text-cyan-400">Orbit</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex gap-6 text-sm text-slate-300"
        >
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/talks"
              className="text-sm text-slate-300 transition hover:text-cyan-400"
            >
              Talks
            </Link>

            <Link
              href="/#topics"
              className="text-sm text-slate-300 transition hover:text-cyan-400"
            >
              Topics
            </Link>

            <Link
              href="/#about"
              className="text-sm text-slate-300 transition hover:text-cyan-400"
            >
              About
            </Link>
          </div>
          <Suspense
            fallback={
              <div className="h-10 w-36 animate-pulse rounded-lg bg-white/10" />
            }
          >
            <NavbarAuth />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
