"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, ListChecks } from "lucide-react";

const topics = [
  "Thermodynamics",
  "Fluid Mechanics",
  "Materials Science",
  "Manufacturing",
  "Automobile Systems",
  "EVs",
  "Design & Mechanisms",
];

export default function Home() {
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch question counts for each topic
    async function fetchCounts() {
      const counts: Record<string, number> = {};
      
      for (const topic of topics) {
        const response = await fetch(`/api/questions?topic=${encodeURIComponent(topic)}`);
        if (response.ok) {
          const data = await response.json();
          counts[topic] = data.length;
        }
      }
      
      setQuestionCounts(counts);
    }

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            The missing interview prep platform <br />
            <span className="text-blue-600">for mechanical engineers</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Quizzes, concept cards, and practice questions — built for ME students tired of Googling.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/quiz"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <Brain className="h-5 w-5" />
              Start a Quiz
            </Link>
            <Link
              href="/questions"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-8 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              <ListChecks className="h-5 w-5" />
              Browse Questions
            </Link>
            <Link
              href="/concepts"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-8 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              <BookOpen className="h-5 w-5" />
              Review Concepts
            </Link>
          </div>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Explore by Topic
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Link
                key={topic}
                href={`/questions?topic=${encodeURIComponent(topic)}`}
                className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:border-blue-600 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-600"
              >
                <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                  {topic}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {questionCounts[topic] !== undefined
                    ? `${questionCounts[topic]} questions`
                    : "Loading..."}
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Want to contribute?{" "}
            <Link
              href="/submit"
              className="font-medium text-blue-600 hover:underline"
            >
              Submit a question
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
