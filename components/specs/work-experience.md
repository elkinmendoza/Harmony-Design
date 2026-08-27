# Work Experience — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **WorkExperience**

---

## Overview

The Work Experience component displays a professional timeline with numbered sections, company names, roles, and time periods. It follows the editorial two-column pattern with an oversized number on the left.

**Surfaces:** Website, Dashboard

---

## WorkExperience

### Purpose
Work history timeline showing companies, roles, and periods in a bordered list format with a large section number.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained; uses internal data |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Background | `color.background.primary` | `--color-background-primary` | `neutral.50` |
| Text primary | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Text secondary | `color.content.secondary` | `--color-content-secondary` | `neutral.600` |
| Border | `color.border.default` | `--color-border-default` | `neutral.300` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Number | `--font-display` (Clash Grotesk) | 72px | 700 | 80px | -1px |
| Company | `--font-sans` (Space Grotesk) | 20px | 600 | 28px | 0 |
| Role | `--font-body` (Roboto) | 14px | 400 | 14px | 0 |
| Period | `--font-sans` (Space Grotesk) | 20px | 600 | 28px | 0 |

### Layout

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  2        ┌─────────────────────────────────────┐   │
│           │ Novated Lease Australia    2025      │   │
│           │ Front-end Developer                  │   │
│           ├─────────────────────────────────────┤   │
│           │ Launchpad6                2020-2024  │   │
│           │ Front-end Developer + Designer       │   │
│           ├─────────────────────────────────────┤   │
│           │ Nabica Digital            2017-2019  │   │
│           │ Web Developer                        │   │
│           └─────────────────────────────────────┘   │
│  w-[457px]  w-[784px] · px-14                      │
│                              max-w-[1440px] · px-6  │
└─────────────────────────────────────────────────────┘
```

- Two-column: number (457px) + list (784px)
- List items: `border-b border-default`, `px-2 py-4`
- Plus sign separator between company and period

### Data Shape

```typescript
interface ExperienceItem {
  company: string;
  role: string;
  period: string;
}
```

### Accessibility

- Semantic list markup
- Company names as heading-level elements
- Periods use `<time>` element where possible

## Cross-Framework Prop Shape

```typescript
interface WorkExperienceProps {}
```

## Token Dependencies

- `color.background.primary`, `color.content.*` — primary, secondary
- `color.border.default`
- `space.*` — sm, md, lg, 3xl, 4xl
- `font.family.*` — display, sans, body
- `heading.display-xl`, `heading.xs`
- `text.sm`
