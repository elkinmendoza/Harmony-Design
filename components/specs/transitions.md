# Transitions — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **PageTransition**, **Preloader**, **SmoothScroller**

---

## Overview

Transition components control page-level motion: initial load experience (Preloader), route-change animation (PageTransition), and global scroll behaviour (SmoothScroller). They set the premium, editorial feel of the system.

**Surfaces:** Website

---

## 1. PageTransition

### Purpose
Route-change transition with a dark curtain wipe effect. A curtain rises from the bottom, covers the viewport, then wipes upward to reveal new content that fades in from below.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Page content to wrap |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Curtain bg | `color.background.inverse` | `--color-background-inverse` | `neutral.900` |
| z-index | — | — | 100 |

### Animation Sequence

| Phase | Property | From | To | Duration | Ease |
|-------|----------|------|-----|----------|------|
| 1. Rise | `yPercent` | 100 | 0 | 0.7s | `expo.inOut` |
| 2. Wipe | `yPercent` | 0 | -100 | 0.9s | `expo.inOut` |
| 3. Content | `autoAlpha` | 0 | 1 | 0.5s | `power2.out` |
| 3. Content | `y` | 20 | 0 | 0.5s | `power2.out` |

### Layout

- Curtain: `fixed inset-0 z-100 pointer-events-none`
- Content wrapper: relative container
- `aria-hidden="true"` on curtain

### States

| State | Behaviour |
|-------|-----------|
| Idle | Curtain hidden below viewport |
| Transitioning | Curtain rises, wipes, content fades |
| Skipped | Internal project navigations skip transition |

### Accessibility

- `aria-hidden="true"` on curtain overlay
- `prefers-reduced-motion`: skip animation, show content immediately
- Clears `transform` and `will-change` after animation

---

## 2. Preloader

### Purpose
Initial page load animation with a logo mask that fills from left to right, a percentage counter, and a final panel wipe to reveal the page.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Background | `color.background.inverse` | `--color-background-inverse` | `neutral.900` |
| Logo fill | `color.content.inverse` | `--color-content-inverse` | `neutral.50` |
| Logo base | `color.content.tertiary` | `--color-content-tertiary` | `neutral.500` |
| Counter text | `color.content.inverse` | `--color-content-inverse` | `neutral.50` (60% opacity) |
| z-index | — | — | 9999 |
| Padding X | `space.lg` | `--space-lg` | 24px |

### Typography

| Element | Family | Size | Weight | Letter Spacing |
|---------|--------|------|--------|----------------|
| Counter | `--font-sans` (Space Grotesk) | 14px | 400 | `tracking-widest` |

### Layout

```
┌──────────────────────────────────────┐
│                                      │
│                                      │
│     ┌──────────────────────────┐     │
│     │  [Logo mask — fills →]   │     │ w-[min(82vw,900px)]
│     │  aspect: 1046/155        │     │ centered
│     └──────────────────────────┘     │
│                                      │
│                            42%       │ counter (bottom-right)
│  bg-inverse · fixed inset-0 z-9999  │
└──────────────────────────────────────┘
```

- Logo container: `w-[min(82vw,900px)]`, aspect `1046/155`
- CSS mask: `url(/logo-mask.svg)`, no-repeat, center, contain
- Logo base: `bg-[#4a4a4a]` (neutral.500)
- Logo fill: `bg-white` (content.inverse), animated width 0→100%
- Counter: absolute, `bottom-8 right-6 md:right-12`

### Animation Sequence

| Phase | Property | Value | Duration | Ease |
|-------|----------|-------|----------|------|
| 1. Logo fade in | `autoAlpha`, `y` | 0→1, 20→0 | 0.6s | `power2.out` |
| 2. Fill progress | width | 0→100% | 3.2s | `sine.inOut` |
| 2. Counter | text | 0→100 | 3.2s | `sine.inOut` |
| 3. Logo pulse | `scale` | 1→1.06→1 | 0.3s | `power2.out` |
| 4. Logo swell | `scale`, `autoAlpha` | 1→1.18, 1→0 | 0.85s | `power3.inOut` |
| 5. Panel wipe | `yPercent` | 0→-100 | 1s | `power4.inOut` |

### Accessibility

- `aria-hidden="true"` on entire preloader
- `prefers-reduced-motion`: skip to content immediately
- Logo mask is decorative (not semantic)

---

## 3. SmoothScroller

### Purpose
Lenis-powered smooth scrolling utility synced with GSAP's ticker. Not a visual component — returns null. Provides buttery-smooth scroll behaviour across the site.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained utility |

### Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| `lerp` | 0.1 | Scroll interpolation factor |
| `duration` | 1.2 | Scroll animation duration |
| `touchMultiplier` | 2 | Touch scroll sensitivity |
| `gestureOrientation` | `"vertical"` | Scroll direction |
| `anchorOffset` | -80 | Anchor link offset (px) |

### Behaviour

- Syncs Lenis with GSAP's ticker for consistent animation timing
- Respects `prefers-reduced-motion` (disabled when active)
- Handles anchor links with -80px offset (accounts for fixed header)
- Cleans up on unmount

---

## Cross-Framework Prop Shape

```typescript
interface PageTransitionProps {
  children: React.ReactNode;
}

interface PreloaderProps {}

interface SmoothScrollerProps {}
```

## Token Dependencies

- `color.background.inverse`
- `color.content.*` — inverse, tertiary
- `space.lg`
- `font.family.sans`
- `text.sm`
