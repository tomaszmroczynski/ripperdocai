# Ripperdoc — Design System

> **Ripperdoc designs digital augmentations that expand the capabilities of people, teams and organizations.**
> Technology is not the hero. Humans are. Technology is the augmentation.

Ripperdoc is a modern specialist who extends human and organizational capability through technology. The name comes from the Cyberpunk universe, where a *ripperdoc* enhanced people with cybernetic implants. In the real world those implants are replaced by **AI, intelligent assistants, automation, knowledge systems and connected software**. The mission is not to replace people — it is to make them more capable.

This repository is the complete brand + product design system: foundations (color, type, spacing, motion), reusable React components, two UI kits, a presentation system, and the brand assets that tie them together.

---

## Sources & references

This system was extracted from three primary visual references supplied by the brand (stored in `assets/img/`):

- `portrait-neural.jpg` — a human profile dissolving into a glowing neural network + circuit traces inside a thin gold ring. **The hero image of the brand.**
- `summit-network.png` — a lone figure on a summit overlooking a city at dawn, beneath a constellation of nodes; carries the lockup *AI × SOFTWARE × HARDWARE* / *Rozszerzamy ludzkie możliwości*.
- `manifesto.jpg` — the long-form manifesto infographic (Polish) pairing the neural portrait with the summit scene.

No codebase or Figma file was provided; the product surfaces (Atlas console, marketing site) are original designs that express the brand. The guiding theme (PL): *"W dzisiejszym świecie rolę ripperdoca coraz częściej przejmują specjaliści od sztucznej inteligencji…"* — today, AI specialists take on the ripperdoc's role, equipping people with assistants, decision-support, automation and tools so one person can do what once took whole teams.

---

## CONTENT FUNDAMENTALS — how Ripperdoc writes

**Voice:** calm, expert, declarative. The confidence of a specialist who has done this many times. Never hype, never salesy, never "AI consultant" boilerplate.

**Core reframe — always.** The brand constantly redirects from *technology* to *capability*. AI is never the subject; the human is. Write "we extend what humans can do," not "we use cutting-edge AI."

- **Augmentation, not automation.** This is the through-line. Favour: augment, extend, expand, amplify, capability, the human stays in the centre. Avoid: replace, autonomous, hands-off, set-and-forget.
- **Person → tool → outcome.** Sentences put the human first and the technology second: *"They help people see more through data."*
- **Cadence.** Short declarative lines, often stacked, manifesto-style. Parallel structure: *"see more through data, think faster through AI, remember through knowledge systems."*
- **Pronouns.** "We" for Ripperdoc (collective, quiet). "You / your team / your organization" for the reader. Speak about the person, not at them.
- **Casing.** Sentence case for headlines and body. UPPERCASE reserved for the lockup and mono eyebrows/labels (wide tracking). Title Case avoided.
- **Numbers.** Concrete and earned (`+312%`, `1,240 hrs/wk returned`). Never invent vanity stats; every metric should map to real capability gained. Less is more.
- **Emoji:** never. The reference infographic used emoji bullets; the *system* replaces them with thin-line Lucide icons.
- **Metaphor bank.** ripperdoc / implant / augmentation; neuron / synapse / signal / network / node; light / spark / insight; horizon / summit / the climb.

**Example copy:**
- Eyebrow: `AUGMENTATION, NOT AUTOMATION`
- Headline: *We extend what humans can do.*
- Lede: *A ripperdoc once enhanced the body with cybernetics. We enhance the mind.*
- CTA: *Book a session* · *Start an augmentation*
- Manifesto: *If implants enhanced the body, intelligence enhances the mind.*

---

## VISUAL FOUNDATIONS

**Atmosphere.** Cinematic, premium, intelligent, mature. Deep dark surfaces with a single warm light source — light behaves like *neural activity*, never decoration. Think neuroscience meets architecture, not gamer/cyberpunk neon.

**Color.** Two forces (see `tokens/colors.css`):
- **Ink** — near-black navy/graphite surfaces (`--ink-1000 … --graphite-400`). The mind at rest. Backgrounds are genuinely dark (`#07090C`), not "dark grey."
- **Ember** — amber → copper → gold (`--ember-100 … --ember-700`, plus `--spark #FFD9A0`). The signal. `--ember-500` is the primary action; `--spark` is reserved for the single hottest focal point.
- **Mist** — the neutral text ramp on dark. **Semantics** are muted (neural green / oxidised red / node blue), never candy.

