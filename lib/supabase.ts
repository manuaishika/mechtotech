import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Question {
  id: string;
  question: string;
  answer: string;
  question_type: "mcq" | "conceptual";
  options?: string[];
  correct_option?: number;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  company?: string;
  is_real_interview: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface PendingQuestion {
  id: string;
  question: string;
  answer: string;
  question_type: "mcq" | "conceptual";
  options?: string[];
  correct_option?: number;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  company?: string;
  is_real_interview: boolean;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  session_id: string;
  topic: string;
  difficulty: string;
  total_questions: number;
  score: number;
  time_taken: number;
  created_at: string;
}

export const TOPICS = [
  "Thermodynamics",
  "Fluid Mechanics",
  "Materials Science",
  "Manufacturing",
  "Automobile Systems",
  "EVs",
  "Design & Mechanisms",
] as const;

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;
