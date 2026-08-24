# Values Section — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **SelectedWorkCaptions**

---

## Overview

The Values Section (SelectedWorkCaptions) presents work philosophy and values in a dark-background two-column layout. A headline sits on the left; value items with titles and descriptions are listed on the right.

**Surfaces:** Website

---

## SelectedWorkCaptions

### Purpose
Dark-background section displaying work philosophy values. Left column has the headline; right column lists titled value items with descriptions.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained; uses WORK_PHILOSOPHY constant |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Background | `color.background.inverse` | `--color-background-inverse` | `neutral.900` |
| Text primary | `color.content.inverse` | `--color-content-inverse` | `neutral.50` |
| Text secondary | `color.content.secondary` | `--color-content-secondary` | `neutral.600` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Headline | `--font-sans` (Space Grotesk) | 20px | 600 | 28px | 0 |
| Subtext | `--font-sans` (Space Grotesk) | 20px | 400 | 28px | 0 |
| Value title | `--font-sans` (Space Grotesk) | 20px | 600 | 28px | 0 |
| Value desc | `--font-sans` (Space Grotesk) | 20px | 400 | 28px | 0 |

### Layout

```
┌─────────────────────────────────────────────────────────┐
│  bg-inverse (dark)                                       │
│                                                          │
│  (EMendoza® —)          User-First, Always               │
│  HOW I WORK             Every decision starts with...    │
│                                                          │
│  w-[342px]              Ship Fast, Iterate Faster        │
│                         Perfect is the enemy of done...  │
│                                                          │
│                         Code is Communication            │
│                         Write code that humans...        │
│                                                          │
│                         Design + Engineering = Magic     │
│                         The best products happen...      │
│                                                          │
│                              max-w-[1440px] · px-6      │
└─────────────────────────────────────────────────────────┘
```

- Left column: `md:w-[342px]`
- Right column: `flex-[1_0_0]`
- Mobile: column layout
- Desktop gaps: `md:gap-x-12 lg:gap-x-24 xl:gap-x-[359px]`
- Value gap: `gap-6 md:gap-[56px]`
- Item gap: `gap-2 md:gap-3`
- Item padding: `px-2 md:px-[56px]`

### Data Shape

```typescript
interface ValueItem {
  title: string;
  description: string;
}
```

### Accessibility

- Uses semantic heading hierarchy
- High contrast: light text on dark background
- Sufficient line height for readability

## Cross-Framework Prop Shape

```typescript
interface SelectedWorkCaptionsProps {}
```

## Token Dependencies

- `color.background.inverse`
- `color.content.*` — inverse, secondary
- `space.*` — sm, md, lg, xl, 2xl, 4xl
- `font.family.sans`
- `heading.xs`
