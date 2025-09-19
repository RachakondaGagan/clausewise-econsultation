import { NextRequest, NextResponse } from "next/server";
import { addComment, computeStats, getComments } from "./store";
import { analyzeSentiment, extractKeywords, summarize } from "./analyze";

export async function GET() {
  const comments = getComments();
  const stats = computeStats();
  return NextResponse.json({ comments, stats });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = String(body?.text || "").trim();
    if (!text) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }
    const sentiment = analyzeSentiment(text);
    const summary = summarize(text);
    const keywords = extractKeywords(text);
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    addComment({ id, text, summary, sentiment, keywords, createdAt: Date.now() });
    const stats = computeStats();
    return NextResponse.json({ id, sentiment, summary, keywords, stats });
  } catch (e) {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
}


