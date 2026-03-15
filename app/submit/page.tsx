"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

const TOPICS = [
  "Thermodynamics",
  "Fluid Mechanics",
  "Materials Science",
  "Manufacturing",
  "Automobile Systems",
  "EVs",
  "Design & Mechanisms",
];

const DIFFICULTIES = ["easy", "medium", "hard"];

export default function SubmitPage() {
  const [questionType, setQuestionType] = useState<"mcq" | "conceptual">("mcq");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [company, setCompany] = useState("");
  const [isRealInterview, setIsRealInterview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      question,
      answer,
      question_type: questionType,
      options: questionType === "mcq" ? options : null,
      correct_option: questionType === "mcq" ? correctOption : null,
      topic,
      difficulty,
      company: company || null,
      is_real_interview: isRealInterview,
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form
        setQuestion("");
        setAnswer("");
        setOptions(["", "", "", ""]);
        setCorrectOption(0);
        setCompany("");
        setIsRealInterview(false);
      }
    } catch (error) {
      console.error("Failed to submit question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-6 dark:bg-green-900">
                <Check className="h-12 w-12 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Question Submitted!
            </h1>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              Thank you for contributing! Your question will be reviewed before being added to the question bank.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                Submit Another
              </button>
              <Link
                href="/"
                className="flex-1 rounded-lg border border-zinc-200 px-6 py-3 font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl px-4 py-8">
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
              Submit a Question
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Help build the question bank for fellow mechanical engineers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              {/* Question Type */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Question Type
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setQuestionType("mcq")}
                    className={`flex-1 rounded-lg border px-4 py-2 font-medium transition-colors ${
                      questionType === "mcq"
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-zinc-200 bg-white text-zinc-900 hover:border-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                    }`}
                  >
                    Multiple Choice
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionType("conceptual")}
                    className={`flex-1 rounded-lg border px-4 py-2 font-medium transition-colors ${
                      questionType === "conceptual"
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-zinc-200 bg-white text-zinc-900 hover:border-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                    }`}
                  >
                    Conceptual
                  </button>
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  rows={3}
                  placeholder="Enter your question..."
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                />
              </div>

              {/* MCQ Options */}
              {questionType === "mcq" && (
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Options <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {options.map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="correct"
                          checked={correctOption === index}
                          onChange={() => setCorrectOption(index)}
                          className="h-4 w-4 border-zinc-300 text-blue-600 focus:ring-blue-600"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          required
                          placeholder={`Option ${index + 1}`}
                          className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    Select the correct answer by clicking the radio button
                  </p>
                </div>
              )}

              {/* Answer/Explanation */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {questionType === "mcq" ? "Explanation" : "Answer"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                  rows={5}
                  placeholder={
                    questionType === "mcq"
                      ? "Explain why this is the correct answer..."
                      : "Provide a detailed answer..."
                  }
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                />
              </div>

              {/* Topic */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Topic <span className="text-red-500">*</span>
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                >
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Difficulty <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {DIFFICULTIES.map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff as "easy" | "medium" | "hard")}
                      className={`flex-1 rounded-lg border px-4 py-2 font-medium transition-colors ${
                        difficulty === diff
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-zinc-200 bg-white text-zinc-900 hover:border-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Tesla, Tata Motors, BHEL"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                />
              </div>

              {/* Real Interview Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="real-interview"
                  checked={isRealInterview}
                  onChange={(e) => setIsRealInterview(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600"
                />
                <label
                  htmlFor="real-interview"
                  className="text-sm text-zinc-700 dark:text-zinc-300"
                >
                  This question was asked in a real interview
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Question"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
