---
name: harmony
description: >-
  Instructs the Figma AI model generation chat on how to design, generate, and
  translate the "Harmony" design system into a cross-framework UI library
  (Vue.js, React.js, React Native). Use this skill for any task involving
  Harmony components, tokens, screens, or design-to-code output.
version: 0.3.0
targets:
  - vue
  - react
  - react-native
---

# Harmony Design System — Skill

> **DERIVED ARTIFACT — do not hand-edit out of band.** This skill is regenerated
> from `docs/DESIGN.md` (§2–4), `docs/FIGMA-CONFIG.md` (§1–3), and `.devin/rules/`
> via `.devin/skills/design-language-sync/SKILL.md` §5a. Change those sources, then
> regenerate this file and copy it into the Figma Make project guidelines.

> **Before designing, load `CONTEXT.md`** (the retrieval router) to fetch the right
> context, `docs/DESIGN.md` for the brand/design-language foundation (why Harmony
> looks the way it does), and `docs/FIGMA-CONFIG.md` for the canonical Figma
> structure (variable collections, modes, scopes, Code Connect). This skill governs
> *how to design*; those files govern *what already exists* and *why*, so you reuse
> and stay on-brand instead of reinventing.

## 1. Purpose

Harmony is a **utility-first component design system** in Figma that powers a
multi-framework UI library: **Vue.js**, **React.js**, and **React Native**.

It is critical that Harmony provides **reusable utility components** that can be
shared across fundamentally different websites:

- **Photography / Videography websites** — gallery-heavy, lightbox, video players
- **Digital Agency websites** — expressive layouts, case studies, team sections
- **Fashion clothing e-commerce** — product cards, filters, cart, quick-view
- **Promotional landing pages for fashion design** — editorial, hero video, CTAs

Every design decision must translate cleanly into shared design tokens and
framework-agnostic component contracts, so that one Figma component maps
predictably to three code implementations.

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

### Microinteraction Principles (Aceternity UI inspired)

