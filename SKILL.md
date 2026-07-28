---
name: harmony-design-system
description: >-
  Instructs the Figma AI model generation chat on how to design, generate, and
  translate the "Harmony" design system into a cross-framework UI library
  (Vue.js, React.js, React Native). Use this skill for any task involving
  Harmony components, tokens, screens, or design-to-code output.
version: 0.1.0
targets:
  - vue
  - react
  - react-native
---

# Harmony Design System — Skill

> **DERIVED ARTIFACT — do not hand-edit out of band.** This skill is regenerated
> from `docs/DESIGN.md` (§2–4), `docs/FIGMA-CONFIG.md` (§1–3), and `.devin/rules/`
> via `.devin/workflows/design-language-sync.md` §5a. Change those sources, then
> regenerate this file and copy it into the Figma Make project guidelines.

> **Before designing, load `CONTEXT.md`** (the retrieval router) to fetch the right
> context, `docs/DESIGN.md` for the brand/design-language foundation (why Harmony
> looks the way it does), and `docs/FIGMA-CONFIG.md` for the canonical Figma
> structure (variable collections, modes, scopes, Code Connect). This skill governs
> *how to design*; those files govern *what already exists* and *why*, so you reuse
> and stay on-brand instead of reinventing.

## 1. Purpose

Harmony is a single source of truth in Figma that powers a **multi-framework UI
library**: **Vue.js**, **React.js**, and **React Native**. Every design decision
must translate cleanly into shared design tokens and framework-agnostic
component contracts, so that one Figma component maps predictably to three code
implementations.

When generating or editing designs, always assume the output will be consumed by
Code Connect and turned into production components. Prefer structure, naming, and
tokens that survive design-to-code.

## 2. Brand & Style Principles

Harmony carries the **EM Mendoza brand** — it must feel **stylish, unique, and
editorial**, never a generic component kit. The baseline aesthetic is **clean,
innovative, and self-intuitive**, inspired directly by the EM Mendoza portfolio
(`2026-ultimate-portfolio`).

- **Clean** — generous whitespace, restrained palettes, clear hierarchy, no
  decorative noise. Every element earns its place.
- **Innovative** — modern layouts, confident type scale, subtle motion-ready
  affordances, forward-looking but never trend-fragile.
- **Self-intuitive** — affordances are obvious. Users should never guess. Labels,
  states, and interaction patterns communicate function without instruction.

### What Harmony must impress with

1. **Big, characterful titles** — oversized display type is the hero, echoing the
   portfolio's edge-hugging headlines.
2. **Organised, rhythmic layouts** — clear grids, generous spacing, structured
   hierarchy; nothing floats without intent.
3. **Readable, usable body** — paragraphs are calm, high-contrast, easy to scan;
   usability is never sacrificed for style.
4. **Stylish by default** — every component looks considered and premium.

### Typography (from the EM Mendoza portfolio)

| Role | Family | Usage |
| --- | --- | --- |
| Display / big titles | **Clash Grotesk** (Bold) | hero headlines, section titles |
| UI / labels | **Space Grotesk** (400/600/700) | buttons, nav, captions, UI chrome |
| Body / long-form | **Roboto** (400/500/700) | paragraphs, descriptions, tables |

Map these to `--font-display`, `--font-sans`, and `--font-body`.

Design rules of thumb:

- Favor systematic spacing (4/8pt grid) over arbitrary values.
- Maintain WCAG AA contrast minimum (AAA for body text where feasible).
- Every interactive component ships all states: `default`, `hover`, `focus`,
  `active`, `disabled`, `loading`, and `error` where relevant.
- Design mobile-first, then scale up to tablet and desktop breakpoints.

## 3. Target Audience & Verticals

Harmony targets organisations that lead with a strong visual voice, and must flex
across them without a rebuild — theming, not redesign. Keep the core neutral and
let tokens/themes express each vertical:

- **Tech / fintech** — trust, precision, data density, confident modern edge.
- **Creative & event** — vivid, expressive, hierarchy driven by titles/dates/CTAs.
- **Council & public sector** — accessible, organised, legible at scale.
- **Artistic & cultural public organisations** — bold, gallery-like, expressive.
- **Clothing / online e-commerce** — product-first, editorial, conversion-focused.
- **Blogs & content businesses** — readability, long-form typography, calm reading.
- **Digital agencies** — showcase-driven, expressive layouts, portfolio grids.

The common thread: **big titles, organised layouts, effortless readability**.
Each vertical is a **theme** (token overrides + optional component variants), not
a separate design system.

