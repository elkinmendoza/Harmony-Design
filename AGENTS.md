# Harmony Design System — Agentic Operating Guide

> **Read `CONTEXT.md` first, then this file.**
> `CONTEXT.md` is the retrieval router — it tells you *which* context to load for
> the task at hand. This file defines the workflows, rules, permissions, and
> practicalities for building the **Harmony Design System** from Figma specs into a
> Tailwind CSS foundation and a cross-framework component library
> (Vue.js / React.js / React Native).

### Context map (load in this order)
1. `CONTEXT.md` — routing table + source-of-truth precedence.
2. `docs/DESIGN.md` — the design-language foundation (brand, style guide, scope,
   business logic, look & feel). Upstream of tokens/rules; sets *why* things look
   the way they do. Changes here propagate via `.devin/workflows/design-language-sync.md`.
3. `.devin/rules/harmony-core.md` — always-on constraints (auto-applied by Devin).
4. The domain rule for your task: `tokens.md` · `figma-mcp.md` · `dependencies.md` · `accessibility.md`.
5. The matching `.devin/workflows/*.md` procedure.
6. `docs/FIGMA-CONFIG.md` for anything touching Figma structure or Code Connect.

---

## 0. Mission

Harmony exists to help the interface design & development community **reuse
design seamlessly from Figma specs**. Every artifact the agent produces must be:

- **Deterministic** — the same Figma spec always yields the same tokens/code.
- **Centralised** — one scaffold, one source of truth, no duplicated values.
- **Self-serve** — any designer or developer can adopt it without hand-holding.

The non-negotiable baseline: a **strong, centralised scaffold** where primitives
→ semantic tokens → component tokens flow in one direction only.

---

## 0.1 Target Audience & Brand Identity

Harmony is a signature system carrying the **EM Mendoza brand** — it must feel
**stylish, unique, and unmistakably editorial**, not a generic component kit.

### Who it's for

Harmony targets organisations that lead with a strong visual voice:

- **Tech / fintech** — products needing trust plus a confident, modern edge.
- **Creative & event** — expressive, promotional, hierarchy driven by titles/dates.
- **Council & public sector** — accessible, organised, legible at scale.
- **Artistic & cultural public organisations** — bold, gallery-like, expressive.

The common thread: **big titles, organised layouts, and effortless readability**
on products inspired by the EM Mendoza portfolio (`2026-ultimate-portfolio`).

### Design signature (what Harmony must impress with)

1. **Big, characterful titles** — oversized display type is the hero of the
   system, echoing the portfolio's edge-hugging headlines.
2. **Organised, rhythmic layouts** — clear grids, generous spacing, structured
   hierarchy; nothing floats without intent.
3. **Readable, usable body** — paragraphs are calm, high-contrast, and easy to
   scan; usability is never sacrificed for style.
4. **Stylish by default** — every component looks considered and premium; the
   baseline aesthetic is "clean, innovative, self-intuitive" with editorial flair.

### Typography reference (from the EM Mendoza portfolio)

| Role | Family | Usage |
| --- | --- | --- |
| Display / big titles | **Clash Grotesk** (Bold) | hero headlines, section titles |
| UI / labels | **Space Grotesk** (400/600/700) | buttons, nav, captions, UI chrome |
| Body / long-form | **Roboto** (400/500/700) | paragraphs, descriptions, tables |

Map these to `--font-display`, `--font-sans`, and `--font-body` semantic tokens.

### Surfaces Harmony must support

Components are authored to work across **three product surfaces**, with variants
where a surface demands different density or interaction:

- **Website** — marketing/editorial pages, big titles, media-rich sections.
- **Mobile apps** — React Native parity, touch-first, compact density.
- **Dashboards / utilities** — data-dense, tables, controls, status/feedback.

### Media components (first-class)

Harmony explicitly includes **media components** — video is a core citizen, not
an afterthought:

- **Video player / background video** — poster, autoplay-muted, controls,
  captions, reduced-motion fallback to a static poster.
- **Media hero** — big title + video/image backdrop with readable overlay.
- **Gallery / carousel** — image + video mixed, keyboard + touch accessible.

All media components must respect `prefers-reduced-motion` and ship an accessible
poster/alt fallback.

---

## 1. Source of Truth & Precedence

When values conflict, resolve in this order (highest wins):