Every component must ship with documented microinteractions. Harmony takes
inspiration from [Aceternity UI](https://ui.aceternity.com/) motion patterns:

1. **Spring physics over linear** — all translations use spring easing
   (`damping: 25, stiffness: 300`) not linear/cubic-bezier where possible.
2. **Stagger children** — lists and grids reveal items with 50–80ms offset.
3. **Scroll-linked** — parallax, reveal, and progress tied to
   IntersectionObserver or scroll position.
4. **Cursor-aware** — magnetic pulls, tilt on hover, custom cursor states.
5. **Reduced motion** — all animations respect `prefers-reduced-motion: reduce`;
   design a static fallback for every animated state.

For each component, document in the description:
- **Trigger** (hover, click, scroll, focus, mount)
- **Animation** (transform, opacity, clip-path, spring physics)
- **Duration/easing** (spring params or cubic-bezier)
- **Reduced motion fallback**

## 3. Target Audience & Verticals

Harmony targets organisations that lead with a strong visual voice, and must flex
across them without a rebuild — theming, not redesign. Keep the core neutral and
let tokens/themes express each vertical:

- **Photography / Videography** — gallery grids, lightboxes, video players,
  portfolio presentation, parallax scroll effects.
- **Digital agencies** — showcase-driven, expressive layouts, portfolio grids,
  magnetic interactions, team member cards, testimonials.
- **Fashion / e-commerce** — product cards with quick-view, size selects, cart
  drawers, editorial lookbooks, promotional heroes with video.
- **Tech / fintech** — trust, precision, data density, confident modern edge.
- **Creative & event** — vivid, expressive, hierarchy driven by titles/dates/CTAs.
- **Council & public sector** — accessible, organised, legible at scale.
- **Artistic & cultural public organisations** — bold, gallery-like, expressive.
- **Blogs & content businesses** — readability, long-form typography, calm reading.

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

### 4.1 Brand Color Palette (6 primitive families)

Each family lives on a 50–950 scale. The `500` step is the anchor.

| Family | Role | 50 | 100 | 200 | 300 | 400 | **500** | 600 | 700 | 800 | 900 | 950 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Brand** | Primary CTA / emphasis (orange) | `#fff4e5` | `#ffeacc` | `#ffd599` | `#ffbf66` | `#ffaa33` | **`#ff9500`** | `#cc7700` | `#995900` | `#663c00` | `#331e00` | `#241500` |
| **Neutral** | Surfaces, text, borders (warm gray) | `#f8f7f5` | `#f0efed` | `#e2e0db` | `#c7c4bc` | `#a09c94` | **`#787470`** | `#545250` | `#3a3835` | `#252420` | `#161512` | `#0d0c0a` |
| **Green** | Success / positive status | `#edfaf3` | `#d4f3e4` | `#a5e6c6` | `#6dd4a3` | `#3dbd82` | **`#1a9e52`** | `#157f41` | `#0f6033` | `#0a4124` | `#052115` | `#02100a` |
| **Red** | Error / destructive status | `#fff0ee` | `#ffe0db` | `#ffbdb5` | `#ff9088` | `#ff5e55` | **`#e53e2a`** | `#c42e1c` | `#9b1f11` | `#6b1309` | `#3c0a04` | `#1e0502` |
| **Blue** | Info / links | `#edf4ff` | `#d6e7ff` | `#adcfff` | `#7ab3ff` | `#4d95ff` | **`#2d6bf4`** | `#1f54d4` | `#153ea8` | `#0d2a78` | `#061648` | `#030b24` |
| **Yellow** | Warning / attention | `#fffbe5` | `#fff6cc` | `#ffed99` | `#ffe266` | `#ffd633` | **`#f5c518`** | `#c49f13` | `#93770e` | `#624f09` | `#312805` | `#181402` |

### 4.2 Color Usage Rules

- **Brand orange `#ff9500`** — primary CTA, emphasis, active states only. Never as a background fill for large areas.
- **Neutral warm gray** — surfaces, text, borders, hierarchy. The workhorse palette.
- **Green / Red / Blue / Yellow** — status feedback ONLY via `status.{positive|negative|info|notice}`. Never decorative.
- **Interaction states** — every interactive role carries `hover` / `pressed` / `selected` / `disabled` (and `border.focus`); never hand-tweak a primitive per state.
- **Surface vs background** — `background.*` is the page/app canvas; `surface.*` (default/raised/sunken/overlay) is for elevated components (cards, menus, sheets).
- **Overlays** — `overlay.{scrim|backdrop|hover|pressed}` are alpha washes over neutral for modals/backdrops and pointer feedback.
- **Dark mode** — same semantic roles, inverted primitives; avoid pure black (`#000`). Use `neutral.950` (`#0d0c0a`) as darkest.

### 4.3 Semantic Color Roles (Light / Dark)

| Role | Light value | Dark value |
| --- | --- | --- |
| `background.primary` | neutral.50 | neutral.950 |
| `background.secondary` | neutral.100 | neutral.900 |
| `background.tertiary` | neutral.200 | neutral.800 |
| `background.inverse` | neutral.900 | neutral.50 |
| `background.brand` | brand.500 | brand.500 |
| `surface.default` | neutral.50 | neutral.900 |
| `surface.raised` | neutral.50 | neutral.800 |
| `surface.sunken` | neutral.100 | neutral.950 |
| `content.primary` | neutral.900 | neutral.50 |
| `content.secondary` | neutral.600 | neutral.300 |
| `content.tertiary` | neutral.500 | neutral.400 |
| `content.inverse` | neutral.50 | neutral.900 |
| `content.disabled` | neutral.400 | neutral.600 |
| `content.brand` | brand.600 | brand.400 |
| `border.subtle` | neutral.200 | neutral.800 |
| `border.default` | neutral.300 | neutral.700 |
| `border.strong` | neutral.400 | neutral.600 |
| `border.focus` | brand.500 | brand.400 |
| `status.positive` | green.500 | green.400 |
| `status.negative` | red.500 | red.400 |
| `status.notice` | yellow.500 | yellow.400 |
| `status.info` | blue.500 | blue.400 |
| `overlay.scrim` | neutral.950 @ 60% | neutral.950 @ 60% |
| `overlay.backdrop` | neutral.950 @ 40% | neutral.950 @ 40% |

### 4.4 Typography Scale (complete)

| Step | Token | Size | Line-height | Letter-spacing | Family | Usage |
| --- | --- | --- | --- | --- | --- | --- |
| **9xl** | `heading/9xl` | 192px (12rem) | 142px (8.875rem) | -0.03em | Clash Grotesk 700 | Signature oversized editorial title (max 1 per page) |
| display-2xl | `heading/display-2xl` | 96px (6rem) | 96px (6rem) | -0.03em | Clash Grotesk 700 | Full-width hero headlines |
| display-xl | `heading/display-xl` | 72px (4.5rem) | 72px (4.5rem) | -0.025em | Clash Grotesk 700 | Section openers |
| display-lg | `heading/display-lg` | 60px (3.75rem) | 64px (4rem) | -0.02em | Clash Grotesk 700 | Large feature titles |
| xl | `heading/xl` | 48px (3rem) | 52px (3.25rem) | -0.02em | Clash Grotesk 700 | Page titles |
| lg | `heading/lg` | 36px (2.25rem) | 40px (2.5rem) | -0.015em | Clash Grotesk 700 | Sub-section titles |
| md | `heading/md` | 30px (1.875rem) | 36px (2.25rem) | -0.01em | Clash Grotesk 700 | Card / panel headings |
| sm | `heading/sm` | 24px (1.5rem) | 32px (2rem) | -0.005em | Clash Grotesk 700 | Component headings |
| xs | `heading/xs` | 20px (1.25rem) | 28px (1.75rem) | 0em | Space Grotesk 600 | Small labels, eyebrows |
| text-xl | `text/xl` | 20px (1.25rem) | 30px (1.875rem) | 0em | Roboto 400 | Large body / intros |
| text-lg | `text/lg` | 18px (1.125rem) | 28px (1.75rem) | 0em | Roboto 400 | Standard body |
| **text-md** | `text/md` | **16px (1rem)** | **24px (1.5rem)** | 0em | Roboto 400 | **Default body** |
| text-sm | `text/sm` | 14px (0.875rem) | 20px (1.25rem) | 0em | Space Grotesk 400 | Captions, helper text |
| text-xs | `text/xs` | 12px (0.75rem) | 16px (1rem) | 0.01em | Space Grotesk 400 | Labels, badges |

Typography rules:
- Display can be oversized + tightly tracked; body stays calm and legible.
- Never mix more than one display family in a single composition.
- Font weights available: `regular` (400), `medium` (500), `semibold` (600), `bold` (700).

### 4.5 Spacing Scale (4pt ladder)

| Token | px | rem | Typical use |
| --- | --- | --- | --- |
| `space-none` | 0 | 0 | flush edges, reset |
| `space-xs` | 4 | 0.25 | icon-to-label, tight title lines |
| `space-sm` | 8 | 0.5 | label-to-value, chip inset-y |
| `space-md` | 16 | 1 | default element gap, card body |
| `space-lg` | 24 | 1.5 | container gutter, related-item gap |
| `space-xl` | 32 | 2 | card padding, group gap |
| `space-2xl` | 48 | 3 | column inner pad, body-block gap |
| `space-3xl` | 64 | 4 | section pad (mobile), large group gap |
| `space-4xl` | 72 | 4.5 | section pad (desktop standard) |
| `space-5xl` | 96 | 6 | section pad (hero / feature / dark) |

- Move in single steps; avoid arbitrary in-between values.
- Large vertical gaps between sections, tight gaps inside components.

### 4.6 Radius & Elevation

**Radius scale:**

| Token | Value | Usage |
| --- | --- | --- |
| `radius-none` | 0 | sharp edges |
| `radius-sm` | 4px (0.25rem) | controls, small inputs |
| `radius-md` | 8px (0.5rem) | buttons, inputs, badges |
| `radius-lg` | 12px (0.75rem) | cards, panels |
| `radius-xl` | 16px (1rem) | modals, large cards |
| `radius-full` | 9999px | pills, avatars, circular elements |

**Shadow scale:**

| Token | Value | Usage |
| --- | --- | --- |
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | subtle elevation |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)` | dropdowns, menus |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)` | modals, popovers |
| `shadow-card` | `0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)` | cards |

