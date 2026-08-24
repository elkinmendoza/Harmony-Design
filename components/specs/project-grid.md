# Project Grid — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **HomeProjects** (staggered grid + marquee), **ProjectThumbnail** (card)

---

## Overview

The Project Grid displays project thumbnails in a staggered 2-column grid on a dark background with parallax scroll effects. Below the grid, an infinite-scrolling skills marquee adds kinetic energy. Each thumbnail is a media card with gradient overlay, title, category, and year.

**Surfaces:** Website

---

## 1. HomeProjects (Grid Section)

### Purpose
Dark-background section displaying project thumbnails in a 2-column staggered grid with parallax scroll, followed by a two-row infinite-scrolling skills marquee.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained; uses PROJECTS constant |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Background | `color.background.inverse` | `--color-background-inverse` | `neutral.900` |
| Text | `color.content.inverse` | `--color-content-inverse` | `neutral.50` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.5xl` | `--space-5xl` | 96px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Project title | `--font-sans` (Space Grotesk) | 40px | 700 | 1.1 | 0 |
| Metadata | `--font-sans` (Space Grotesk) | 12px | 500 | auto | 0 |
| Skills marquee | `--font-display` (Clash Grotesk) | 160px | 700 | 142px | -1px |

### Layout

```
┌─────────────────────────────────────────────────────────┐
│ bg-inverse (dark)                                        │
│                                                          │
│  ┌──────────┐                    ┌──────────┐            │
│  │ Project 1│                    │ Project 2│ ← mt-125   │
│  │ 457×609  │   gap-x-226       │ 457×609  │            │
│  │          │                    │          │            │
│  └──────────┘                    └──────────┘            │
│                gap-y-125                                 │
│  ┌──────────┐                    ┌──────────┐            │
│  │ Project 3│                    │ Project 4│            │
│  └──────────┘                    └──────────┘            │
│                                                          │
│  ═══ SKILLS MARQUEE ═══════════════════════ ══════ → ←   │
│  ← ══════════════════════════════════════ MARQUEE ═══    │
│                                                          │
│                                        px-6 · py-24     │
└─────────────────────────────────────────────────────────┘
```

- Grid: `grid grid-cols-1 md:grid-cols-2`
- Grid gaps: `gap-x-[226px] gap-y-[125px]`
- Odd items offset: `md:mt-[125px]`
- Max thumbnail: `max-w-[457px] h-[609px]`
- Marquee: Two rows, opposite directions

### Animation

- **Project entrance (GSAP):** `opacity: 0 → 1`, stagger 0.2s
- **Parallax (ScrollTrigger):** Even items ±120px, odd items ±60px, `scrub: 1`
- **Image hover (CSS):** `scale(1.05)` over 700ms `ease-out`
- **Skills marquee (GSAP):** Top row scrolls left, bottom scrolls right, 120s loop, infinite

---

## 2. ProjectThumbnail (Card)

### Purpose
Individual project card with full-bleed background image, gradient overlay for text legibility, and metadata in corners.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string?` | — | Project name |
| `category` | `string?` | — | Project category (e.g. "WEBSITE") |
| `year` | `string?` | — | Year or year range |
| `imageUrl` | `string?` | — | Background image URL |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.inverse` | `--color-content-inverse` | `neutral.50` |
| Gradient overlay | — | — | `black/60 → transparent → black/60` |
| Padding outer | `space.xl` | `--space-xl` | 32px |
| Padding bottom | `space.lg` | `--space-lg` | 24px |

### Layout

```
┌────────────────────────────────┐
│  [Category]          [Year]    │ top · px-8
│                                │
│        [Background Image]      │ 457 × 609px
│                                │
│  PROJECT                       │
│  TITLE                         │ bottom · px-8 pb-6
└────────────────────────────────┘
```

- Gradient: `from-black/60 via-transparent via-45% to-black/60`
- Image: `object-cover` with hover scale 1.05
- Overflow hidden on container

### States

| State | Behaviour |
|-------|-----------|
| Default | Image with gradient overlay |
| Hover | Image scales 1.05 (700ms ease-out) |
| Active | Navigates to project detail |

### Accessibility

- Link wraps entire card
- Image has descriptive `alt`
- Text readable over gradient overlay (WCAG AA contrast)

---

## Skills Marquee Sub-component

### Purpose
Two-row infinite-scrolling marquee displaying skill tags in oversized Clash Grotesk. Rows scroll in opposite directions.

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Skill text (even) | `--font-display` | 160px | 700 | 142px | -1px |
| Skill text (odd) | `--font-display` | 160px | 700 | 142px | -1px |

### Colors

- Even items: `color.content.secondary` (`#d2d2d2`)
- Odd items: `color.content.primary` on `color.background.tertiary`

### Animation

- Top row: scrolls left, 120s duration, infinite loop
- Bottom row: scrolls right, 120s duration, infinite loop
- Gap: `gap-6` between items, `gap-3` between rows

---

## Cross-Framework Prop Shape

```typescript
interface HomeProjectsProps {}

interface ProjectThumbnailProps {
  title?: string;
  category?: string;
  year?: string;
  imageUrl?: string;
}
```

## Token Dependencies

- `color.background.inverse`, `color.content.inverse`, `color.content.secondary`
- `color.background.tertiary`
- `space.*` — sm, lg, xl, 2xl, 5xl
- `font.family.*` — display, sans
- `heading.9xl`
- `text.xs`
