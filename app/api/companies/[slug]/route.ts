import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (companyError) {
    return NextResponse.json({ error: companyError.message }, { status: 404 });
  }

  const { data: questions, error: questionError } = await supabase
    .from("questions")
    .select("*")
    .eq("is_approved", true)
    .eq("company", company.name)
    .order("created_at", { ascending: false });

  if (questionError) {
    return NextResponse.json({ error: questionError.message }, { status: 500 });
  }

  return NextResponse.json({ company, questions: questions ?? [] });
}
