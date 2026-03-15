"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Search, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { Question } from "@/lib/supabase";

const TOPICS = [
  "All Topics",
  "Thermodynamics",
  "Fluid Mechanics",
  "Materials Science",
  "Manufacturing",
  "Automobile Systems",
  "EVs",
  "Design & Mechanisms",
];

const DIFFICULTIES = ["All", "easy", "medium", "hard"];
const QUESTION_TYPES = ["All Types", "mcq", "conceptual"];

export default function QuestionsPage() {
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [reviewedQuestions, setReviewedQuestions] = useState<Set<string>>(new Set());

  const [topicFilter, setTopicFilter] = useState(searchParams.get("topic") || "All Topics");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");

  // Load reviewed questions from localStorage
  useEffect(() => {
    const reviewed = localStorage.getItem("reviewedQuestions");
    if (reviewed) {
      setReviewedQuestions(new Set(JSON.parse(reviewed)));
    }
  }, []);

  // Fetch questions
  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      const params = new URLSearchParams();

      if (topicFilter !== "All Topics") {
        params.append("topic", topicFilter);
      }
      if (difficultyFilter !== "All") {
        params.append("difficulty", difficultyFilter);
      }
      if (typeFilter !== "All Types") {
        params.append("type", typeFilter);
      }

      const response = await fetch(`/api/questions?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
      setLoading(false);
    }

    fetchQuestions();
  }, [topicFilter, difficultyFilter, typeFilter]);

  const toggleQuestion = (id: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const toggleReviewed = (id: string) => {
    const newReviewed = new Set(reviewedQuestions);
    if (newReviewed.has(id)) {
      newReviewed.delete(id);
    } else {
      newReviewed.add(id);
    }
    setReviewedQuestions(newReviewed);
    localStorage.setItem("reviewedQuestions", JSON.stringify(Array.from(newReviewed)));
  };

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Question Bank
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Browse and filter practice questions
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <div className="space-y-4 lg:col-span-1">
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 font-semibold text-zinc-900 dark:text-zinc-50">Filters</h3>

              {/* Search */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search questions..."
                    className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                  />
                </div>
              </div>

              {/* Topic Filter */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Topic
                </label>
                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                >
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Difficulty
                </label>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                >
                  {DIFFICULTIES.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Question Type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                >
                  {QUESTION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"
                  />
                ))}
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="rounded-lg border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-zinc-600 dark:text-zinc-400">
                  No questions found for this filter.{" "}
                  <Link href="/submit" className="text-blue-600 hover:underline">
                    Be the first to submit one!
                  </Link>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Showing {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""}
                </div>
                {filteredQuestions.map((question) => {
                  const isExpanded = expandedQuestions.has(question.id);
                  const isReviewed = reviewedQuestions.has(question.id);

                  return (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <div className="p-4">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                            {question.topic}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              question.difficulty === "easy"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : question.difficulty === "medium"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            }`}
                          >
                            {question.difficulty}
                          </span>
                          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                            {question.question_type === "mcq" ? "MCQ" : "Conceptual"}
                          </span>
                          {question.company && (
                            <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                              {question.company}
                            </span>
                          )}
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className="flex-1 text-left"
                          >
                            <h3 className="mb-2 font-medium text-zinc-900 dark:text-zinc-50">
                              {question.question}
                            </h3>
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleReviewed(question.id)}
                              className={`rounded-lg border p-2 transition-colors ${
                                isReviewed
                                  ? "border-green-500 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                                  : "border-zinc-200 text-zinc-400 hover:border-green-500 hover:text-green-600 dark:border-zinc-800"
                              }`}
                              title={isReviewed ? "Mark as not reviewed" : "Mark as reviewed"}
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => toggleQuestion(question.id)}
                              className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
                            >
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800"
                          >
                            {question.question_type === "mcq" && question.options && (
                              <div className="mb-4 space-y-2">
                                {question.options.map((option, index) => (
                                  <div
                                    key={index}
                                    className={`rounded-lg border p-3 text-sm ${
                                      index === question.correct_option
                                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                        : "border-zinc-200 dark:border-zinc-800"
                                    }`}
                                  >
                                    <span className="font-medium">{index + 1}. </span>
                                    {option}
                                    {index === question.correct_option && (
                                      <span className="ml-2 text-green-600">✓ Correct</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                              <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                Answer:
                              </h4>
                              <p className="whitespace-pre-line text-sm text-zinc-700 dark:text-zinc-300">
                                {question.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
