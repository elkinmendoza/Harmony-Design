# Experiment Card — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **HomeExperiments** (desktop), **MobileHomeExperiments** (mobile)

---

## Overview

The Experiment Card is an editorial feature component showcasing a highlighted experiment with an image plate, editorial quote, and keyword list. It uses a two-column layout on desktop (image left, content right) and stacks vertically on mobile.

**Surfaces:** Website, Mobile app

---

## 1. HomeExperiments (Desktop)

### Purpose
Two-column experiment showcase with a bordered image plate (left) containing gradient overlay and labels, and a content column (right) with title, metadata, quote, and categorised keywords.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained; uses constants |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Background | `color.background.primary` | `--color-background-primary` | `neutral.50` |
| Text primary | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Text secondary | `color.content.secondary` | `--color-content-secondary` | `neutral.600` |
| Accent (quotes) | `color.status.negative` | `--color-status-negative` | `red.500` |
| Border | `color.border.strong` | `--color-border-strong` | `neutral.400` |
| Label bg | `color.background.inverse` | `--color-background-inverse` | `neutral.900` |
| Label fg | `color.content.inverse` | `--color-content-inverse` | `neutral.50` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.xl` | `--space-xl` | 32px |
| Column gap | `space.2xl` | `--space-2xl` | 48px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Plate label | `--font-sans` (Space Grotesk) | 10px | 400 | 15px | 4px |
| Bottom labels | `--font-sans` (Space Grotesk) | 10px | 400 | 15px | 3.5px |
| Title | `--font-display` (Clash Grotesk) | 18px | 600 | 27px | -0.45px |
| Title italic | Instrument Serif | — | italic | — | — |
| Meta text | `--font-sans` (Space Grotesk) | 11px | 400 | 16.5px | 3.3px |
| Brief label | `--font-sans` (Space Grotesk) | 11px | 400 | 16.5px | 4.4px |
| Quote | `--font-display` (Clash Grotesk) | 39.6px | 600 | 43.5px | -0.99px |
| Quote marks | Instrument Serif | — | italic | — | — |
| Keyword number | Menlo (monospace) | 11px | 400 | 16.5px | 3.3px |
| Keyword label | `--font-display` (Clash Grotesk) | 20px | 600 | 30px | -0.5px |

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  ┌──────────────────────┐  ┌──────────────────────────────┐  │
│  │  [EXPERIMENT]        │  │  (EM® — Experiment 02) (AI)  │  │
│  │                      │  │  ── border-left accent        │  │
│  │  [Image with         │  │  Leveraging web dev with AI   │  │
│  │   gradient overlay]  │  │  06/15/24 · ELKIN MENDOZA     │  │
│  │                      │  │                               │  │
│  │  w-[419px]           │  │  ── BRIEF ──                  │  │
│  │                      │  │  "The future of web dev is    │  │
│  │  [EXPERIMENTS] [AI]  │  │   not about replacing devs"   │  │
│  └──────────────────────┘  │                               │  │
│                            │  ── keywords ──               │  │
│                            │  01  DESIGN    02  CODE       │  │
│                            │  03  PRODUCT   04  INNOVATE   │  │
│                            └──────────────────────────────┘  │
│  border-2 · gap-[56px] · px-6 · py-8                        │
└──────────────────────────────────────────────────────────────┘
```

- Left column: `min-w-[393px] w-[419.25px]`
- Right column: `flex-1`
- Gap: `56px`
- Border: `2px solid` (mapped to `color.border.strong`)
- Image gradient: `from-transparent to-rgba(14,14,16,0.65)`
- Label badge: top-left, `bg-inverse` text `fg-inverse`

### Special Visual Elements

- **Quote marks:** Instrument Serif italic in `color.status.negative` (`#ff4d1f`)
- **Border-left accent:** 2px left border on title section
- **Horizontal divider:** `h-px w-8` between sections
- **Keyword numbering:** Menlo monospace with `opacity: 0.6`
- **Gradient overlay:** Bottom fade on image plate

---

## 2. MobileHomeExperiments

### Purpose
Mobile version with vertically stacked layout, thicker border (3px), and scaled-down typography.

### Token Usage

Same as desktop with mobile-specific sizing.

### Typography (differences from desktop)

| Element | Size | Line Height | Letter Spacing |
|---------|------|-------------|----------------|
| Plate label | 9px | 14px | 3.5px |
| Title | 16px | 24px | -0.4px |
| Meta text | 10px | 15px | 3px |
| Quote | 22px | 25.3px | -0.6px |
| Keyword number | 10px | 15px | 3px |
| Keyword label | 18px | 26px | -0.45px |

### Layout

```
┌──────────────────────────────────┐
│  [EXPERIMENT]                │
│  ┌────────────────────────┐  │
│  │  [Image with gradient] │  │
│  │  h-[380px]             │  │
│  └────────────────────────┘  │
│  Title section + meta        │
│  ── BRIEF ──                 │
│  Quote text                  │
│  ── keywords ──              │
│  01 DESIGN  02 CODE          │
│  03 PRODUCT 04 INNOVATE      │
│                  px-4 py-18  │
│  border-3 solid              │
└──────────────────────────────────┘
```

- Stacked vertical layout
- Border: `3px solid`
- Card padding: `p-3`
- Image height: `380px`

---

## Cross-Framework Prop Shape

```typescript
interface HomeExperimentsProps {}
interface MobileHomeExperimentsProps {}
```

## Token Dependencies

- `color.background.*` — primary, inverse
- `color.content.*` — primary, secondary, inverse
- `color.status.negative` (accent quotes)
- `color.border.strong`
- `space.*` — xs, sm, md, lg, xl, 2xl
- `font.family.*` — display, sans
- `heading.*` — lg, xs
- `text.*` — xs