1. **Figma Variables** pulled live via Figma MCP (`get_variable_defs`).
2. **`/tokens/primitives.json`** — the committed export of Figma primitives.
3. **`/tokens/semantic.json`** — intent-based aliases authored in this repo.
4. Anything hardcoded in code — **never** allowed as a source; treat as a bug.

The agent must **never invent color/spacing/type values**. If a needed token is
missing, stop and request it, or add it to the primitive/semantic layer first.

---

## 2. Canonical Color Palette (4–6 core families)

Harmony's palette is **6 primitive families**, each on a 50–950 scale, sourced
from `harmonyprimitiveColours.json`. The `500` step is the family anchor.

| Family | Role | Anchor (500) |
| --- | --- | --- |
| **Brand** | Primary brand / CTA (orange) | `#ff9500` |
| **Neutral** | Surfaces, text, borders (warm gray) | `#787470` |
| **Green** | Success / positive | `#1a9e52` |
| **Red** | Error / destructive | `#e53e2a` |
| **Blue** | Info / links | `#2d6bf4` |
| **Yellow** | Warning / attention | `#f5c518` |

Full scales live in `/tokens/primitives.json`. Do not alter primitive hex values
in code — they are owned by Figma.

---

## 3. Token Architecture (three tiers, one direction)

```
Figma Variables
      │  (export)
      ▼
1. PRIMITIVES   color.brand.500, space.4, font.size.16   (raw, immutable)
      │  (alias)
      ▼
2. SEMANTIC     color.background.primary, color.content.primary,
                color.border.subtle, color.feedback.error   (intent)
      │  (scope)
      ▼
3. COMPONENT    button.primary.bg, card.shadow, input.border  (component-local)
```

Rules:

- Components consume **semantic or component** tokens only — never primitives.
- Themes/verticals override **semantic** tokens, never primitives.
- Light + dark are two semantic token sets over the same primitives.

### Naming conventions (must match code generation)

| Kind | Pattern | Example |
| --- | --- | --- |
| Color | `--color-{name}` | `--color-content-primary` |
| Spacing | `--space-{name}` | `--space-md` |
| Radius | `--radius-{name}` | `--radius-lg` |
| Shadow | `--shadow-{name}` | `--shadow-card` |
| Font family | `--font-{name}` | `--font-sans` |
| Text size | `--text-{variant}-size` | `--text-l-regular-size` |
| Line height | `--text-{variant}-line-height` | `--text-l-regular-line-height` |
| Letter spacing | `--text-{variant}-letter-spacing` | `--text-l-regular-letter-spacing` |
| Heading | `--heading-{variant}-{prop}` | `--heading-9xl-bold-size` |
| Component | `--{component}-{property}` | `--button-primary-bg` |

---

## 4. Tailwind CSS Foundation (v4 `@theme`)

Harmony generates CSS foundations under **Tailwind CSS v4** using the `@theme`
directive. The generated file (`/foundations/theme.css`) is the bridge between
tokens and utility classes.

Generation rules:

1. Emit **primitives** as `--color-{family}-{step}` inside `@theme`.
2. Emit **semantic** tokens as `--color-{role}` referencing primitives via
   `var(...)` where the runtime allows, otherwise resolved hex per mode.
3. Provide light/dark via a `@media (prefers-color-scheme: dark)` block and a
   `[data-theme="dark"]` selector for manual toggling.
4. Every token in `@theme` must become a usable Tailwind utility
   (`bg-brand-500`, `text-content-primary`, `p-space-md`, `rounded-radius-lg`).

Skeleton the agent must follow:

```css
/* /foundations/theme.css — GENERATED. Do not edit by hand. */
@import "tailwindcss";

@theme {
  /* --- primitives: brand --- */
  --color-brand-50:  #fff4e5;
  --color-brand-500: #ff9500;
  --color-brand-950: #241500;
  /* ...neutral, green, red, blue, yellow (50–950) ... */

  /* --- semantic (light) --- */
  --color-background-primary: var(--color-neutral-50);
  --color-content-primary:    var(--color-neutral-900);
  --color-border-subtle:      var(--color-neutral-200);
  --color-feedback-error:     var(--color-red-500);
  --color-feedback-success:   var(--color-green-500);
  --color-feedback-info:      var(--color-blue-500);
  --color-feedback-warning:   var(--color-yellow-500);

  /* --- spacing / radius / typography scales --- */
  --space-xs: 0.25rem; --space-sm: 0.5rem; --space-md: 1rem;
  --space-lg: 1.5rem;  --space-xl: 2rem;
  --radius-sm: 0.25rem; --radius-md: 0.5rem; --radius-lg: 0.75rem;
}

@media (prefers-color-scheme: dark) {
  @theme { /* semantic dark overrides only */ }
}
```

