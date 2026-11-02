import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Talk from "@/models/Talk";
import { connection } from "next/server";
type TalkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function TalkPage({ params }: TalkPageProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-slate-400">Loading talk...</p>
        </main>
      }
    >
      <TalkContent params={params} />
    </Suspense>
  );
}

async function TalkContent({ params }: TalkPageProps) {
  const { slug } = await params;

  // Run database operations at request time
  await connection();

  await connectDB();

  const talk = await Talk.findOne({ slug }).lean();

  if (!talk) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/talks"
        className="text-sm text-slate-400 hover:text-cyan-400"
      >
        ← Back to Talks
      </Link>

      <div className="mt-12">
        <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-400">
          {talk.category}
        </span>

        <h1 className="mt-8 text-4xl font-bold md:text-5xl">{talk.title}</h1>

        <p className="mt-6 text-xl leading-8 text-slate-400">
          {talk.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-6 border-b border-white/10 pb-8 text-sm text-slate-300">
          <span>Speaker: {talk.speaker}</span>
          <span>{talk.duration} minutes</span>
          <span>{talk.level}</span>
        </div>

        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">About this talk</h2>

          <div className="space-y-6">
            {talk.content.map((paragraph: string, index: number) => (
              <p key={index} className="leading-8 text-slate-400">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
