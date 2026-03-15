import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");
  const difficulty = searchParams.get("difficulty");
  const type = searchParams.get("type");
  const company = searchParams.get("company");

  let query = supabase
    .from("questions")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (topic) {
    query = query.eq("topic", topic);
  }

  if (difficulty) {
    query = query.eq("difficulty", difficulty);
  }

  if (type) {
    query = query.eq("question_type", type);
  }

  if (company) {
    query = query.eq("company", company);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
