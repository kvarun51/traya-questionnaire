import { NextResponse } from "next/server";
import questions from "@/data/questionnaire.json";

export async function GET() {
  return NextResponse.json(questions);
}
