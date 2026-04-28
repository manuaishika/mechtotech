import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://127.0.0.1:54321";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dev-anon-key";

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
  industry_sector?: IndustrySector;
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
  industry_sector?: IndustrySector;
  is_real_interview: boolean;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  session_id: string;
  topic: string;
  difficulty: string;
  company?: string;
  total_questions: number;
  score: number;
  time_taken: number;
  created_at: string;
}

export type IndustrySector =
  | "automobile"
  | "industrial"
  | "oil_gas"
  | "aerospace"
  | "startup";

export interface Company {
  id: string;
  name: string;
  slug: string;
  sector: IndustrySector;
  description: string;
  focus_topics: string[];
  difficulty_profile: string;
}

export const TOPICS = [
  "Thermodynamics",
  "Fluid Mechanics",
  "Materials Science",
  "Manufacturing & Processes",
  "Automobile Systems",
  "EVs & Electrification",
  "Design & Mechanisms",
  "Industrial Automation",
  "GD&T & Engineering Drawing",
] as const;

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;

export const INDUSTRY_SECTORS: IndustrySector[] = [
  "automobile",
  "industrial",
  "oil_gas",
  "aerospace",
  "startup",
];