### 4.7 Layout & Grid

- **Grid:** 12-col, max content width **1440px**, centred.
- **Gutters:** `space-lg` (24px) desktop, `space-md` (16px) mobile.
- **Breakpoints:** 640 / 768 / 1024 / 1280 / 1536 — mobile-first.
- Full-bleed sections span viewport width; inner content respects 1440px container.

**Section rhythm (vertical):**
- Standard editorial: `space-3xl` (64) mobile → `space-4xl` (72) desktop.
- Hero / feature / dark: `space-5xl` (96) desktop, `space-3xl` (64) mobile.
- Section header → body gap: `space-4xl` (72).
- Adjacent blocks inside section: `space-2xl` (48) desktop → `space-lg` (24) mobile.

**Component spacing:**
- Cards / media tiles: inner padding `space-xl` (32).
- Dense list items: `space-2xl` (48) inset-x, `space-lg` (24) inset-y.
- Card grids: generous, editorial-stagger-friendly gutters.
- Buttons (CTA): `space-lg` (24) inset-x, `space-sm`–`space-md` inset-y.
- Body paragraph stacks: `space-lg` (24) mobile → `space-2xl` (48) desktop.

**Density per surface:**
- Website/editorial: generous, big titles, `space-4xl`/`space-5xl` sections.
- Dashboard/utility: compact, step down to `space-2xl`/`space-3xl`.
- Mobile app: touch-first, >= 44pt targets, `space-3xl` sections, `space-md` min gaps.

