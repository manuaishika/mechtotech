import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");
  const difficulty = searchParams.get("difficulty");
  const count = parseInt(searchParams.get("count") || "10");

  let query = supabase
    .from("questions")
    .select("*")
    .eq("is_approved", true);

  if (topic && topic !== "all") {
    query = query.eq("topic", topic);
  }

  if (difficulty && difficulty !== "all") {
    query = query.eq("difficulty", difficulty);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Shuffle and limit
  const shuffled = data?.sort(() => 0.5 - Math.random()) || [];
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return NextResponse.json(selected);
}