### Product surfaces

Every component is authored to work across three surfaces, adding variants where a
surface demands different density or interaction:

- **Website** — marketing/editorial pages, big titles, media-rich sections.
- **Mobile apps** — React Native parity, touch-first, compact density.
- **Dashboards / utilities** — data-dense, tables, controls, status/feedback.

### Media components (first-class)

Video is a core citizen of Harmony, not an afterthought. Design these explicitly:

- **Video player / background video** — poster, autoplay-muted, controls,
  captions, reduced-motion fallback to a static poster.
- **Media hero** — big title over a video/image backdrop with a readable overlay.
- **Gallery / carousel** — mixed image + video, keyboard + touch accessible.

All media components must respect `prefers-reduced-motion` and ship an accessible
poster/alt fallback.

## 4. Design Token Architecture

Tokens are the contract between Figma and code. Author them in Figma Variables and
mirror them in code. Use a three-tier model:

1. **Primitive tokens** — raw values (`color.blue.500`, `space.4`, `font.size.16`).
2. **Semantic tokens** — intent-based aliases (`color.background.primary`,
   `color.content.primary`, `color.border.subtle`, `space.inset.md`).
3. **Component tokens** — component-scoped (`button.primary.bg`, `card.shadow`).

Naming conventions (align with code generation):

- Colors → CSS custom properties `--color-{name}` (e.g. `--color-content-primary`).
- Spacing → `--space-{name}` (e.g. `--space-md`).
- Typography → `--text-{variant}-{property}` / `--heading-{variant}-{property}`.
- Font families → `--font-{name}`.
- Component tokens → `--{component}-{property}`.

Rules:

- Never hardcode a raw hex/size in a component when a semantic token exists.
- Themes override **semantic** tokens, never primitives at the component level.
- Support light and dark modes via semantic token sets from day one.

## 5. Component Contract (design-to-code)

Every Harmony component in Figma must be a **component set** with clearly named
properties that map 1:1 to code props.

- Use boolean, variant, and instance-swap properties intentionally — they become
  props (`variant`, `size`, `disabled`, `leadingIcon`, etc.).
- Property names must be `camelCase` and framework-neutral.
- Variant options must be lowercase, stable strings (`primary`, `secondary`,
  `ghost`; `sm`, `md`, `lg`).
- Keep the component tree shallow and semantic; name layers by role
  (`container`, `label`, `icon-leading`) not by visual (`Rectangle 12`).
- Add a component description documenting purpose, props, and usage guidance.
- Prepare components for **Code Connect** so each maps to its Vue/React/RN source.

### Cross-framework mapping expectations

| Figma property | Vue | React | React Native |
| --- | --- | --- | --- |
| `variant` | prop `variant` | prop `variant` | prop `variant` |
| `size` | prop `size` | prop `size` | prop `size` |
| boolean `disabled` | prop `disabled` | prop `disabled` | prop `disabled` |
| instance-swap `icon` | slot / prop | children / prop | prop |

Component APIs must be identical in shape across the three frameworks. Only the
implementation differs (e.g. React Native uses `StyleSheet`/tokens instead of CSS
variables; web uses CSS custom properties + the project's styling layer).

## 6. Foundations Checklist

Before building components, ensure these foundations exist in Figma as variables:

- Color scales + semantic roles (background, content, border, feedback).
- Type scale (display, heading levels, body, caption) with line-height and
  letter-spacing tokens.
- Spacing scale (4/8pt), radius scale, elevation/shadow scale.
- Breakpoints and grid definitions.
- Iconography style + sizing tokens.
- Motion tokens (duration, easing) for future animation.

## 7. Accessibility Requirements

- Minimum WCAG AA contrast; verify with the contrast tooling.
- Focus states must be visible and distinct on every interactive element.
- Provide alt/label guidance in component descriptions.
- Touch targets ≥ 44×44pt (React Native / mobile web).
- Do not rely on color alone to convey state; pair with icon/text.

## 8. Working Rules for the Figma AI Chat

When asked to design or generate:

1. Confirm the **target vertical/theme** and **framework(s)** if not stated.
2. Reuse existing Harmony tokens and components before creating new ones.
3. Build as component sets with proper variant/prop naming (Section 5).
4. Include all interaction states (Section 2).
5. Keep layers named semantically and auto-layout everything.
6. Note any new tokens introduced so they can be reflected in code.
7. Prepare output for Code Connect mapping across Vue/React/React Native.

When in doubt, optimize for **consistency and clean translation to code** over
one-off visual flourish.
