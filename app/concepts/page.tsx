"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { CONCEPTS } from "@/lib/concepts";

const topics = [
  "Thermodynamics",
  "Fluid Mechanics",
  "Materials Science",
  "Manufacturing",
  "Automobile Systems",
  "EVs",
  "Design & Mechanisms",
];

export default function ConceptsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const filteredConcepts = selectedTopic
    ? CONCEPTS.filter((c) => c.topic === selectedTopic)
    : [];

  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                Concept Cards
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Bite-sized explanations of core mechanical engineering concepts
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic) => {
                const conceptCount = CONCEPTS.filter((c) => c.topic === topic).length;
                return (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-6 text-left transition-all hover:border-blue-600 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-600"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                      <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {topic}
                    </h3>
                    <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                      {conceptCount} concepts
                    </p>
                    <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                      Explore
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all group-hover:w-full" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <button
          onClick={() => setSelectedTopic(null)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Topics
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {selectedTopic}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              {filteredConcepts.length} key concepts
            </p>
          </div>

          <div className="space-y-6">
            {filteredConcepts.map((concept, index) => (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {concept.title}
                </h2>
                <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {concept.explanation}
                </p>
                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                    <span className="font-semibold">Real-world example:</span> {concept.example}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Practice Questions Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 text-center dark:border-blue-800 dark:bg-blue-900/20"
          >
            <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Ready to test your knowledge?
            </h3>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              Practice questions on {selectedTopic}
            </p>
            <Link
              href={`/questions?topic=${encodeURIComponent(selectedTopic)}`}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              View Practice Questions
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
