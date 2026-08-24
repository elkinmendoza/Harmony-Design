# Next Experiment — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **NextExperiment** (desktop), **MobileNextExperiment** (mobile)

---

## Overview

The Next Experiment component is a dark-background CTA section at the end of experiment/article detail pages. It displays a header, the next experiment's title with a link, and an oversized drag slider banner. It encourages continued browsing.

**Surfaces:** Website, Mobile app

---

## 1. NextExperiment (Desktop)

### Purpose
End-of-article CTA with three zones: a header bar, a title/link section, and a drag-enabled oversized text slider with image flickering.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Next experiment title |
| `imageUrl` | `string` | required | Next experiment image |
| `slug` | `string` | required | URL slug for navigation |
| `sliderItems` | `SliderItem[]?` | — | Optional slider content |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Background | `color.background.inverse` | `--color-background-inverse` | `neutral.900` |
| Text primary | `color.content.inverse` | `--color-content-inverse` | `neutral.50` |
| Text secondary | `color.content.secondary` | — | 90% opacity white |
| Text muted | `color.content.tertiary` | — | 60% opacity white |
| Border | `color.border.subtle` | — | 10% opacity white |
| Padding X | `space.lg` | `--space-lg` | 24px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Header label | `--font-sans` (Space Grotesk) | 14px | 400 | 21px | 0.35px |
| "Next project" | `--font-sans` (Space Grotesk) | 48px | 400 | 60px | 0 |
| Title link | `--font-sans` (Space Grotesk) | 40px | 600 | 60px | -1px |
| Slider text | `--font-display` (Clash Grotesk) | 280px | 700 | 280px | -14px |

### Layout

```
┌────────────────────────────────────────────────────────────┐
│  bg-inverse (dark)                                          │
│ ┌──────────────────────────────────────────────────────────┐│
│ │  (EM® — Experiment 02)                  ↗ Read more     ││ h-[70px]
│ ├──────────────────────────────────────────────────────────┤│ border-b 10%
│ │  Next project                                            ││
│ │  CREATIVE PHOTOGRAPHY PORTFOLIO SHOWCASE →               ││ h-[156px]
│ ├──────────────────────────────────────────────────────────┤│
│ │ ← DRAG SLIDER WITH OVERSIZED TEXT + FLICKERING IMAGES → ││ h-[344px]
│ │   [SEND] [img][img] [A MESSAGE] [SEND] [img] ...        ││
│ │   text-[280px] · font-display                           ││
│ └──────────────────────────────────────────────────────────┘│
│  Image: w-[240px] h-[180px]                                 │
└────────────────────────────────────────────────────────────┘
```

- Header: `h-[70px]`, `pb-[25px] pt-[24px] px-6`
- Title: `h-[156px]`, `pb-[32px] pt-20 px-6`
- Slider: `h-[344px]`, `pb-16 px-6 gap-4`
- Image: `h-[180px] w-[240px]`
- SVG arrow icon: 24×24, stroke-width 2

### Animation

- GSAP drag with momentum (decay 0.92, velocity × 1.2)
- Image flickering every 4000ms
- Infinite loop with content duplication
- 100ms init delay

### States

| State | Behaviour |
|-------|-----------|
| Default | Auto-scrolling slider |
| Hover (link) | `opacity: 0.8` |
| Dragging | User controls slider position |

---

## 2. MobileNextExperiment

### Purpose
Mobile version with scaled-down dimensions and typography.

### Prop Contract

Same as desktop.

### Typography (differences)

| Element | Size | Line Height | Letter Spacing |
|---------|------|-------------|----------------|
| Header | 12px | 18px | 0.35px |
| "Next project" | 28px | 33.6px | 0 |
| Title link | 18px | 23.4px | -0.3px |
| Slider text | 160px | 140.8px | -8px |

### Layout (differences)

- Header: `h-[55px]`, `px-5 py-[18px]`
- Title: `pt-8 px-5 gap-3`
- Slider: `h-[198px]`, `pb-6 gap-3`
- Image: `h-[116px] w-[90px]`
- Arrow icon: `size-7` (28px)

---

## Cross-Framework Prop Shape

```typescript
type SliderItem = string | string[];

interface NextExperimentProps {
  title: string;
  imageUrl: string;
  slug: string;
  sliderItems?: SliderItem[];
}

interface MobileNextExperimentProps {
  title: string;
  imageUrl: string;
  slug: string;
  sliderItems?: SliderItem[];
}
```

## Token Dependencies

- `color.background.inverse`
- `color.content.*` — inverse, secondary, tertiary
- `color.border.subtle`
- `space.*` — lg, xl, 4xl
- `font.family.*` — display, sans
- `heading.*` — 9xl, xl, lg, sm, xs
- `text.*` — sm, xs
