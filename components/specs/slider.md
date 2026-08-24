# Slider & Marquee — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **AutoScrollSlider**, **DualDirectionSlider**, **InteractiveDragSlider**, **SkillsMarquee**

---

## Overview

Slider and marquee components provide kinetic typography and media elements that scroll continuously or respond to user drag. They use oversized Clash Grotesk Bold text (160–280px) interspersed with flickering images. These components add editorial energy and movement to the design.

**Surfaces:** Website

---

## 1. AutoScrollSlider

### Purpose
Continuously scrolling horizontal banner with text items and optional image arrays that flicker between sources. Supports drag interaction to override auto-scroll.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BannerItem[]` | required | Array of text strings or image arrays |
| `imageFlickerInterval` | `number?` | `4000` | Image swap interval in ms |
| `speed` | `number?` | `20` | Auto-scroll duration in seconds |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text (even) | `color.content.secondary` | `--color-content-secondary` | `neutral.600` |
| Text (odd) | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Bg (odd) | `color.background.tertiary` | `--color-background-tertiary` | `neutral.200` |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |
| Gap | `space.sm` | `--space-sm` | 8px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Text | `--font-display` (Clash Grotesk) | 160px | 700 | 142px | -1px |

### Layout

```
← ──── AUTO-SCROLL DIRECTION ──── →
┌────────────────────────────────────────────────────────────────┐
│  SEND  [img][img]  A MESSAGE  SEND  [img][img]  A MESSAGE ... │
│  ────────────────  overflow-hidden  ────────────────────────── │
│                                                      py-18    │
└────────────────────────────────────────────────────────────────┘
```

- Overflow hidden container
- Duplicated items for seamless infinite loop
- Image size: `320 × 320px`
- `select-none` prevents text selection

### Animation

- **Engine:** GSAP
- **Auto-scroll:** `x: 0 → -contentWidth`, duration configurable, `repeat: -1`, `ease: none`
- **Drag:** Mouse/touch drag with momentum decay
- **Image flicker:** Interval-based image swap (default 4000ms)

---

## 2. DualDirectionSlider

### Purpose
Two-row slider with rows scrolling in opposite directions. Top row scrolls left, bottom row scrolls right. Supports gradient text effect on the first character of certain words.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gradientImageUrl` | `string?` | — | Background image for gradient text effect |
| `words` | `SliderWord[]?` | — | Array of word objects with optional gradient flag |
| `duration` | `number?` | `44` | Scroll duration in seconds |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |
| Gap rows | `space.sm` | `--space-sm` | 8px (gap-3 = 12px) |
| Gap items | `space.lg` | `--space-lg` | 24px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Text | `--font-display` (Clash Grotesk) | 256px | 700 | 192px | -1px |
| Gradient text | `--font-display` (Clash Grotesk) | 256px | 700 | 192px | -1px |

### Layout

```
← ───── TOP ROW (scrolls left) ───── →
┌────────────────────────────────────────────────────────────┐
│  THINK  PROJECT  DESIGN  CREATE  THINK  PROJECT  DESIGN   │
│  ────────────────────────────────────────────────────────── │
│  CREATE  DESIGN  PROJECT  THINK  CREATE  DESIGN  PROJECT   │
│  ────────────────────────────────────────────────────────── │
└────────────────────────────────────────────────────────────┘
→ ───── BOTTOM ROW (scrolls right) ───── ←
```

- Two overflow-hidden rows in `flex flex-col gap-3`
- Each row: `flex gap-6` with duplicated content
- Gradient text: `bg-clip-text text-transparent bg-cover bg-center`

### Animation

- **Engine:** GSAP
- **Top row:** `x: 0 → -topWidth`, duration 44s, `repeat: -1`, `ease: none`
- **Bottom row:** `x: -bottomWidth → 0`, duration 44s, `repeat: -1`, `ease: none`

---

## 3. InteractiveDragSlider

### Purpose
Advanced drag-enabled slider with auto-scroll, momentum physics, and image flickering. The primary banner component used throughout the portfolio for CTA sections ("SEND A MESSAGE").

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BannerItem[]` | required | Array of text strings or image arrays |
| `imageFlickerInterval` | `number?` | `4000` | Image swap interval in ms |
| `disableInfiniteLoop` | `boolean?` | `false` | Disable infinite loop |
| `autoScrollSpeed` | `number?` | — | Override base scroll velocity |
| `imageObjectPosition` | `string?` | `"top"` | CSS object-position for images |
| `gap` | `string?` | `"gap-x-2"` | Gap class between items |

### Token Usage

Same as AutoScrollSlider.

### Typography

Same as AutoScrollSlider (160px Clash Grotesk Bold).

### Physics

| Parameter | Value | Description |
|-----------|-------|-------------|
| Base velocity | -0.6 px/frame | Default auto-scroll speed |
| Momentum multiplier | 1.2× | Applied to drag velocity |
| Decay factor | 0.92 | Per-frame velocity reduction |
| Velocity threshold | 0.05 | Stop threshold |

### Animation

- **Auto-scroll:** Continuous velocity-based animation via `requestAnimationFrame`
- **Drag:** Mouse/touch interaction overrides velocity
- **Momentum:** Release continues with decaying velocity
- **Recovery:** Velocity eases back to base speed after momentum
- **Viewport:** Pauses when out of viewport (IntersectionObserver)
- **Image flicker:** Interval-based swap between image sources

### States

| State | Behaviour |
|-------|-----------|
| Auto-scrolling | Continuous left movement at base velocity |
| Dragging | User controls position, auto-scroll paused |
| Momentum | Decaying velocity after drag release |
| Recovery | Velocity returning to base speed |
| Out of viewport | Animation paused |

---

## 4. SkillsMarquee (within HomeProjects)

### Purpose
Two-row infinite-scrolling marquee displaying skill tags in oversized display text. Top row scrolls left, bottom row scrolls right. Alternating background on odd items.

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Skill text | `--font-display` (Clash Grotesk) | 160px | 700 | 142px | -1px |

### Colors

- Even items: `#d2d2d2` text (mapped to `color.content.secondary`)
- Odd items: `#1e1e1e` text on `#d2d2d2` background

### Animation

- GSAP timeline: 120s duration per direction, infinite repeat

---

## Shared Types

```typescript
type BannerItem = string | { src: string; objectPosition?: string }[];

interface SliderWord {
  text: string;
  gradient?: boolean;
}
```

## Cross-Framework Prop Shape

```typescript
interface AutoScrollSliderProps {
  items: BannerItem[];
  imageFlickerInterval?: number;
  speed?: number;
}

interface DualDirectionSliderProps {
  gradientImageUrl?: string;
  words?: SliderWord[];
  duration?: number;
}

interface InteractiveDragSliderProps {
  items: BannerItem[];
  imageFlickerInterval?: number;
  disableInfiniteLoop?: boolean;
  autoScrollSpeed?: number;
  imageObjectPosition?: string;
  gap?: string;
}
```

## Accessibility

- `select-none` prevents accidental text selection during drag
- Reduced motion: disable auto-scroll, show static items
- Image flicker: disable under `prefers-reduced-motion`
- Touch interaction uses passive listeners where possible

## Token Dependencies

- `color.content.*` — primary, secondary
- `color.background.tertiary`
- `space.*` — sm, lg, 4xl
- `font.family.display`
- `heading.9xl`
