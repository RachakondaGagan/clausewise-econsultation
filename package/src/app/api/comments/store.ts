// Simple in-memory store for demo purposes. Resets on server restart.
export type SentimentLabel = "positive" | "negative" | "neutral";

export interface CommentRecord {
  id: string;
  text: string;
  summary: string;
  sentiment: SentimentLabel;
  keywords: string[];
  createdAt: number; // epoch ms
}

export interface StatsSnapshot {
  total: number;
  positive: number;
  negative: number;
  neutral: number;
  topKeyword: string | null;
}

const store: { comments: CommentRecord[] } = { comments: [] };

export function addComment(record: CommentRecord) {
  store.comments.unshift(record);
}

export function getComments(): CommentRecord[] {
  return store.comments;
}

export function computeStats(): StatsSnapshot {
  const total = store.comments.length;
  let positive = 0;
  let negative = 0;
  let neutral = 0;
  const freq: Record<string, number> = {};
  for (const c of store.comments) {
    if (c.sentiment === "positive") positive++;
    else if (c.sentiment === "negative") negative++;
    else neutral++;
    for (const k of c.keywords) freq[k] = (freq[k] || 0) + 1;
  }
  let topKeyword: string | null = null;
  let max = 0;
  for (const [k, v] of Object.entries(freq)) {
    if (v > max) {
      max = v;
      topKeyword = k;
    }
  }
  return { total, positive, negative, neutral, topKeyword };
}


