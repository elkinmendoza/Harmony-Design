# Hero — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **HeroBanner**, **MediaHero** (article hero)

---

## Overview

Hero components establish the visual tone of a page. The HeroBanner is the signature portfolio entrance — a full-viewport typographic hero with oversized Clash Grotesk headlines and inline images. The MediaHero is used on detail pages for article/experiment titles.

**Surfaces:** Website, Mobile app

---

## 1. HeroBanner

### Purpose
Full-viewport hero section with an oversized typographic headline (Clash Grotesk Bold, scaling from 48px mobile to 178px desktop) interspersed with inline photos. The signature entrance of the EM Mendoza portfolio.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained; pulls from constants |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding bottom | `space.4xl` | `--space-4xl` | 72px |
| Gap (lines) | `space.sm` | `--space-sm` | 8px |
| Gap (words) | `space.xs` | `--space-xs` | 4px |

### Typography

| Element | Family | Size (responsive) | Weight | Line Height | Letter Spacing |
|---------|--------|-------------------|--------|-------------|----------------|
| Tagline | `--font-sans` (Space Grotesk) | 12→14→16px | 600 | 20→24px | 0 |
| Headline | `--font-display` (Clash Grotesk) | 48→52→80→112→178px | 700 | 40→44→60→78→118px | -1→-2→-4→-6px |

### Layout

```
┌─────────────────────────────────────────────────┐
│                                                 │
│                                   (full viewport│
│                                    height)      │
│                                                 │
│  INSPIRED BY DREAMS, BUILT FOR RESULTS          │ tagline
│  CRAFT [img] ING                                │
│  EXPER [img] IENCES                             │ headline
│  THAT  PER [img] FORM                           │
│                                         px-4→6  │
└─────────────────────────────────────────────────┘
```

- Full viewport: `h-dvh md:h-screen`
- Content: `flex flex-col items-center justify-end`
- Words wrap with `flex-wrap`
- Images inline between word halves

### Responsive Image Sizes

| Breakpoint | Width | Height |
|------------|-------|--------|
| base | 50px | 38px |
| sm (640) | 90px | 44px |
| md (768) | 120px | 60px |
| lg (1024) | 180px | 80px |
| xl (1280) | 248px | 115px |
| 2xl (1536) | 328px | — |

### States

| State | Behaviour |
|-------|-----------|
| Loading | Hidden (opacity: 0, y: 50) |
| Entered | GSAP stagger animation reveals each line |

### Animation

- **Engine:** GSAP
- **Target:** Each child of text container
- **From:** `{ y: 50, opacity: 0 }`
- **To:** `{ y: 0, opacity: 1 }`
- **Duration:** 1s
- **Stagger:** 0.2s
- **Ease:** `power3.out`

### Accessibility

- Images have `alt` text describing the photo
- Reduced motion: skip GSAP entrance, show immediately
- Semantic heading hierarchy (h1 for main headline)

---

## 2. MediaHero (Article/Experiment Hero)

### Purpose
Article detail page hero — displays the article title in large Clash Grotesk Bold, centered within a max-width container. Used on experiment detail pages.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | The article/experiment title |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Title (desktop) | `--font-display` (Clash Grotesk) | 72px | 700 | 80px | -1px |
| Title (mobile) | `--font-display` (Clash Grotesk) | 40→56px | 700 | 48→64px | -1px |

### Layout

```
┌─────────────────────────────────────────────────┐
│                                           py-18 │
│  LEVERAGING WEB DEVELOPMENT                     │
│  WITH AI TOOLS AND                              │ max-w-[1170px]
│  AUTOMATION                                     │
│                                           px-6  │
└─────────────────────────────────────────────────┘
```

- Max width: 1170px
- Flexbox: `flex flex-col`
- Text wraps with `whitespace-pre-wrap`

### States

| State | Behaviour |
|-------|-----------|
| Default | Static display |

### Accessibility

- Uses `<h1>` for article title
- Supports `wrap-break-word` for long titles

---

## 3. MobileHeroBanner

### Purpose
Mobile-optimised hero banner — simplified text layout without inline images. Displays "GET TO SEE SOME OF MY WORK" or similar tagline + headline.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained |

### Token Usage

Same as HeroBanner but with mobile-specific sizes.

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Tagline | `--font-body` (Roboto) | 12px | 400 | 16px | 0 |
| Headline | `--font-display` (Clash Grotesk) | 56px | 700 | 64px | -1px |

### Layout

```
┌──────────────────────────────┐
│                      tagline │ right-aligned
│  GET TO                      │
│  SEE SOME                    │ headline
│  OF MY                       │
│  WORK                        │
│                  pb-12 px-6  │
└──────────────────────────────┘
```

### Animation

- **Engine:** GSAP
- **From:** `{ y: 30, opacity: 0 }`
- **To:** `{ y: 0, opacity: 1 }`
- **Duration:** 1s, **Stagger:** 0.15s, **Ease:** `power3.out`

---

## Cross-Framework Prop Shape

```typescript
// HeroBanner — self-contained
interface HeroBannerProps {}

// MediaHero
interface MediaHeroProps {
  title: string;
}

// MobileHeroBanner — self-contained
interface MobileHeroBannerProps {}
```

## Token Dependencies

- `color.content.primary`
- `space.*` — xs, sm, lg, 4xl
- `font.family.*` — display, sans, body
- `heading.9xl`, `heading.display-xl`, `heading.lg`
- `text.md`, `text.xs`
