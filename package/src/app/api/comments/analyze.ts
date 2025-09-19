// Lightweight analysis utilities without external deps
// Note: For production, replace with robust NLP models/APIs.

import type { SentimentLabel } from "./store";

const positiveWords = new Set([
  "good","great","excellent","benefit","beneficial","help","helps","support","grow","growth","improve","improves","better","enable","encourage"
]);
const negativeWords = new Set([
  "bad","worse","worst","burden","costly","strict","harm","harms","delay","problem","issue","concern","discourage","difficult","increase","increases"
]);

const stopwords = new Set([
  "the","is","am","are","was","were","a","an","and","or","but","of","to","in","for","on","with","this","that","it","be","by","as","from","at","we","you","they","he","she","i","will","shall","would","should","can","could","about","into","over","too","very","also","than","then","there","here","been","being","march","april","may","june","july","august","september","october","november","december","2025","2024"
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function analyzeSentiment(text: string): SentimentLabel {
  const tokens = tokenize(text);
  let score = 0;
  for (const t of tokens) {
    if (positiveWords.has(t)) score += 1;
    if (negativeWords.has(t)) score -= 1;
  }
  if (score > 0) return "positive";
  if (score < 0) return "negative";
  return "neutral";
}

export function summarize(text: string): string {
  // Heuristic: take first clause and strip filler
  const firstSentence = text.split(/(?<=[.!?])\s+/)[0] || text;
  const tokens = tokenize(firstSentence).filter((t) => !stopwords.has(t));
  const trimmed = tokens.join(" ");
  // Shorten to ~8 words
  const words = trimmed.split(" ");
  return words.slice(0, Math.min(10, words.length)).join(" ") || text.slice(0, 80);
}

export function extractKeywords(text: string): string[] {
  const tokens = tokenize(text).filter((t) => !stopwords.has(t));
  const freq: Record<string, number> = {};
  for (const t of tokens) freq[t] = (freq[t] || 0) + 1;
  const entries = Object.entries(freq)
    .filter(([w]) => w.length > 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([w]) => w);
  return entries;
}


