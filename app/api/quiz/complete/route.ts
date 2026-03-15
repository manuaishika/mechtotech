import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("quiz_attempts")
      .insert([
        {
          session_id: body.session_id || `anon-${Date.now()}`,
          topic: body.topic,
          difficulty: body.difficulty,
          total_questions: body.total_questions,
          score: body.score,
          time_taken: body.time_taken,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save quiz attempt" },
      { status: 500 }
    );
  }
}
