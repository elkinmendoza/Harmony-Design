# Navigation — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **Header**, **MobileNav**

---

## Overview

Navigation components provide consistent site-wide wayfinding. The desktop Header is a fixed-top bar with scroll-based hide/show behaviour. The MobileNav uses a fullscreen dark overlay with oversized Clash Grotesk nav links.

**Surfaces:** Website, Mobile app, Dashboard

---

## 1. Header (Desktop)

### Purpose
Fixed-top navigation bar with logo, bio excerpt, and nav links. Auto-hides on scroll down, reappears on scroll up after a 1.2s timeout.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No external props (self-contained) |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Background | `color.background.primary` | `--color-background-primary` | `neutral.50` (light) |
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Text hover | `color.content.secondary` | `--color-content-secondary` | `neutral.600` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.sm` | `--space-sm` | 8px |
| Max width | — | — | 1440px |
| z-index | — | — | 50 |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Logo | SVG image | 189 × 25px | — | — | — |
| Bio text | `--font-sans` (Space Grotesk) | `--text-xs-size` (12px) | 400 | 14px | 0 |
| Nav links | `--font-sans` (Space Grotesk) | `--text-md-size` (16px) | 600 | 24px | 0 |

### Layout

```
┌─────────────────────────────────────────────────────┐
│ [Logo]  [Bio excerpt ...]     [About] [Work] [Play] │
│ max-w-[1440px] · mx-auto · px-6 · py-2             │
└─────────────────────────────────────────────────────┘
```

- Fixed position: `top-0 left-0 right-0`
- Container: `max-w-[1440px] mx-auto`
- Hidden on mobile: `hidden md:block`
- Flexbox: `flex items-center justify-between`

### States

| State | Behaviour |
|-------|-----------|
| Default | Visible at top, white bg |
| Scrolled down | Translates up (`-translate-y-full`) over 300ms |
| Scrolled up | Translates back (`translate-y-0`) after 1.2s idle |
| Nav hover | `color.content.secondary` transition |

### Animation

- CSS transition: `transition-transform duration-300`
- Scroll listener with 1.2s timeout before show

### Accessibility

- Semantic `<nav>` element
- Links use `<a>` with descriptive labels
- Keyboard-navigable with tab order
- Focus-visible outlines on nav links

---

## 2. MobileNav

### Purpose
Mobile-only fullscreen navigation overlay. Hamburger trigger reveals a dark overlay (`bg-inverse`) with oversized nav links (Clash Grotesk Bold 48px), rotating profile images, bio caption, and a white CTA button.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | No external props (self-contained) |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Header bg | `color.background.primary` | `--color-background-primary` | `neutral.50` |
| Overlay bg | `color.background.inverse` | `--color-background-inverse` | `neutral.900` |
| Header text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Overlay text | `color.content.inverse` | `--color-content-inverse` | `neutral.50` |
| Secondary text | `color.content.secondary` | `--color-content-secondary` | `neutral.600` |
| CTA bg | `color.background.primary` | `--color-background-primary` | `neutral.50` |
| CTA text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| CTA radius | `radius.lg` | `--radius-lg` | 12px |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.sm` | `--space-sm` | 8px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Logo | `--font-sans` (Space Grotesk) | 20px | 700 | 25px | -0.5px |
| Menu button | `--font-sans` (Space Grotesk) | 16px | 600 | 24px | 0 |
| Nav items | `--font-display` (Clash Grotesk) | 48px | 700 | 52px | -1px |
| Close button | `--font-sans` (Space Grotesk) | 16px | 600 | 24px | 0 |
| Bio caption | `--font-sans` (Space Grotesk) | 6px | 300 | 10px | 0 |
| CTA label | `--font-sans` (Space Grotesk) | 16px | 600 | 24px | 0 |

### Layout

**Closed state:**
```
┌──────────────────────────────────┐
│ [Logo]                   [Menu]  │
│ fixed · px-6 · py-3             │
└──────────────────────────────────┘
```

**Open state:**
```
┌──────────────────────────────────┐
│ [Logo]                  [Close]  │ px-8 · py-4
├──────────────────────────────────┤
│ About                            │
│ Work                             │ px-8 · py-2
│ Playground                       │
├──────────────────────────────────┤
│ [Rotating profile image]         │ px-6 · pb-3
├──────────────────────────────────┤
│ [   START A PROJECT   ]          │ px-6 · pb-6
└──────────────────────────────────┘
```

- Full viewport: `h-dvh w-full`
- z-index header: 50, overlay: 60
- Visible on mobile only: `md:hidden`

### States

| State | Behaviour |
|-------|-----------|
| Closed | Compact header bar with logo + menu |
| Open | Fullscreen dark overlay, menu items visible |
| Scroll hidden | Header auto-hides on scroll (300ms) |
| Image rotation | Profile images cycle every 2000ms with opacity transition |

### Animation

- Header: `transition-transform duration-300`
- Image flicker: 2000ms interval with `transition-opacity duration-500`

### Accessibility

- Button trigger with clear label ("Menu" / "Close")
- Focus trap within open overlay
- Escape key closes menu
- Touch target ≥ 44pt for nav items
- `prefers-reduced-motion`: skip image rotation

---

## Cross-Framework Prop Shape

```typescript
// Identical across React / Vue / React Native
interface HeaderProps {
  // Self-contained — no external props needed
}

interface MobileNavProps {
  // Self-contained — no external props needed
}
```

## Token Dependencies

- `color.background.*` — primary, inverse
- `color.content.*` — primary, secondary, inverse
- `space.*` — sm, md, lg, xl
- `radius.lg`
- `font.family.*` — display, sans
- `heading.xl`, `heading.xs`
- `text.*` — xs, sm, md
