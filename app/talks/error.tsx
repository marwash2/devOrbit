"use client";

export default function TalksError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 text-center">
      <h2 className="text-3xl font-bold">Something went wrong</h2>

      <p className="mt-4 text-slate-400">
        We couldn&apos;t load the talks right now. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-8 rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
      >
        Try Again
      </button>
    </main>
  );
}