---

## 5. Figma MCP Workflow (design-to-foundation)

Standard operating procedure whenever a spec arrives from Figma:

1. **Identify the node** — get file key + node id from the Figma URL.
2. `get_variable_defs` — pull variables for the node (colors, spacing, type).
3. **Reconcile** against `/tokens/primitives.json`; add missing primitives.
4. **Map** new values to semantic tokens (never leave raw values in components).
5. `get_design_context` — pull reference code + screenshot for structure.
6. **Generate** `/foundations/theme.css` and any changed `/tokens/*.json`.
7. **Build/adapt** components against semantic + component tokens only.
8. **Prepare Code Connect** so the Figma component maps to Vue/React/RN source.
9. **Verify** contrast (WCAG AA) and that every token yields a Tailwind utility.

Rules for MCP usage:

- Prefer `get_variable_defs` and `get_design_context` over guessing from images.
- Do not fabricate node ids; request a node-specific URL if missing.
- Treat MCP output as reference to **adapt**, not paste verbatim.

---

## 6. Repository Scaffold (centralised baseline)

```
Harmony/
├── CONTEXT.md                ← retrieval router (read FIRST)
├── AGENTS.md                 ← this file (agentic operating guide)
├── SKILL.md                  ← Figma AI / MCP design skill
├── .devin/
│   ├── rules/                ← auto-applied constraints
│   │   ├── harmony-core.md   ← always-on constitution
│   │   ├── tokens.md         ← token layer + naming
│   │   ├── figma-mcp.md      ← Figma read/write rules
│   │   ├── dependencies.md   ← stack/version rules
│   │   └── accessibility.md  ← a11y requirements
│   └── workflows/            ← repeatable procedures
│       ├── design-to-token.md
│       ├── component-build.md
│       ├── code-connect.md
│       ├── design-language-sync.md
│       └── docs-sync.md
├── tokens/
│   ├── primitives.json       ← exported Figma primitives (immutable source)
│   ├── semantic.json         ← intent aliases (authored here)
│   └── components.json       ← component-scoped tokens
├── foundations/
│   ├── theme.css             ← GENERATED Tailwind v4 @theme
│   └── reset.css             ← base/reset layer
├── components/               ← framework-agnostic specs + Code Connect
└── docs/
    ├── DESIGN.md             ← design-language foundation (brand, scope, look & feel)
    ├── README.md             ← usage, adoption, contribution
    └── FIGMA-CONFIG.md       ← canonical Figma structure + Code Connect
```

The agent maintains this structure; it must not scatter tokens or duplicate
foundations elsewhere.

---

## 7. Component Contract

- Author each component as a Figma **component set**; props map 1:1 to code.
- Property names `camelCase`; variant values lowercase stable strings
  (`primary`/`secondary`/`ghost`; `sm`/`md`/`lg`).
- Ship all states: `default`, `hover`, `focus`, `active`, `disabled`,
  `loading`, `error`.
- Identical prop shape across Vue / React / React Native; only implementation
  differs (web = CSS vars + Tailwind; RN = token objects / StyleSheet).
- Every component gets a description documenting purpose, props, and usage.

---

## 8. Permissions & Guardrails

**The agent MAY, autonomously:**

- Read Figma via MCP, read/parse token files, generate `foundations/theme.css`
  and derived token JSON, scaffold folders, write component specs and docs.

**The agent MUST ask / stop before:**

- Changing **primitive** values (owned by Figma) — export instead.
- Deleting tokens or components that are already published/consumed.
- Introducing a new color family beyond the 6 canonical ones.
- Renaming token conventions (breaks downstream code generation).
- Running destructive git operations or force-pushing.

**The agent MUST NEVER:**

- Hardcode raw hex/px in components when a token exists.
- Invent values not present in primitives/semantic layers.
- Bypass the primitive → semantic → component direction.

---

## 9. Definition of Done

A change is complete only when:

- [ ] All new values trace back to a primitive or semantic token.
- [ ] `foundations/theme.css` regenerated and every token has a Tailwind utility.
- [ ] Light and dark semantic sets both resolve.
- [ ] Contrast meets WCAG AA (AAA for body where feasible).
- [ ] Component props match across Vue/React/RN and Code Connect is prepared.
- [ ] Docs updated for any new token or component.
```
