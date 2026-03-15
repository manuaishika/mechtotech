import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("pending_questions")
      .insert([
        {
          question: body.question,
          answer: body.answer,
          question_type: body.question_type,
          options: body.options || null,
          correct_option: body.correct_option || null,
          topic: body.topic,
          difficulty: body.difficulty,
          company: body.company || null,
          is_real_interview: body.is_real_interview || false,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit question" },
      { status: 500 }
    );
  }
}
