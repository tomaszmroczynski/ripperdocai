// Provider-agnostic LLM call. Configure via env on Vercel:
//   LLM_PROVIDER = "anthropic" (default) | "openai"
//   ANTHROPIC_API_KEY + optional ANTHROPIC_MODEL
//   OPENAI_API_KEY + optional OPENAI_MODEL
// No SDK dependency — plain fetch to the providers' REST APIs.

export type LlmMessage = { role: 'user' | 'assistant'; content: string };
export type LlmResult = { ok: boolean; text: string; error?: string };

export async function chat(system: string, messages: LlmMessage[]): Promise<LlmResult> {
  const provider = (process.env.LLM_PROVIDER || 'anthropic').toLowerCase();
  try {
    if (provider === 'openai') return await callOpenAI(system, messages);
    return await callAnthropic(system, messages);
  } catch (e) {
    return { ok: false, text: '', error: e instanceof Error ? e.message : 'llm_error' };
  }
}

async function callAnthropic(system: string, messages: LlmMessage[]): Promise<LlmResult> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { ok: false, text: '', error: 'not_configured' };
  const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest';
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({ model, max_tokens: 1024, system, messages })
  });
  if (!res.ok) return { ok: false, text: '', error: `anthropic_${res.status}` };
  const data = await res.json();
  const text = Array.isArray(data?.content)
    ? data.content.map((b: { text?: string }) => b.text || '').join('').trim()
    : '';
  return { ok: true, text };
}

async function callOpenAI(system: string, messages: LlmMessage[]): Promise<LlmResult> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { ok: false, text: '', error: 'not_configured' };
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      messages: [{ role: 'system', content: system }, ...messages]
    })
  });
  if (!res.ok) return { ok: false, text: '', error: `openai_${res.status}` };
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim() || '';
  return { ok: true, text };
}