### 4.8 Iconography

- **Library:** **Material Design Icons** (`https://pictogrammers.com/library/mdi/`)
- **Style:** Filled by default for UI clarity; outline only when the component spec explicitly requires it
- **Sizing:** `24x24` default, `20x20` compact, `16x16` inline, `32x32` feature
- **Stroke / geometry:** use SVG as-is; do not modify path stroke or weight
- **Naming:** reference icons by MDI slug: `mdi-arrow-right`, `mdi-menu`, `mdi-close`, `mdi-chevron-down`, `mdi-magnify`, `mdi-account`, etc.
- **Figma workflow:** use the `ui/Icon` component set with `size` variants `sm(16)`, `md(20)`, `lg(24)`, `xl(32)` and swap the icon instance from the Material Design Icons library
- **Code export:** emit icon names as `mdi-{name}` for all three frameworks; web uses `@mdi/js` or `@mdi/react`, Vue uses `@mdi/vue`, React Native uses `@mdi/js` with an SVG renderer
- **Accessibility:** icon-only controls require an accessible name; decorative icons must have no semantic label

### 4.9 Motion & Interaction

- Default easing: `cubic-bezier(0.4, 0, 0.2, 1)` (~200ms micro, ~400ms reveal).
- Spring physics for components: `damping: 25, stiffness: 300`.
- Respect `prefers-reduced-motion` — always.
- **States progression:** default → hover → focus → active → disabled → loading → error.
- **Status feedback:** negative = red text + border + icon + message (never color alone);
  positive = green surface + icon; loading = skeleton/spinner, non-blocking.

### 4.10 Do NOT (constraints for AI agents)

