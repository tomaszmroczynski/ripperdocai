import type { MetadataRoute } from 'next';

// Welcomes all crawlers, including AI/LLM agents (GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended, etc. are covered by the wildcard allow).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://ripperdoc.ai/sitemap.xml',
    host: 'https://ripperdoc.ai'
  };
}