**Typography.** `Geist` for everything human-facing, `Geist Mono` for *signals* (data, labels, telemetry, code). Large confident display, tight tracking (`-0.03em`) on headlines; wide tracking (`0.18–0.34em`) on uppercase eyebrows and the lockup. Generous whitespace is a brand value. Scale in `tokens/typography.css`.

**The lockup.** `AI × SOFTWARE × HARDWARE` — light weight, wide tracking, with the `×` in ember and the final word using `--grad-ember` (white → gold). Subline: *We expand human capability*.

**Backgrounds.** Mostly flat deep ink. Two devices add life: (1) the **neural field** generative canvas (`assets/js/neural-field.js`) — drifting nodes, proximity links, warm spark nodes; (2) full-bleed cinematic **photography** with a `--grad-scrim` protection gradient for text. The signature **horizon gradient** (`--grad-horizon`) takes cool sky into warm gold. Radial `--grad-spark` sits behind focal points.

**Shape language.** Curves, arcs, circles, rings, interconnected nodes — echoing neurons and the logomark ring. Radii are soft (cards `--radius-lg`/`--radius-xl`, pills for badges/toggles). **Avoid** aggressive triangles, sharp cyberpunk chamfers, militaristic geometry.

**Elevation & cards.** On dark, lift reads as *light*, not drop-shadow: a faint inner top-light (`--edge-top`), a subtle top sheen (`--grad-card`), and ambient depth. Cards are ink panels with a hairline border (`--border-hairline`); interactive cards gain an **ember border + glow** and rise 2px on hover.

**Borders.** Hairlines at 6–10% white. The signature accent border is `--border-ember` (amber at ~42%), used on focus, active cards, avatars (the logomark ring echo).

**Motion** (`tokens/motion.css`). Alive but never flashy — "movement supports understanding." Organic easing (`--ease-signal`, `--ease-spring`), never linear. Signature motions: nodes drift, sparks breathe (`rd-breath`), signals travel a connection, focus rings pulse (`rd-pulse-ring`), content rises in (`rd-rise`). All gated by `prefers-reduced-motion`.

**Hover / press.** Hover = warmer + brighter (ember border, glow up one step, lift). Press = nudge **down 1px**, never scale/shrink. Primary buttons glow; secondary/ghost recede.

**Transparency & blur.** Sticky chrome uses `--glass` (saturate + blur) over `rgba(7,9,12,0.6–0.72)`. Scrims for text-on-image; tints (ember at 6–12%) for soft fills.

**Imagery vibe.** Warm/cool cinematic contrast — cool blue-black shadow, warm gold highlight. Human always present and central. Subtle grain, high contrast, low key. Black-and-amber, never saturated full-colour.

---

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) — thin-line (1.5 stroke), architectural, geometric. It matches the reference icons exactly (brain, database, gear, code `</>`, cpu). Loaded from CDN: `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`, then `lucide.createIcons()`. Used inline as `<i data-lucide="brain"></i>`.
- **Brand-signature glyphs:** `brain`, `database`, `settings-2`, `code-xml`, `cpu`, `share-2`, `waypoints`, `activity`, `target`, `zap`, `circuit-board`, `scan-eye`, `git-branch`, `user-round`, `orbit`, `layers`.
- **Colour & sizing:** icons render in `--ember-300` inside ink wells, or `--text-muted` for inert/secondary. 18–24px in UI; never filled, never multi-colour.
- **Emoji:** never used in the system. Unicode `×` appears only inside the lockup.
- **No hand-drawn SVG icons.** The only bespoke vector is the **logomark** (`assets/logo/ripperdoc-mark.svg`) — a thin ring framing a neural cluster with a warm spark core. It uses `currentColor` for the ring/links so it adapts to any surface.
- **Substitution flag:** Lucide is a substitute icon library (no brand-owned set was supplied). If you have a proprietary icon set, drop the SVGs into `assets/` and document them here.

---

## LOGO & IDENTITY — "Human First. Intelligence Amplified."

The mark is **a human node, amplified**. Read it in three parts:
- **The warm core** = human capability — first, central, always lit (the only fixed-colour element; a warm gradient `--grad-spark`).
- **The rising arcs** = augmentation — capability extending outward and *brightening* as it grows. The upward sweep reads as rising/enhancement, deliberately **not** a static broadcast/wifi glyph.
- **The terminal nodes** = connected systems — the intelligence the human reaches and amplifies.

It is intentionally **not a brain and not an eye** — it depicts the *act of amplification*, not artificial intelligence itself. Files in `assets/logo/`:
- `ripperdoc-mark.svg` — primary mark. Arcs/nodes use `currentColor` (adapt to any surface); core stays warm.
- `ripperdoc-badge.svg` — mark contained in the ring (app icon / avatar / stamp).
- `ripperdoc-mark-mono.svg` — single-colour version (solid core) for ≤18px, 1-colour print, embroidery.

