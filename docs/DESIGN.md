# Harmony — Design Language & Business Guide

> The human-readable **source of truth for why Harmony looks and behaves the way it
> does**. This is the *foundation* file: brand, design principles, style guide,
> business logic, scope, and objectives. It sits **upstream** of tokens, rules,
> workflows, and Figma — when this file changes, those downstream files must sync.
>
> - Agents behaviour → `AGENTS.md` + `.devin/rules/`
> - Figma AI design → `SKILL.md`
> - Figma structure → `docs/FIGMA-CONFIG.md`
> - Token values → `tokens/*.json` + `foundations/theme.css`
> - **When this file changes → run `.devin/workflows/design-language-sync.md`.**

---

## 1. Product design direction (purpose & business logic)

### Why Harmony exists
- Give the EM Mendoza brand a reusable, centralised system so design ships
  **seamlessly from Figma specs** into production code across three frameworks.
- Differentiator vs. Material / Ant / Tailwind UI: **editorial, big-title,
  brand-led** — stylish by default, not a neutral component library.
- Harmony is a stylish design system that prioritizes story-telling, softness, and elegance.
- Harmony focuses on great micro-interactions in ther component making it a strong
  choice for modern web and mobile applications.
- Success = consistency across surfaces, faster time-to-screen, one source of truth.
- Fully accessible for free, open source under MIT license.
- Fashion-forward and trend-aware, but never sacrificing usability or accessibility.

### Commercial goals
- Adoption targets: 50+ projects using Harmony components.
- Client deliverables: 100% design-to-code parity for all projects.
- Licensing: MIT open source for community adoption.

### Scope
- **In scope:** foundations (color, type, spacing, radius, elevation, motion),
  web components (Vue + React), React Native components, dashboard patterns,
  marketing/editorial pages, media components (video/gallery).
- **Out of scope (for now):** custom illustration system, 3D, print, native
  iOS/Android outside React Native.
- **Surfaces:** Website · Mobile app (React Native) · Dashboard / admin tools.

### Strategic principles
1. One source of truth in Figma; code mirrors it deterministically. 
2. Design once, ship to three frameworks with identical prop shapes.
3. Editorial and premium by default; data-dense when the surface demands it.

---

## 2. Brand identity

### Personality
Confident · editorial · calm · precise · expressive · elegant 

### Voice & tone
- **Voice (constant):** clear, considered, human — never corporate filler.
- **Tone (variable):** bold for creative/event, precise for fintech/dashboard,
  accessible for public sector.
- **Microcopy:** sentence case for labels/buttons; action-oriented CTAs; no
  exclamation marks in UI chrome.

### Target audience & verticals
Organisations that lead with a strong visual voice. Each vertical is a **theme**
(token overrides), not a separate system:

- Tech / fintech — trust + confident modern edge.
- Creative & event — expressive, title/date-driven.
- Council & public sector — accessible, legible at scale.
- Artistic & cultural — bold, gallery-like.
- Clothing / e-commerce — product-first, editorial, conversion-focused.
- Blogs & content — long-form readability.
- Digital agencies — showcase-driven portfolio grids.

Common thread: **big titles, organised layouts, effortless readability**.

---

## 3. Visual principles (look and feel)

1. **Big, characterful titles** — display type (Clash Grotesk) is the hero; nothing
   competes with the title for attention.
2. **Organised, rhythmic layouts** — 4/8pt grid, generous whitespace, consistent
   chrome; nothing floats without intent.
3. **Readable, usable body** — calm, high-contrast paragraphs; usability never
   sacrificed for style; body always passes WCAG AA.
4. **Stylish by default** — every component looks considered and premium; motion is
   subtle and purposeful.

---

## 4. Visual style guide

### Color usage
- **Brand orange `#ff9500`** — primary CTA, emphasis, active states.
- **Neutral warm gray** — surfaces, text, borders, hierarchy.
- **Green / Red / Blue / Yellow** — status only, via `status.{positive|negative|info|notice}`
  (green/red/blue/yellow); never decorative.
- **Interaction states** — every interactive role carries `hover` / `pressed` /
  `selected` / `disabled` (and `border.focus`); never hand-tweak a primitive per state.
- **Surface vs background** — `background.*` is the page/app canvas; `surface.*`
  (default/raised/sunken/overlay) is for elevated components (cards, menus, sheets).
