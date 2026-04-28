"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Clock, Trophy } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Question, TOPICS } from "@/lib/supabase";

const TOPIC_OPTIONS = ["All Topics", ...TOPICS];
const COMPANIES = [
  "All Companies",
  "Hero MotoCorp",
  "Tata Motors",
  "Bajaj Auto",
  "Siemens",
  "ABB",
  "Bosch",
  "L&T",
  "GE",
  "Honeywell",
  "Schlumberger",
  "HAL",
  "ISRO",
  "Mahindra",
];

const DIFFICULTIES = ["All Difficulties", "easy", "medium", "hard"];
const QUESTION_COUNTS = [10, 20, 30];

type QuizState = "setup" | "quiz" | "results";
type SelfRating = "correct" | "partial" | "missed" | null;
const QUESTION_TIMER_SECONDS = 60;

interface QuizAnswer {
  questionId: string;
  userAnswer?: number;
  selfRating?: SelfRating;
  isCorrect?: boolean;
  topic: string;
}

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>("setup");
  const [topic, setTopic] = useState("All Topics");
  const [difficulty, setDifficulty] = useState("All Difficulties");
  const [company, setCompany] = useState("All Companies");
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(QUESTION_TIMER_SECONDS);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [reviewMissedOnly, setReviewMissedOnly] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (quizState === "quiz" && timerEnabled) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
        setQuestionTimer((prev) => {
          if (prev <= 1) {
            setShowAnswer(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [quizState, timerEnabled]);

  // Keyboard shortcuts
  useEffect(() => {
    if (quizState !== "quiz" || !currentQuestion) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "n" && showAnswer) {
        nextQuestion();
      }

      if (currentQuestion.question_type === "mcq" && !showAnswer) {
        const key = parseInt(e.key);
        if (key >= 1 && key <= 4) {
          handleMCQAnswer(key - 1);
        }
      } else if (currentQuestion.question_type === "conceptual") {
        if (e.code === "Space" && !showAnswer) {
          e.preventDefault();
          setShowAnswer(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [quizState, currentQuestion, showAnswer]);

  const startQuiz = async () => {
    const topicParam = topic === "All Topics" ? "all" : topic;
    const difficultyParam = difficulty === "All Difficulties" ? "all" : difficulty;
    const companyParam = company === "All Companies" ? "all" : company;

    const response = await fetch(
      `/api/questions/quiz?topic=${encodeURIComponent(topicParam)}&difficulty=${difficultyParam}&company=${encodeURIComponent(companyParam)}&count=${questionCount}`
    );

    if (response.ok) {
      const data = await response.json();
      setQuestions(data);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setSelectedOption(null);
      setShowAnswer(false);
      setQuizState("quiz");
      setTimer(0);
      setQuestionTimer(QUESTION_TIMER_SECONDS);
      setReviewMissedOnly(false);
    }
  };

  const handleMCQAnswer = (optionIndex: number) => {
    if (showAnswer) return;

    const isCorrect = optionIndex === currentQuestion.correct_option;
    setSelectedOption(optionIndex);
    setShowAnswer(true);

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      userAnswer: optionIndex,
      isCorrect,
      topic: currentQuestion.topic,
    };

    setAnswers([...answers, newAnswer]);
  };

  const handleSelfRating = (rating: SelfRating) => {
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      selfRating: rating,
      topic: currentQuestion.topic,
    };

    setAnswers([...answers, newAnswer]);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowAnswer(false);
      setQuestionTimer(QUESTION_TIMER_SECONDS);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setQuizState("results");

    // Calculate score
    let score = 0;
    answers.forEach((answer) => {
      if (answer.isCorrect) {
        score++;
      } else if (answer.selfRating === "correct") {
        score++;
      } else if (answer.selfRating === "partial") {
        score += 0.5;
      }
    });

    // Show confetti if score > 80%
    if (score / questions.length > 0.8) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Save quiz attempt
    await fetch("/api/quiz/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: topic === "All Topics" ? "Mixed" : topic,
        difficulty: difficulty === "All Difficulties" ? "Mixed" : difficulty,
        company: company === "All Companies" ? null : company,
        total_questions: questions.length,
        score: Math.round(score),
        time_taken: timer,
      }),
    });
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer) => {
      if (answer.isCorrect) {
        score++;
      } else if (answer.selfRating === "correct") {
        score++;
      } else if (answer.selfRating === "partial") {
        score += 0.5;
      }
    });
    return score;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const topicBreakdown = answers.reduce<Record<string, { score: number; total: number }>>(
    (acc, answer) => {
      const key = answer.topic;
      if (!acc[key]) acc[key] = { score: 0, total: 0 };
      acc[key].total += 1;
      if (answer.isCorrect || answer.selfRating === "correct") {
        acc[key].score += 1;
      } else if (answer.selfRating === "partial") {
        acc[key].score += 0.5;
      }
      return acc;
    },
    {}
  );

  const missedQuestionIds = new Set(
    answers
      .filter((answer) => !(answer.isCorrect || answer.selfRating === "correct"))
      .map((answer) => answer.questionId)
  );

  const resultQuestions = reviewMissedOnly
    ? questions.filter((q) => missedQuestionIds.has(q.id))
    : [];

  if (quizState === "setup") {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Start a Quiz
            </h1>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Topic
                </label>
                <select
                  id="quiz-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                >
                  {TOPIC_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Company (optional)
                </label>
                <select
                  id="quiz-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                >
                  {COMPANIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Difficulty
                </label>
                <select
                  id="quiz-difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Number of Questions
                </label>
                <div className="flex gap-2">
                  {QUESTION_COUNTS.map((count) => (
                    <button
                      key={count}
                      onClick={() => setQuestionCount(count)}
                      className={`flex-1 rounded-lg border px-4 py-2 font-medium transition-colors ${
                        questionCount === count
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-zinc-200 bg-white text-zinc-900 hover:border-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="timer"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600"
                />
                <label htmlFor="timer" className="text-sm text-zinc-700 dark:text-zinc-300">
                  Enable timer
                </label>
              </div>

              <button
                onClick={startQuiz}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Start Quiz
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (quizState === "quiz" && currentQuestion) {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        {/* Top Bar */}
        <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              {timerEnabled && (
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  <Clock className="h-4 w-4" />
                  {formatTime(timer)} · Q: {formatTime(questionTimer)}
                </div>
              )}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="mx-auto max-w-4xl px-4 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-6 flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {currentQuestion.topic}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    currentQuestion.difficulty === "easy"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : currentQuestion.difficulty === "medium"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {currentQuestion.difficulty}
                </span>
              </div>

              <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {currentQuestion.question}
              </h2>

              {currentQuestion.question_type === "mcq" ? (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleMCQAnswer(index)}
                      disabled={showAnswer}
                      className={`w-full rounded-lg border p-4 text-left transition-all ${
                        showAnswer
                          ? index === currentQuestion.correct_option
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : selectedOption === index
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-zinc-200 dark:border-zinc-800"
                          : "border-zinc-200 hover:border-blue-600 dark:border-zinc-800 dark:hover:border-blue-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-sm font-medium dark:bg-zinc-800">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-zinc-900 dark:text-zinc-50">{option}</span>
                        {showAnswer && index === currentQuestion.correct_option && (
                          <Check className="h-5 w-5 text-green-600" />
                        )}
                        {showAnswer && selectedOption === index && index !== currentQuestion.correct_option && (
                          <X className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </button>
                  ))}

                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800"
                    >
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">
                        {currentQuestion.answer}
                      </p>
                      <button
                        type="button"
                        onClick={nextQuestion}
                        className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div>
                  {!showAnswer ? (
                    <button
                      type="button"
                      onClick={() => setShowAnswer(true)}
                      className="w-full rounded-lg border border-blue-600 bg-blue-50 px-6 py-3 font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
                    >
                      Show Answer <span className="text-xs">(or press Space)</span>
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                        <p className="whitespace-pre-line text-sm text-zinc-700 dark:text-zinc-300">
                          {currentQuestion.answer}
                        </p>
                      </div>
                      <div>
                        <p className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          How did you do?
                        </p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleSelfRating("correct")}
                            className="flex-1 rounded-lg border border-green-500 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300"
                          >
                            ✅ Got it
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelfRating("partial")}
                            className="flex-1 rounded-lg border border-yellow-500 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300"
                          >
                            🟡 Partially
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelfRating("missed")}
                            className="flex-1 rounded-lg border border-red-500 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300"
                          >
                            ❌ Missed it
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (quizState === "results") {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-blue-100 p-6 dark:bg-blue-900">
                <Trophy className="h-12 w-12 text-blue-600 dark:text-blue-300" />
              </div>
            </div>

            <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Quiz Complete!
            </h1>
            <p className="mb-8 text-zinc-600 dark:text-zinc-400">
              Great job! Here is how you did
            </p>

            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800">
                <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  {score.toFixed(1)}/{questions.length}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Score</div>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800">
                <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  {percentage.toFixed(0)}%
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Percentage</div>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800">
                <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  {formatTime(timer)}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Time Taken</div>
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left dark:border-zinc-800 dark:bg-zinc-800">
              <p className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Topic breakdown</p>
              <div className="space-y-2">
                {Object.entries(topicBreakdown).map(([topicName, data]) => (
                  <div key={topicName} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-700 dark:text-zinc-300">{topicName}</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      {data.score.toFixed(1)}/{data.total}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {reviewMissedOnly ? (
              <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-4 text-left dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Missed questions</p>
                  <button
                    type="button"
                    onClick={() => setReviewMissedOnly(false)}
                    className="text-xs font-medium text-blue-600 hover:underline"
                  >
                    Hide
                  </button>
                </div>
                {resultQuestions.length === 0 ? (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">No missed questions in this quiz.</p>
                ) : (
                  <div className="space-y-3">
                    {resultQuestions.map((q) => (
                      <div key={q.id} className="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{q.question}</p>
                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{q.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setReviewMissedOnly((prev) => !prev)}
                className="flex-1 rounded-lg border border-zinc-200 px-6 py-3 font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                Review Missed Questions
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuizState("setup");
                  setCurrentQuestionIndex(0);
                  setAnswers([]);
                  setTimer(0);
                  setQuestionTimer(QUESTION_TIMER_SECONDS);
                  setReviewMissedOnly(false);
                }}
                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                New Quiz
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

  return null;
}
