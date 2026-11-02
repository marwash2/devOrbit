import Link from "next/link";
import { Suspense } from "react";
import connectDB from "@/lib/mongodb";
import Talk from "@/models/Talk";
import { connection } from "next/server";
export default function TalksPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12">
        <p className="mb-3 text-sm font-medium text-cyan-400">
          EXPLORE & LEARN
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">Discover Tech Talks</h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Explore ideas, learn new technologies, and discover insights from
          developers around the world.
        </p>
      </div>

      <Suspense fallback={<p className="text-slate-400">Loading talks...</p>}>
        <TalksList />
      </Suspense>
    </main>
  );
}

async function TalksList() {
  // Run database operations at request time
  await connection();

  await connectDB();

  const talks = await Talk.find({}).sort({ createdAt: -1 }).lean();

  if (talks.length === 0) {
    return <p className="text-slate-400">No talks available yet.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {talks.map((talk) => (
        <article
          key={talk.slug}
          className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/40"
        >
          <span className="mb-5 w-fit rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-400">
            {talk.category}
          </span>

          <h2 className="text-xl font-bold">{talk.title}</h2>

          <p className="mt-3 flex-1 leading-7 text-slate-400">
            {talk.description}
          </p>

          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="text-sm text-slate-300">{talk.speaker}</p>

            <p className="mt-1 text-xs text-slate-500">
              {talk.duration} min · {talk.level}
            </p>

            <Link
              href={`/talks/${talk.slug}`}
              className="mt-5 inline-block font-medium text-cyan-400 hover:text-cyan-300"
            >
              View Talk →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
