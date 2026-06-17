---
name: ripperdoc-design
description: Use this skill to generate well-branded interfaces and assets for Ripperdoc, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Ripperdoc designs digital augmentations (AI, automation, knowledge systems) that expand human capability — a deep-dark, ember-lit, human-first brand.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files. **Start with `brand-book.html`** — it's the flagship identity document (the idea, the mark's meaning, colour, type, motifs, illustration, motion, voice) and the fastest way to absorb the brand.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Fast orientation

- **The idea in one line:** technology is the augmentation; the human is the hero. Lead every design and every line of copy with the person, not the AI. Tagline: **"Human First. Intelligence Amplified."**
- **The mark** is a human node (warm core) with rising augmentation arcs reaching connected nodes — not a brain, not an AI eye. `assets/logo/`: `ripperdoc-mark.svg` (primary), `ripperdoc-badge.svg` (contained), `ripperdoc-mark-mono.svg` (≤18px / 1-colour). Graphic motifs in `assets/motifs/`.
- **Link `styles.css`** for all tokens, fonts and the base reset. Everything is CSS custom properties (`--ink-900`, `--ember-500`, `--text-strong`, `--surface-card`, …). See `tokens/`.
- **Look:** deep near-black ink surfaces + a single warm ember/gold light that behaves like neural activity. Geist + Geist Mono. Soft radii, hairline borders, ember glow on active/hover. Generous whitespace.
- **Signature motif:** the generative neural field — `assets/js/neural-field.js` (`<canvas data-neural-field>`), plus the lockup `AI × SOFTWARE × HARDWARE`.
- **Components:** load `_ds_bundle.js` and read from `window.RipperdocDesignSystem_cbf3c1` (Button, IconButton, Badge, Avatar, Input, Switch, Card, StatCard, CapabilityMeter, Tabs). Per-component usage is in each `*.prompt.md`.
- **Icons:** Lucide via CDN, thin-line, rendered in ember. Never emoji.
- **Don't:** robots/androids, neon cyberpunk clichés, glowing-circuit wallpaper, candy colors, hype copy, automation-replaces-people framing.

Reference the README's CONTENT FUNDAMENTALS, VISUAL FOUNDATIONS and ICONOGRAPHY sections before writing anything.
