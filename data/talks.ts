export type Talk = {
  slug: string;
  title: string;
  description: string;
  speaker: string;
  category: string;
  duration: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  content: string[];
};

export const talks: Talk[] = [
  {
    slug: "nextjs-essentials",
    title: "Next.js Essentials",
    description: "Learn how to build modern web applications using Next.js.",
    speaker: "Sarah Johnson",
    category: "Web Development",
    duration: 45,
    level: "Beginner",
    content: [
      "Next.js is a React framework for building full-stack web applications.",
      "In this talk, we'll explore routing, layouts, Server Components, and data fetching.",
      "By the end, you'll understand how to structure your own Next.js project.",
    ],
  },
  {
    slug: "ai-for-developers",
    title: "AI for Developers",
    description: "Discover practical ways to integrate AI into your workflow.",
    speaker: "Alex Morgan",
    category: "Artificial Intelligence",
    duration: 35,
    level: "Intermediate",
    content: [
      "Artificial intelligence is changing how developers build software.",
      "We'll explore AI APIs, automation, and responsible AI integration.",
      "You'll learn how to use AI tools while maintaining control over your code.",
    ],
  },
  {
    slug: "server-actions",
    title: "Understanding Server Actions",
    description: "Handle server-side mutations using modern Next.js patterns.",
    speaker: "Daniel Carter",
    category: "Backend Development",
    duration: 50,
    level: "Intermediate",
    content: [
      "Server Actions help developers handle mutations directly on the server.",
      "We'll explore forms, validation, database operations, and error handling.",
      "You'll discover how to build secure and maintainable server-side features.",
    ],
  },
];

export function getTalkBySlug(slug: string) {
  return talks.find((talk) => talk.slug === slug);
}
