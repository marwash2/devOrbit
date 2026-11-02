import Link from "next/link";
const topics = [
  {
    title: "Web Development",
    description: "Explore frontend, backend, and modern web technologies.",
  },
  {
    title: "AI & Automation",
    description: "Discover AI tools, workflows, and practical ideas.",
  },
  {
    title: "Career & Learning",
    description: "Share experiences and grow together as developers.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-28">
          <p className="mb-6 text-sm font-medium tracking-widest text-cyan-400">
            THE DEVELOPER COMMUNITY
          </p>

          <h1 className="max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
            Great ideas deserve
            <span className="block text-cyan-400">their own orbit.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
            DevOrbit is a place to share what you&apos;re building, learn from
            others, and join meaningful tech conversations.
          </p>

          <Link
            href="/talks"
            className="mt-10 inline-block rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Explore Talks
          </Link>
        </div>
      </section>

      <section
        id="topics"
        className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20"
      >
        <h2 className="text-3xl font-bold">Explore conversations</h2>

        <p className="mt-3 text-slate-400">
          Find discussions around the technologies you love.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {topics.map((topic) => (
            <article
              key={topic.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/40"
            >
              <h3 className="text-xl font-semibold">{topic.title}</h3>

              <p className="mt-3 leading-7 text-slate-400">
                {topic.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="border-t border-white/10 px-6 py-16 text-center"
      >
        <h2 className="text-2xl font-bold">Built for curious developers</h2>

        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          A community where developers can share knowledge, discover ideas, and
          grow through conversation.
        </p>
      </section>
    </main>
  );
}