**Clear space:** one core-node diameter on all sides. **Min size:** 20px (mark), 28px (badge); below that use the mono mark. **Don't:** recolour to non-brand hues, rotate, stretch, or add shadows/outlines. Specimen cards: `guidelines/brand-logo.html`, `guidelines/brand-logo-construction.html`.

## RECURRING MOTIFS — the graphic language

A graphic system grown from the mark (`guidelines/brand-motifs.html`, assets in `assets/motifs/`):
- **Augmentation arc** (`augmentation-arc.svg`) — the hero graphic device: large rising arcs from a node, for corners, dividers, backgrounds.
- **Node lattice** (`node-lattice.svg`) — a static connected constellation, the structural form of the neural field.
- **Signal** — a connection line with a travelling spark pulse (CSS `bk-sig`/`sig` keyframes).
- **Ring** — the circular framing device (badge, avatars, focal frames).
- **Spark** (`--grad-spark`) — the focal light, behind a single point of insight.
- **Horizon** (`--grad-horizon`) — cool sky into warm gold; the climb.

## ILLUSTRATION — the neural field

The brand's recognizable signature is the **neural field**: generative node networks rendered on `<canvas>` (`assets/js/neural-field.js`). It is geometric and procedural — *not* stock AI art, robots, or glowing-circuit clichés. Drop a canvas and it paints one static frame immediately (so it survives capture / reduced-motion) and animates where allowed:

```html
<canvas data-neural-field data-sparks="3" data-density="0.00012"></canvas>
<script src="assets/js/neural-field.js"></script>
```

In React, call `window.RipperdocNeuralField(canvasEl)` after the canvas mounts (see `ui_kits/atlas/screens.jsx → NeuralPanel`).

---

## INDEX — what's in this repository

**Foundations**
- `styles.css` — the single entry point consumers link. `@import`s only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `motion.css`, `base.css`.
- `guidelines/*.html` — foundation specimen cards (the Design System tab). Colors, Type, Spacing, Brand groups.

**Assets** (`assets/`)
- `logo/` — `ripperdoc-mark.svg` (primary), `ripperdoc-badge.svg` (contained), `ripperdoc-mark-mono.svg` (1-colour).
- `motifs/` — `augmentation-arc.svg`, `node-lattice.svg` (reusable graphic devices).
- `img/` — the three reference photographs (portrait-neural, summit-network, manifesto).
- `js/neural-field.js` — the generative neural-field renderer.

**Brand book** — `brand-book.html` (root): the flagship scrollable identity document (idea, manifesto, mark, colour, type, motifs, illustration, photography, motion, voice). Start here.

**Guideline cards** (`guidelines/*.html`, shown in the Design System tab) — Colours, Type, Spacing, Motion, and **Brand**: principles, logo system, logo construction, graphic motifs, illustration system, photography direction, iconography (set + principles).

**Components** (`components/`) — `window.RipperdocDesignSystem_cbf3c1.<Name>`
- `core/` — **Button**, **IconButton**, **Badge**, **Avatar**
- `forms/` — **Input**, **Switch**
- `surfaces/` — **Card**
- `data/` — **StatCard**, **CapabilityMeter**
- `navigation/` — **Tabs**

Each directory has `<Name>.jsx` + `<Name>.d.ts` + `<Name>.prompt.md` and a `*.card.html` demo.

**UI kits** (`ui_kits/`)
- `site/index.html` — marketing landing (hero, manifesto, three pillars, CTA). Static, brand showcase.
- `atlas/` — **Atlas**, the augmentation console: `Sidebar.jsx`, `Topbar.jsx`, `screens.jsx` (Overview + Agents), `index.html` (interactive nav).

**Slides** (`slides/`) — presentation specimens at 1280×720: `slide-title`, `slide-pillars`, `slide-quote`, `slide-stat`.

**Skill** — `SKILL.md` makes this folder portable as an Agent Skill.

---

## Notes & open items

- **Fonts** load from Google Fonts CDN (`Geist`, `Geist Mono`) via `tokens/fonts.css`. For production, self-host the binaries and swap the `@import` for `@font-face` rules. *(Flagged for the user.)*
- **Icons** use Lucide (CDN) as a substitute set. *(Flagged for the user.)*
- The **logo** is a designed proposal expressing "Human First. Intelligence Amplified." — see the exploration rationale in `brand-book.html` §03. Happy to iterate on arc count, sweep, or a contained-only variant.