- Do NOT invent hex/px/rem values — use tokens from the scales above.
- Do NOT use status colours (green/red/blue/yellow) decoratively — status roles only.
- Do NOT mix more than one display family or more than two weights per screen.
- Do NOT create a new variant when an existing one fits — extend, don't fork.
- Do NOT use pure black (`#000`) in dark mode; use neutral primitives.
- Do NOT ship interactive elements without focus/hover/disabled states.
- Do NOT all-caps body text, centre paragraphs > 2 lines, or leave lorem ipsum.
- Do NOT auto-play distracting motion or omit a reduced-motion fallback.

## 5. Component Architecture

Harmony organises components into **7 categories**. Each component is a Figma
component set with variants, all bound to Harmony tokens.

### 5.1 ui/ — Atomic Primitives

| Component | Props | Microinteraction |
| --- | --- | --- |
| **Button** | `variant`: primary/secondary/ghost/outline/link; `size`: sm/md/lg; `state`: default/hover/pressed/disabled/loading | Magnetic hover pull, scale(0.98) press, shimmer loading |
| **Link** | `variant`: default/underline/animated; `state`: default/hover | Underline slide-in from left, color transition 200ms |
| **Icon** | `size`: sm(16)/md(20)/lg(24)/xl(32) | Rotate on hover, scale bounce on click |
| **Badge** | `type`: default/subtle; `status`: positive/negative/warning/info/inverse | Pulse on status change, fade-in on mount |
| **Input** | `size`: sm/md/lg; `state`: default/focus/error/disabled | Label float animation, border morph, shake on error |
| **Select** | `state`: default/open/disabled; `size`: sm/md/lg | Dropdown slide+fade spring, option highlight sweep |
| **Modal** | `size`: sm/md/lg | Backdrop blur-in, content scale(0.95→1) spring, focus trap |
| **Drawer** | `position`: left/right/bottom | Slide-in spring physics, backdrop fade |
| **Tooltip** | `position`: top/right/bottom/left | Scale-in from origin with 50ms delay |

### 5.2 layout/ — Structural Primitives

| Component | Props | Notes |
| --- | --- | --- |
| **Container** | `size`: sm(640)/md(768)/lg(1024)/xl(1280)/full(1440) | Max-width wrapper with responsive padding |
| **Section** | `spacing`: compact/default/spacious; `bg`: transparent/surface/inverse | Full-width semantic section wrapper |
| **Grid** | `columns`: 2/3/4/auto-fit | Responsive CSS Grid with gap tokens |
| **Stack** | `direction`: vertical/horizontal; `gap`: xs–5xl | Flexbox with token-based spacing |
| **Cluster** | `gap`: xs–5xl; `justify`: start/center/end/between | Inline-flex wrapping cluster |
| **Divider** | `orientation`: horizontal/vertical; `variant`: subtle/default/strong | Animated draw-in line |

### 5.3 media/ — Visual Content

| Component | Props | Microinteraction |
| --- | --- | --- |
| **Media** | `type`: image/video; `aspect`: 1:1/4:3/16:9/3:4 | Skeleton shimmer on load, fade-in reveal |
| **Image** | `fit`: cover/contain; `radius`: none/md/lg/full | Parallax on scroll, zoom on hover (1.03) |
| **Video** | `autoplay`: true/false; `controls`: minimal/full/none | Play icon morph, progress bar glow |
| **MediaGallery** | `layout`: masonry/grid/slider | Stagger reveal on scroll, lightbox on click |
| **Lightbox** | `navigation`: arrows/dots/swipe | Backdrop blur, image scale spring, swipe physics |
| **Carousel** | `autoPlay`: true/false; `drag`: true/false | Momentum drag physics, parallax per-slide |
| **VideoPlayer** | `variant`: inline/fullscreen/background | Poster crossfade, control bar slide-up |

### 5.4 navigation/ — Wayfinding

| Component | Props | Microinteraction |
| --- | --- | --- |
| **Navbar** | `variant`: transparent/solid/blur; `sticky`: true/false | Hide on scroll-down, reveal on scroll-up, backdrop blur |
| **Menu** | `orientation`: horizontal/vertical | Link underline slide, active indicator morph |
| **MobileMenu** | `state`: open/closed | Fullscreen wipe, staggered link reveal |
| **Breadcrumbs** | `separator`: slash/chevron/dot | New crumb slide-in animation |
| **Pagination** | `variant`: numbered/dots/load-more | Active dot scale, page number morph |