- **Overlays** — `overlay.{scrim|backdrop|hover|pressed}` are alpha washes over a
  neutral primitive, for modals/backdrops and pointer feedback.
- **Dark mode** — same roles, inverted primitives; avoid pure black.

### Typography
| Step | Token | Size | Line-height | Family | Usage |
| --- | --- | --- | --- | --- | --- |
| **9xl** | `heading.9xl` | 192px | 142px (0.74×) | Clash Grotesk 700 | Signature oversized editorial title — portfolio hero |
| display-2xl | `heading.display-2xl` | 96px | 96px | Clash Grotesk 700 | Full-width hero headlines |
| display-xl | `heading.display-xl` | 72px | 72px | Clash Grotesk 700 | Section openers |
| display-lg | `heading.display-lg` | 60px | 64px | Clash Grotesk 700 | Large feature titles |
| xl | `heading.xl` | 48px | 52px | Clash Grotesk 700 | Page titles |
| lg | `heading.lg` | 36px | 40px | Clash Grotesk 700 | Sub-section titles |
| md | `heading.md` | 30px | 36px | Clash Grotesk 700 | Card / panel headings |
| sm | `heading.sm` | 24px | 32px | Clash Grotesk 700 | Component headings |
| xs | `heading.xs` | 20px | 28px | Space Grotesk 600 | Small labels, eyebrows |
| text-xl | `text.xl` | 20px | 30px | Roboto 400 | Large body / intros |
| text-lg | `text.lg` | 18px | 28px | Roboto 400 | Standard body |
| **text-md** | `text.md` | **16px** | **24px** | Roboto 400 | **Default body — matches portfolio baseline** |
| text-sm | `text.sm` | 14px | 20px | Space Grotesk 400 | Captions, helper text |
| text-xs | `text.xs` | 12px | 16px | Space Grotesk 400 | Labels, badges |

- `heading.9xl` mirrors the portfolio's `--heading-9xl-bold` (192px / 142px line-height). Use sparingly — one per page maximum.
- Display can be oversized + tightly tracked; body stays calm and legible.
- Never mix more than one display family in a single composition.

### Spacing & rhythm
- Base unit **4pt**; steps 8/16/24/32/48/64. Use `space-*` tokens — no arbitrary values.
- Large vertical gaps between sections, tight gaps inside components.

### Radius & elevation
- Small radius for controls, larger for cards; full radius for pills/badges/avatars.
- Shadows are functional (cards, dropdowns), not decorative.

### Iconography
Lucide, 1.5 stroke, 24x24 default / 20x20 compact

### Imagery & media
- Photography: high-contrast, editorial crops, human/product context.
- Video: autoplay-muted + poster fallback + `prefers-reduced-motion` fallback.
- Images: always have alt text, use lazy loading, and provide a fallback for accessibility.

---

## 5. Layout & spacing

> Rules below are **derived from the EM Mendoza portfolio** (`2026-ultimate-portfolio`)
> and normalised onto Harmony's 4pt token scale. Components consume **semantic
> space/radius tokens only** — the px anchors here are for orientation, never to be
> hardcoded (see §8).

### Spacing scale (the ladder)
Harmony spacing is a **4pt-based ladder**; every gap, pad, and margin snaps to a step.

| Token | px | Typical use |
| --- | --- | --- |
| `space-none` | 0 | flush edges, reset |
| `space-xs` | 4 | icon↔label, tight title lines |
| `space-sm` | 8 | label→value, chip inset-y |
| `space-md` | 16 | default element gap, card body |
| `space-lg` | 24 | container gutter, related-item gap |
| `space-xl` | 32 | card padding, group gap |
| `space-2xl` | 48 | column inner pad, body-block gap |
| `space-3xl` | 64 | section pad (mobile), large group gap |
| `space-4xl` | 72 | section pad (desktop standard) |
| `space-5xl` | 96 | section pad (hero / feature / dark) |

- **Do** move in single steps; avoid arbitrary in-between values (`py-[52px]`).
- **Don't** introduce a new raw value — add a step to `tokens/semantic.json` first.

