# Footer — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **Footer**, **FooterCta**, **FooterList**

---

## Overview

The Footer is a composite component combining a call-to-action section (FooterCta) with a sitemap/social links section (FooterList). It provides consistent page closure with branding and navigation.

**Surfaces:** Website, Dashboard

---

## 1. FooterCta

### Purpose
Call-to-action section inviting users to get in touch. Features a two-column layout with branded title and a description linking to email/contact.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained; uses constants |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Title line 1 | `--font-sans` (Space Grotesk) | 20px | 400 | 28px | 0 |
| Title line 2 | `--font-sans` (Space Grotesk) | 20px | 600 | 28px | 0 |
| Description | `--font-sans` (Space Grotesk) | 32px | 400 | 40px | -1px |

### Layout

```
┌─────────────────────────────────────────────────────┐
│  (EMendoza® —)          Let's talk about your       │
│  GET IN TOUCH           next project. I'm always    │ max-w-[1440px]
│                         open to creative...         │
│  w-[457px]              w-[768px]                   │
│                                             px-6    │
└─────────────────────────────────────────────────────┘
```

- Max width: 1440px
- Two-column: `flex flex-wrap gap-y-6`
- Mobile: stacks vertically

### States

| State | Behaviour |
|-------|-----------|
| Default | Static display |
| Hover | `opacity: 0.8` on container |
| Cursor | `cursor-pointer` |

### Accessibility

- Clickable container wraps email link
- Descriptive `aria-label` on link

---

## 2. FooterList

### Purpose
Sitemap, social links, and copyright information. Organised in responsive columns.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained; uses constants |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Section headers | `--font-sans` (Space Grotesk) | 16px | 600 | 24px | 0 |
| Links | `--font-body` (Roboto) | 16px | 400 | 24px | 0 |
| Copyright | `--font-body` (Roboto) | 14px | 400 | 14px | 0 |

### Layout

```
┌─────────────────────────────────────────────────────┐
│  SITEMAP        PLAYGROUND       SOCIAL             │
│  About          AI Experiments   GitHub              │
│  Work           Photography      Dribbble            │ flex-wrap
│  Playground     Motion Design    LinkedIn            │
│                                                     │
│  © 2026 Elkin Mendoza                    RESUME ↗   │
└─────────────────────────────────────────────────────┘
```

- Max width: 1440px
- Column gap: `gap-6 sm:gap-12 md:gap-18`
- Bottom: `flex-col md:flex-row justify-between`

### States

| State | Behaviour |
|-------|-----------|
| Default | Static links |
| Link hover | `underline` decoration |

### Accessibility

- Semantic `<footer>` element
- Links have descriptive text
- Resume link opens in new tab with `rel="noopener"`

---

## 3. Footer (Wrapper)

### Purpose
Composes FooterCta + FooterList into a single footer section.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Fragment wrapper; no props |

---

## Cross-Framework Prop Shape

```typescript
interface FooterCtaProps {}
interface FooterListProps {}
interface FooterProps {}
```

## Token Dependencies

- `color.content.primary`
- `space.*` — xs, sm, lg, xl, 3xl, 4xl
- `font.family.*` — sans, body
- `heading.xs`, `heading.md`
- `text.*` — sm, md