### 5.5 content/ — Content Patterns

| Component | Props | Microinteraction |
| --- | --- | --- |
| **Card** | `variant`: elevated/outlined/filled; `size`: sm/md/lg | Hover lift 4px + shadow expand, tilt on cursor |
| **ProjectCard** | `size`: XS–XL; `orientation`: portrait/landscape | Overlay gradient reveal, title slide-up, image zoom |
| **ProductCard** | `variant`: minimal/detailed/quick-view; `badge`: sale/new/none | Quick-view expand, price crossfade, badge bounce |
| **ArticleCard** | `variant`: featured/standard/compact | Category badge pulse, image parallax |
| **Testimonial** | `variant`: quote/card/inline | Quote mark scale-in, avatar glow, typewriter text |
| **TeamMember** | `variant`: grid/list/featured | Photo grayscale→color on hover, socials stagger |

### 5.6 interaction/ — Motion & Microinteraction

| Component | Props | Microinteraction |
| --- | --- | --- |
| **Reveal** | `direction`: up/down/left/right; `type`: fade/slide/clip | IntersectionObserver, stagger 80ms, clip-path reveal |
| **Parallax** | `speed`: slow(0.05x)/medium(0.15x)/fast(0.3x); `direction`: vertical/horizontal | Scroll-linked GPU transform |
| **Magnetic** | `strength`: subtle(4px)/medium(8px)/strong(12px) | Cursor-following spring, snap-back on leave |
| **Marquee** | `direction`: left/right; `speed`: slow/medium/fast; `pauseOnHover`: true/false | Infinite scroll, smooth deceleration on hover |
| **Cursor** | `variant`: default(20px)/pointer(40px)/drag(56px)/expand(80px) | Lerp(0.15) follow, scale on interactive elements |
| **ScrollProgress** | `variant`: bar/circle/number | Scroll-linked width/stroke, color at thresholds |

### 5.7 forms/ — Data Collection

| Component | Props | Microinteraction |
| --- | --- | --- |
| **Form** | `layout`: stacked/inline/grid | Submit state machine, success confetti, error shake |
| **Input** | `type`: text/email/password/search; `size`: sm/md/lg | Label float, border morph, clear button fade-in |
| **Textarea** | `resize`: none/vertical/auto; `size`: sm/md/lg | Auto-grow height, character count fade |
| **Select** | `variant`: default/searchable/multi; `size`: sm/md/lg | Options spring, selected chip animate-in |
| **FileUpload** | `variant`: dropzone/button/inline | Drag-over pulse border, progress ring, preview scale |
| **Validation** | `type`: error/warning/success/info | Shake on error, checkmark draw, message slide-down |

### 5.8 Existing Figma Components (already built)

These components already exist in the Harmony Figma file and should be reused or
extended rather than recreated:

| Category | Existing Component | Figma Page | Map to |
| --- | --- | --- | --- |
| ui/ | `Badge` (14 variants) | 🔨 Tools | `ui/Badge` |
| navigation/ | `Header` | 🧭 Navigation | `navigation/Navbar` |
| navigation/ | `MobileNavOpen` + `MobileNavClosed` | 🧭 Navigation | `navigation/MobileMenu` |
| navigation/ | `Pagination` (2 variants) | 🧪 Experiment Card | `navigation/Pagination` |
| content/ | `ProjectCardXl` (5 sizes) + `ProjectCardLandscape` (5 sizes) | Grids & Cards | `content/ProjectCard` |
| content/ | `ArticleSections` | Grids & Cards | `content/ArticleCard` |
| media/ | `AutoScrollSlider`, `InteractiveDragSlider`, `DualDirectionSlider` | ➡ Sliders & Marquees | `media/Carousel` |
| interaction/ | `MarqueeText`, `SkillsMarquee` | 🔤 Display Text / 🖼 Project Grid | `interaction/Marquee` |
| interaction/ | `PageTransition` | 🌌 Transitions | `interaction/Reveal` |
| layout/ | `ImageGridTwo` | Grids & Cards | `layout/Grid` |
| layout/ | `Spacer` (15 sizes) | 🔨 Tools | `layout/Stack` (evolve) |