### Grid & breakpoints
- 12-col grid, **max content width 1440px**, centred (`mx-auto`).
- **Gutters (horizontal page padding):** `space-lg` (24) desktop, `space-md` (16) mobile.
- Breakpoints: 640 / 768 / 1024 / 1280 / 1536; mobile-first, progressive enhancement.
- Full-bleed/background sections span viewport width; their **inner** content still
  respects the 1440px container and gutters.

### Section rhythm (vertical)
Sections are the primary unit of rhythm — spacing between them is what makes layouts
feel "organised and calm".

- **Standard editorial section:** `space-3xl` (64) mobile → `space-4xl` (72) desktop.
- **Hero / feature / inverted (dark) section:** `space-5xl` (96) desktop, `space-3xl`
  (64) mobile — extra breathing room to let big titles dominate.
- **Section header → body gap:** `space-4xl` (72) for editorial two-column layouts.
- **Adjacent blocks inside a section:** `space-2xl` (48) desktop → `space-lg` (24) mobile.
- One consistent vertical value per section top/bottom — never asymmetric by accident.

### Editorial two-column pattern
The portfolio's signature layout (numbered index + body):

- **Index / number column:** fixed ~`w-[69px]`, top-aligned, oversized Clash numeral.
- **Body column:** `max-w-[1170px]`, inner pad `space-none` mobile → `space-2xl`+ (≥48,
  up to 80) desktop; content is left-aligned and calm.
- Columns are pushed apart with space-between, not a fixed gap.

### Component spacing
- **Cards / media tiles:** inner padding `space-xl` (32); metadata/footer bar
  `space-xl` inset-x, `space-lg` (24) inset-y.
- **Dense list items / service cards:** `space-2xl` (48) inset-x, `space-lg` (24)
  inset-y; title→description gap `space-sm` (8).
- **Card grids:** generous, asymmetric-friendly gutters; columns may offset vertically
  for an editorial stagger, but gaps still snap to the ladder.
- **Dividers:** `border-subtle`, never raw gray; separate groups, don't box them in.

### Element spacing
- **Label → value / stacked meta:** `space-xs` (4) to `space-sm` (8).
- **Inline chips / tags:** `space-md` (16) inset-x, `space-sm` (8) inset-y, `radius-full`.
- **Buttons (CTA):** `space-lg` (24) inset-x, `space-md`–`space-sm` inset-y.
- **Tight display lines (multi-line titles):** `space-xs` (4) mobile → `space-sm` (8) up.
- **Body paragraph stacks:** `space-lg` (24) mobile → `space-2xl` (48) desktop.

### Page chrome
- Consistent top-left wordmark, page number, section eyebrow; single accent mark in footer.
- Dividers use `border-subtle`, never raw gray.

### Density per surface
- **Website/editorial:** generous, media-rich, big titles — favour `space-4xl`/`space-5xl`
  sections and `space-2xl` body gaps.
- **Dashboard/utility:** compact, data-dense — step section padding down to
  `space-2xl`/`space-3xl` and element gaps to `space-sm`/`space-md`.
- **Mobile app:** touch-first, ≥44pt targets — condense sections to `space-3xl`, keep
  element gaps at `space-md` minimum for tap comfort.

---

## 6. Components & interaction behaviour

- **States:** default → hover → focus → active → disabled → loading → error.
- **Motion:** default easing `cubic-bezier(0.4,0,0.2,1)`; ~200ms micro, ~400ms reveal;
  respect `prefers-reduced-motion`.
- **Status feedback:** negative = `content.negative` text + `border.negative` + icon +
  message (never colour alone); positive = `status-surface.positive` + icon;
  loading = skeleton/spinner, non-blocking. Roles: positive/negative/notice/info.

---

## 7. Accessibility

- Contrast: body text ≥ WCAG **AA** (4.5:1); target **AAA** where feasible.
- Every interactive element has a visible focus state and a ≥44pt touch target on mobile.
- Never signal state with color alone — pair with icon + text.
- Honour `prefers-reduced-motion`; media ships a poster/alt fallback.
- Full requirements live in `.devin/rules/accessibility.md` (this section is the *intent*).

---

## 8. Design tokens (reference — values live elsewhere)

Harmony's hard token **values are not stored in this file** — they flow one way and
live at their source. Author intent here; edit values there.

