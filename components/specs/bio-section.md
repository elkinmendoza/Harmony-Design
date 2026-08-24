# Bio Section — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **BioSection** (desktop), **MobileBioSection** (mobile)

---

## Overview

The Bio Section is a signature identity component featuring a profile photo with vertical text labels, bordered frame, personal title, description, and stats. It establishes the personal brand with editorial styling — vertical labels, double borders, and oversized display typography.

**Surfaces:** Website, Mobile app

---

## 1. BioSection (Desktop)

### Purpose
Full-width bio section with a bordered profile photo on the left (with vertical rotating labels) and personal information on the right (name, title, description, stats).

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained; uses content constants |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Background | `color.background.primary` | `--color-background-primary` | `neutral.50` |
| Text primary | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Text secondary | `color.content.tertiary` | `--color-content-tertiary` | `neutral.500` |
| Text muted | `color.content.secondary` | `--color-content-secondary` | `neutral.600` |
| Border | `color.border.strong` | `--color-border-strong` | `neutral.400` |
| Border subtle | `color.border.subtle` | `--color-border-subtle` | `neutral.200` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |
| Gap sections | `space.5xl` | `--space-5xl` | 96px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Name label | `--font-sans` (Space Grotesk) | 11px | 400 | 16.5px | 5px |
| Title | `--font-display` (Clash Grotesk) | 54px | 700 | 55px | -1.5px |
| Title italic | Instrument Serif | — | italic | — | — |
| Description | `--font-sans` (Space Grotesk) | 15px | 400 | 26.25px | 0 |
| Stats number | `--font-display` (Clash Grotesk) | 32px | 700 | 32px | -1px |
| Stats label | `--font-sans` (Space Grotesk) | 11px | 400 | 16.5px | 2.5px |
| Vertical labels | `--font-sans` (Space Grotesk) | 13px | 600 | 13px | 3px |

### Layout

```
┌───────────────────────────────────────────────────────────────┐
│ ┌──┬────────────────────────┬──┐  ELKIN MENDOZA              │
│ │  │                        │  │  ──────────────              │
│ │I │                        │U │  CRAFTING digital            │
│ │n │   [Profile Photo]      │X │  Experiences & products      │
│ │t │   520 × 680px          │/ │  ──────────────              │
│ │e │                        │U │  │ Description paragraph...  │
│ │r │                        │I │  ──────────────              │
│ │a │                        │  │  5+        30+       ∞       │
│ │c │                        │D │  Years     Projects  Ideas   │
│ └──┴────────────────────────┴──┘                              │
│                                   max-w-[1024px] · px-6       │
└───────────────────────────────────────────────────────────────┘
```

- Photo column: `w-[520px] h-[680px]`
- Content column: `flex-[476.922_0_0]`
- Vertical labels rotated 180° then 90° on left/right borders
- Double borders: `border-b-2 border-t-2` on image frame
- Left/right label columns: `w-[28px] border-l-2 / border-r-2`

### Special Visual Elements

- **Vertical text labels:** Rotated text along left border ("Interactive", "Innovative", "Creative") and right border ("UX / UI Designer", "Product Full-Stack Engineer")
- **Double border frame:** 2px solid borders on top/bottom/left/right of photo
- **Border-left accent:** 2px border on description paragraph
- **Stats divider:** `border-t border-subtle` above stats row

### Animation

- **GSAP ScrollTrigger:**
  - Photo: `{ opacity: 0, x: -50 }` → `{ opacity: 1, x: 0 }` · 1s · `power3.out`
  - Content: `{ opacity: 0, x: 50 }` → `{ opacity: 1, x: 0 }` · 1s · `power3.out` · delay -0.5s

### Accessibility

- Profile image has descriptive `alt` text
- Stats use semantic markup
- Reduced motion: skip entrance animation

---

## 2. MobileBioSection

### Purpose
Mobile-optimised bio with vertically stacked photo and content. Smaller typography and tighter spacing.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained; uses content constants |

### Token Usage

Same semantic tokens as desktop, with mobile-specific sizes.

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Name label | `--font-sans` | 9px | 400 | 13.5px | 5px |
| Title | `--font-display` | 34px | 700 | 35px | -1px |
| Description | `--font-sans` | 13px | 400 | 22.75px | 0 |
| Stats number | `--font-display` | 28px | 700 | 28px | -1px |
| Stats label | `--font-sans` | 9px | 400 | 13.5px | 2.5px |
| Vertical labels | `--font-sans` | 9px | 600 | 13.5px | 2.5px |

### Layout

```
┌──────────────────────────────┐
│ ┌──┬──────────────────┬──┐   │
│ │  │  [Profile Photo]  │  │   │ h-[540px]
│ │  │                   │  │   │
│ └──┴──────────────────┴──┘   │
│  ELKIN MENDOZA                │
│  CRAFTING digital...          │
│  │ Description...             │
│  5+      30+      ∞          │
│  Years   Projects Ideas      │
│                    px-6      │
└──────────────────────────────┘
```

- Photo height: `540px`
- Content: `flex flex-col gap-7 px-6 py-12`
- Vertical label widths: `w-5` (left), `w-3.5` (right)

---

## Cross-Framework Prop Shape

```typescript
interface BioSectionProps {}
interface MobileBioSectionProps {}
```

## Token Dependencies

- `color.background.primary`, `color.content.*` — primary, secondary, tertiary
- `color.border.*` — strong, subtle
- `space.*` — sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
- `font.family.*` — display, sans
- `heading.*` — xl, md, sm
- `text.*` — xs, sm, lg
