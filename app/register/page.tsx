"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUser, type RegisterState } from "@/app/actions/register";

const initialState: RegisterState = {
  success: false,
  message: "",
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState,
  );

  if (state.success) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <div className="mb-6 text-5xl text-cyan-400">✓</div>

          <h1 className="text-3xl font-bold">Welcome to DevOrbit!</h1>

          <p className="mt-4 text-slate-400">
            Your account has been created successfully.
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Email and password sign-in will be available in the next step.
          </p>

          <Link
            href="/talks"
            className="mt-8 inline-block rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Explore Talks
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-cyan-400">
            JOIN THE COMMUNITY
          </p>

          <h1 className="text-4xl font-bold">Create your account</h1>

          <p className="mt-4 text-slate-400">
            Join DevOrbit and start exploring ideas from developers around the
            world.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                required
                minLength={2}
                maxLength={80}
                aria-invalid={!!state.errors?.name}
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

              {state.errors?.name && (
                <p className="mt-2 text-sm text-red-400">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                aria-invalid={!!state.errors?.email}
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

              {state.errors?.email && (
                <p className="mt-2 text-sm text-red-400">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                required
                minLength={8}
                aria-invalid={!!state.errors?.password}
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

              {state.errors?.password && (
                <p className="mt-2 text-sm text-red-400">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            {state.message && (
              <p role="alert" className="text-center text-sm text-red-400">
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-slate-400">Already have an account?</p>

            <Link
              href="/login"
              className="mt-2 inline-block font-medium text-cyan-400 hover:text-cyan-300"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
