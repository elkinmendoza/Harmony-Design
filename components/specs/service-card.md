# Service Card — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **ServiceItems** (desktop horizontal scroll), **MobileServiceItems** (mobile stacked)

---

## Overview

Service cards present offerings in a bordered card format with an oversized number, title, and description. On desktop they scroll horizontally (pinned via GSAP ScrollTrigger); on mobile they stack vertically.

**Surfaces:** Website, Mobile app

---

## 1. ServiceItems (Desktop)

### Purpose
Horizontally scrolling pinned section displaying service cards. An intro card explains the approach, followed by numbered service cards. Cards are bordered and scroll left as the user scrolls down.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained; uses SERVICES constant |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Background | `color.background.primary` | `--color-background-primary` | `neutral.50` |
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Border | `color.border.strong` | `--color-border-strong` | `neutral.400` |
| Padding X (card) | `space.3xl` | `--space-3xl` | 64px |
| Padding Y (card) | `space.lg` | `--space-lg` | 24px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Service number | `--font-display` (Clash Grotesk) | 120px | 700 | 112px | -1px |
| Service title | `--font-sans` (Space Grotesk) | 40px | 600 | 48px | -1px |
| Description | `--font-sans` (Space Grotesk) | 24px | 400 | 24px | -0.5px |
| Intro title | `--font-display` (Clash Grotesk) | 32px | 600 | 40px | -1px |
| Intro subtitle | `--font-sans` (Space Grotesk) | 24px | 400 | 24px | -0.5px |

### Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ┌──────────────┬──────────────┬──────────────┬──────────────┐           │
│ │   INTRO      │     1        │     2        │     3        │           │
│ │              │  FULL-STACK  │  AI INTEGR.  │  DESIGN SYS  │  →scroll  │
│ │  MY APPROACH │  PRODUCT DEV │  & AUTOMATION│  & UX | UI   │           │
│ │              │              │              │              │           │
│ │  Great prod. │  Build end.. │  Implement.. │  Create co.. │           │
│ │  w-[624px]   │  w-[624px]   │  w-[624px]   │  w-[624px]   │           │
│ └──────────────┴──────────────┴──────────────┴──────────────┘           │
│  h-[567px] · border-b-2 border-t-2 · will-change-transform             │
└──────────────────────────────────────────────────────────────────────────┘
```

- Track height: `567px`
- Card width: `85vw` mobile / `624px` desktop
- Horizontal flex: `flex items-start justify-start`
- Borders: `border-b-2 border-t-2` on track, `border-r-2` between cards
- Border colour: `#1e1e1e` (mapped to `color.border.strong`)

### Animation

- **Engine:** GSAP ScrollTrigger
- **Behaviour:** Horizontal scroll pinned to viewport
- **Animation:** `x: 0` → `x: -scrollAmount`
- **Config:** `scrub: 1`, `pin: true`, `anticipatePin: 1`, `invalidateOnRefresh: true`
- **End:** `+=${scrollAmount}`

### States

| State | Behaviour |
|-------|-----------|
| Default | Cards visible in scroll track |
| Scrolling | Cards translate left as user scrolls down |
| Pinned | Section pins to viewport during horizontal scroll |

### Accessibility

- Cards are semantic sections
- Keyboard scrollable
- `will-change-transform` for GPU acceleration
- Reduced motion: show all cards stacked instead

---

## 2. MobileServiceItems

### Purpose
Mobile version with vertically stacked service cards (same content, no horizontal scroll).

### Token Usage

Same as desktop, with `text-content-brand` (semantic CSS variable).

### Layout

```
┌──────────────────────────────┐
│ ┌──────────────────────────┐ │
│ │   INTRO CARD             │ │
│ │   h-[567px]              │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │   1                      │ │ border-b-2
│ │   FULL-STACK...          │ │ border-t-2
│ │   h-[567px]              │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │   2                      │ │
│ │   AI INTEGRATION...      │ │
│ │   h-[567px]              │ │
│ └──────────────────────────┘ │
│              px-6 · py-12   │
└──────────────────────────────┘
```

- Vertical: `flex flex-col`
- Card padding: `px-12 py-6`
- Description area: `h-[272px]`

---

## Service Item Data Shape

```typescript
interface ServiceItem {
  number: string;      // "1", "2", etc.
  title: string;       // "FULL-STACK PRODUCT DEVELOPMENT"
  description: string; // Service description
  isIntro?: boolean;   // True for the intro card
}
```

## Cross-Framework Prop Shape

```typescript
interface ServiceItemsProps {}
interface MobileServiceItemsProps {}
```

## Token Dependencies

- `color.background.primary`, `color.content.primary`
- `color.border.strong`
- `space.*` — sm, lg, xl, 2xl, 3xl, 4xl
- `font.family.*` — display, sans
- `heading.*` — display-2xl, lg, md, sm
- `text.*` — sm
