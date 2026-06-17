import { NextRequest, NextResponse } from 'next/server';
import { chat, type LlmMessage } from '@/lib/llm';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_TURNS = 26; // basic abuse/cost guard (per request)
const MAX_LEN = 4000; // per-message character cap

function langName(lang: string) {
  return lang === 'no' ? 'Norwegian' : lang === 'pl' ? 'Polish' : 'English';
}

function systemPrompt(lang: string) {
  return `You are the intake agent for Ripperdoc — a practice that designs digital augmentations (AI, intelligent systems and automation) that expand what a person or team can do.

Brand voice: calm, expert, declarative. Empowerment, not replacement. The human stays the hero. No hype, no sales pitch.

Your single job: through a short, focused conversation, understand precisely what the visitor wants to improve and which concrete problems they want to solve — what slows them down, where they lose time, focus or momentum, and what outcome they want.

Method:
- Ask ONE clear question at a time. Open by asking what they would most like to improve, or what problem brought them here.
- Build the picture step by step: current situation, the main pain, who and what is involved, what "better" looks like, and rough scope or timeline.
- Be concrete. If an answer is vague, ask for a specific example, number or situation. State plainly — kindly — that imprecise or vague information cannot be turned into a useful brief, and invite them to be specific.
- Keep your messages short (1–3 sentences). Do not lecture. Do not propose detailed solutions — your task is to understand the problem, not solve it yet.
- After roughly 4–7 useful exchanges, when the picture is clear and specific, produce the brief.

When you produce the brief, output a line containing exactly:
===BRIEF===
then a concise, structured summary:
- Problem:
- Goal:
- Area(s): one or more of Intelligence / Software / Infrastructure
- Scope / next step:
After the brief, ask the person to confirm it captures their situation, or to correct and refine any point before it is sent.

Respond ONLY in ${langName(lang)}. Use only what the person tells you; never invent facts about them or their company.`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }
  const b = body as { lang?: string; messages?: Array<{ role?: string; content?: string }> };
  const lang = ['no', 'en', 'pl'].includes(b?.lang || '') ? (b!.lang as string) : 'en';
  const raw = Array.isArray(b?.messages) ? b!.messages! : [];
  if (raw.length === 0) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }
  if (raw.length > MAX_TURNS) {
    return NextResponse.json({ text: '', error: 'too_long' }, { status: 200 });
  }
  const messages: LlmMessage[] = raw.slice(-MAX_TURNS).map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content || '').slice(0, MAX_LEN)
  }));

  const r = await chat(systemPrompt(lang), messages);
  if (!r.ok) {
    return NextResponse.json({ text: '', error: r.error || 'error' }, { status: 200 });
  }
  return NextResponse.json({ text: r.text });
}
