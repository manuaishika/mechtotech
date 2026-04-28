"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Company, Question } from "@/lib/supabase";

const ROLE_GUIDE: Record<string, string[]> = {
  "hero-motocorp": ["Production engineer", "Quality engineer", "Powertrain trainee"],
  "tata-motors": ["Vehicle systems engineer", "Manufacturing engineer", "EV integration trainee"],
  "bajaj-auto": ["R&D trainee", "Manufacturing operations engineer", "Testing and validation trainee"],
  siemens: ["Graduate engineer trainee", "Industrial automation engineer", "Design engineer"],
  abb: ["Automation engineer", "Drives/application engineer", "Field service engineer"],
  bosch: ["Product design trainee", "Manufacturing quality engineer", "Process development engineer"],
  "l-and-t": ["Project engineer", "Site/mechanical engineer", "Design and estimation engineer"],
  ge: ["Rotating equipment engineer", "Manufacturing engineer", "Thermal systems trainee"],
  honeywell: ["Process/controls engineer", "Field instrumentation trainee", "Manufacturing systems engineer"],
  schlumberger: ["Field engineer trainee", "Drilling/fluids engineer", "Completions support engineer"],
  hal: ["Aerospace production engineer", "Materials/process engineer", "Maintenance engineer"],
  isro: ["Mechanical systems engineer", "Propulsion/thermal engineer", "Integration and testing engineer"],
  mahindra: ["Automotive systems engineer", "Manufacturing engineer", "EV platform trainee"],
};

export default function CompanyPage() {
  const params = useParams<{ slug: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!params.slug) return;
      const res = await fetch(`/api/companies/${params.slug}`);
      if (res.ok) {
        const data = await res.json();
        setCompany(data.company);
        setQuestions(data.questions ?? []);
      }
      setLoading(false);
    }
    load();
  }, [params.slug]);

  if (loading) {
    return <div className="min-h-screen animate-pulse bg-zinc-50 dark:bg-zinc-950" />;
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
        <p className="text-zinc-700 dark:text-zinc-300">Company not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{company.name}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{company.description}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Sector</p>
            <p className="font-medium text-zinc-900 dark:text-zinc-50">{company.sector}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Difficulty profile</p>
            <p className="font-medium text-zinc-900 dark:text-zinc-50">{company.difficulty_profile}</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">Commonly asked topics</p>
          <div className="flex flex-wrap gap-2">
            {(company.focus_topics ?? []).map((topic) => (
              <span key={topic} className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">What they hire for</p>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {(ROLE_GUIDE[company.slug] ?? ["Mechanical engineer trainee", "Production/operations engineer"]).map(
              (role) => (
                <li key={role}>- {role}</li>
              )
            )}
          </ul>
        </div>

        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">Prep direction for this company</p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Focus first on {company.focus_topics?.[0] ?? "core fundamentals"} and{" "}
            {company.focus_topics?.[1] ?? "applied problem solving"}, then practice short oral explanations for
            real interview style questions. Interviewers typically probe follow-up depth once basics are correct.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Company question bank</h2>
          {questions.length === 0 ? (
            <p className="rounded-lg border border-zinc-200 bg-white p-4 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              No questions yet for this company — submit one you were asked!
            </p>
          ) : (
            <div className="space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{q.question}</p>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{q.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