## 6. Component Contract (design-to-code)

Every Harmony component in Figma must be a **component set** with clearly named
properties that map 1:1 to code props.

- Use boolean, variant, and instance-swap properties intentionally — they become
  props (`variant`, `size`, `disabled`, `leadingIcon`, etc.).
- Property names must be `camelCase` and framework-neutral.
- Variant options must be lowercase, stable strings (`primary`, `secondary`,
  `ghost`; `sm`, `md`, `lg`).
- Keep the component tree shallow and semantic; name layers by role
  (`container`, `label`, `icon-leading`) not by visual (`Rectangle 12`).
- Add a component description documenting purpose, props, usage guidance, and
  **microinteraction spec** (trigger, animation, duration, reduced-motion fallback).
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

## 7. Foundations Checklist

Before building components, ensure these foundations exist in Figma as variables:

- Color scales + semantic roles (background, surface, overlay, content, border,
  status/status-surface), each with interaction states (hover/pressed/selected/disabled/focus).
- Type scale (display, heading levels, body, caption) with line-height and
  letter-spacing tokens.
- Spacing scale (4/8pt), radius scale, elevation/shadow scale.
- Breakpoints and grid definitions.
- Iconography style + sizing tokens.
- Motion tokens (duration, easing, spring params) for animations.

## 8. Accessibility Requirements

- Minimum WCAG AA contrast; verify with the contrast tooling.
- Focus states must be visible and distinct on every interactive element.
- Provide alt/label guidance in component descriptions.
- Touch targets >= 44x44pt (React Native / mobile web).
- Do not rely on color alone to convey state; pair with icon/text.
- All animations must have `prefers-reduced-motion` fallbacks.
- Focus trapping in modals/drawers/mobile menus.

## 9. Working Rules for the Figma AI Chat

When asked to design or generate:

1. Confirm the **target vertical/theme** and **framework(s)** if not stated.
2. Reuse existing Harmony tokens and components before creating new ones.
3. Build as component sets with proper variant/prop naming (Section 6).
4. Include all interaction states (Section 2) and microinteraction annotations.
5. Keep layers named semantically and auto-layout everything.
6. Note any new tokens introduced so they can be reflected in code.
7. Prepare output for Code Connect mapping across Vue/React/React Native.
8. Document the microinteraction in the component description (trigger, animation,
   duration/easing, reduced-motion fallback).
9. When building content components (ProductCard, Testimonial, etc.), design them
   generic enough to serve all four primary verticals (photography, agency,
   fashion ecommerce, promotional landing pages).
10. Bind all fills, strokes, spacing, and typography to Harmony variable tokens.

### Industry-specific usage guide

When designing for a specific vertical, combine components as follows:

| Vertical | Key component combinations |
| --- | --- |
| Photography / Videography | `media/MediaGallery` + `media/Lightbox` + `media/VideoPlayer` + `content/ProjectCard` + `interaction/Parallax` |
| Digital Agency | `interaction/Magnetic` + `interaction/Marquee` + `content/Card` + `content/TeamMember` + `interaction/Reveal` |
| Fashion Ecommerce | `content/ProductCard` + `layout/Grid` + `ui/Drawer` (cart) + `media/Carousel` + `ui/Select` (size/color) |
| Fashion Landing Page | `media/Video` (background) + `interaction/Reveal` + `media/Carousel` + `interaction/Parallax` + `ui/Modal` (newsletter) |

When in doubt, optimize for **consistency and clean translation to code** over
one-off visual flourish.