| Token group | Source of truth | Emitted as |
| --- | --- | --- |
| Primitive colours (hex) | Figma `Colour` → `tokens/primitives.json` | `--color-{family}-{step}` |
| Semantic colours (roles) | `tokens/semantic.json` (Light/Dark) | `--color-{role}` |
| Spacing / radius | `tokens/semantic.json` → Figma `Scale` | `--space-{name}`, `--radius-{name}` |
| Typography scale | `tokens/semantic.json` → Figma `Typography` | `--font-*`, `--text-*`, `--heading-*` |
| Generated utilities | `foundations/theme.css` (GENERATED) | Tailwind classes |

Anchors for orientation only (not authoritative): Brand `#ff9500`, base spacing unit
**4pt**, default easing `cubic-bezier(0.4,0,0.2,1)`. To change any value, edit the
source above and run `docs-sync` — never hardcode it here or in components.

---

## 9. Do not do (constraints)

AI tools tend to *add*. These constraints protect the product from drift:

- **Don't** invent hex/px/rem values or hardcode them in components — use tokens.
- **Don't** use status colours (green/red/blue/yellow) decoratively — status roles only.
- **Don't** mix more than one display family, or more than two weights, per screen.
- **Don't** create a new component variant when an existing one fits — extend, don't fork.
- **Don't** use pure black (`#000`) in dark mode; use neutral primitives.
- **Don't** ship interactive elements without focus/hover/disabled states.
- **Don't** all-caps body text, centre paragraphs > 2 lines, or leave lorem ipsum in mocks.
- **Don't** auto-play distracting motion or omit a reduced-motion fallback.
- **Don't** treat `/inspirations/` imagery as a token or value source.

---

## 10. Inspiration & references

- Portfolio reference file: `https://www.figma.com/design/TRUjofEwcRW6XLyxeL9Gxh/Personal-Portfolio-2026-Website`
- `/inspirations/` = mood reference only, never a token source.
- _(add other benchmarks.)_

---

## 11. Change propagation (how downstream files listen)

This file is **upstream**. A change here does not auto-update anything — it triggers
the sync procedure so the rest of the system stays truthful.

| If you change here… | Downstream that must sync | Via |
| --- | --- | --- |
| Palette role / new color intent | `tokens/semantic.json` → Figma `Semantic` → `theme.css` | `design-to-token` + `docs-sync` |
| Typography rule / scale | `tokens/semantic.json` (type scale) → Figma `Typography` → `theme.css` | `docs-sync` |
| Spacing / radius / elevation rule | `tokens/semantic.json` (scale) → Figma `Scale` → `theme.css` | `docs-sync` |
| Component behaviour / states / motion | `.devin/rules/accessibility.md`, `SKILL.md` §5, component specs | `component-build` |
| Brand voice / audience / scope | `AGENTS.md` §0.1, `SKILL.md` §2–3 | manual edit |
| Any principle affecting agents | `.devin/rules/harmony-core.md` (brand invariants) | manual edit |

**Always run `.devin/workflows/design-language-sync.md` after editing this file.**

## 12. Version & changelog
- v0.5.0 — split Figma typography variables into `Typography` and `Unit` primitive
  collections (`family`, `weight`, `line-height`, `letter-spacing`, and `size`) and
  re-aliased the entire `Semantic: Typography` collection to those primitives.
  Recorded the new primitives in `tokens/primitives.json` and updated the Figma
  collection map in `docs/FIGMA-CONFIG.md`.
- v0.4.0 — expanded semantic colour system: added interaction states
  (hover/pressed/selected/disabled/focus) across background/content/border, new
  `surface` and `overlay` groups, and status content/border roles. Renamed
  `feedback.*` → `status.{positive|negative|notice|info}` and `feedbackSurface` →
  `statusSurface` across `tokens/semantic.json`, `components.json`, Figma `Semantic`
  (23→55 vars), and `theme.css`.
- v0.3.0 — expanded §5 Layout & spacing with portfolio-derived rules for sections,
  components, and elements (spacing ladder, section rhythm, editorial two-column,
  component/element spacing, per-surface density). Added `space-4xl` (72px) and
  `space-5xl` (96px) steps → `tokens/semantic.json`, Figma `Scale`, and `theme.css`.
- v0.2.0 — restructured to the community DESIGN.md convention (added §7 Accessibility,
  §8 Design tokens reference, §9 Do not do); no value duplication.
- v0.1.0 — initial foundation (palette, typography, spacing, principles, scope).
