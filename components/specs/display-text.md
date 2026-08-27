# Display Text — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **Headline**, **BannerLayout**, **TextSection**, **ArticleTitleSection**, **QuoteSection**

---

## Overview

Display text components handle oversized typography, editorial layouts, and content sections. They form the backbone of the portfolio's "big titles, organised layouts" signature. All use semantic tokens and the Harmony type scale.

**Surfaces:** Website, Mobile app, Dashboard

---

## 1. Headline

### Purpose
Oversized single-word headline that scales from 64px (mobile) to 256px (desktop). Used for section openers like "SERVICES", "PLAYGROUND".

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | required | The headline word(s) to display |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Typography

| Breakpoint | Size | Line Height | Letter Spacing |
|------------|------|-------------|----------------|
| base | 64px | 48px | -1px |
| sm (640) | 96px | 72px | -1px |
| md (768) | 128px | 96px | -1px |
| lg (1024) | 192px | 144px | -1px |
| xl (1280) | 256px | 192px | -1px |

- Family: `--font-display` (Clash Grotesk)
- Weight: 700 (Bold)
- `whitespace-nowrap`

### Layout

```
┌─────────────────────────────────────────────────┐
│  SERVICES                                       │
│  ───────────────────────────                    │ font scales with viewport
│                                       px-6     │
│                                   py-14→py-18  │
└─────────────────────────────────────────────────┘
```

- `flex flex-wrap items-start justify-between`
- Responsive padding: `py-14 md:py-18`

---

## 2. BannerLayout

### Purpose
Editorial banner section with title, subtitle, and description in a responsive two-column layout. Used for section introductions ("MY APPROACH", "PLAYGROUND").

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string?` | — | Brand label, e.g. "(EMendoza® —)" |
| `subtitle` | `string?` | — | Section name, e.g. "MY APPROACH" |
| `description` | `string?` | — | Longer description text |
| `addTopPadding` | `boolean?` | `false` | Extra top padding for inner pages |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |
| Gap columns | `space.3xl` | `--space-3xl` | 64px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Title | `--font-sans` (Space Grotesk) | 20px | 400 | 28px | 0 |
| Subtitle | `--font-sans` (Space Grotesk) | 20px | 600 | 28px | 0 |
| Description | `--font-sans` (Space Grotesk) | 32px | 400 | 40px | -1px |

### Layout

```
┌─────────────────────────────────────────────────────┐
│  (EMendoza® —)          Great products start with   │
│  MY APPROACH            understanding. I listen,    │
│                         collaborate closely, and    │
│  w-[457px]              move fast with intention...  │
│                         w-[807px]                   │
│                              max-w-[1440px] · px-6  │
└─────────────────────────────────────────────────────┘
```

- Two-column: title 457px, description 807px
- `flex flex-col md:flex-row gap-12`
- Optional `pt-12 md:pt-56` when `addTopPadding` is true

---

## 3. TextSection

### Purpose
Editorial two-column text section with a numbered index column (oversized Clash Grotesk number) and a body column. The signature layout from the portfolio's about page.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `number` | `string?` | — | Section number (e.g. "1", "2", "3") |
| `paragraphs` | `string[]?` | — | Array of paragraph texts |
| `showDivider` | `boolean?` | `false` | Show top divider line |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Divider | `color.border.strong` | `--color-border-strong` | `neutral.400` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |
| Section gap | `space.4xl` | `--space-4xl` | 72px |
| Paragraph gap | `space.3xl` | `--space-3xl` | 64px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Number | `--font-display` (Clash Grotesk) | 72px | 700 | 80px | -1px |
| Paragraphs | `--font-sans` (Space Grotesk) | 32px | 400 | 40px | -1px |

### Layout

```
┌─────────────────────────────────────────────────────┐
│  ─────────────────────────────────── (divider)      │
│                                                     │
│  1        It's been almost a decade working in      │
│           the web industry, it all started in       │
│           2013. When I was 16 years old...          │
│                                                     │
│  w-[69px] max-w-[1170px] · px-20                   │
│                                       px-6 · py-18 │
└─────────────────────────────────────────────────────┘
```

- Number column: `w-[69px]`, top-aligned
- Body: `max-w-[1170px] flex-1 px-20`
- Mobile: column layout, `px-0.5`
- Gap between sections: 72px

---

## 4. ArticleTitleSection

### Purpose
Large editorial quote/title section with optional spacer column. Used as section openers on the about page.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quote` | `string?` | — | Quote text to display |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Quote | `--font-sans` (Space Grotesk) | 40px | 600 | 48px | -1px |

### Layout

```
┌─────────────────────────────────────────────────────┐
│           "Suddenly, hotspots for commercial         │
│            artists began popping up all over         │
│            the map..."                               │
│                                                     │
│  w-[69px] max-w-[1170px] · px-20                   │
│                                       px-6 · py-18 │
└─────────────────────────────────────────────────────┘
```

- Spacer: `h-[80px] w-[69px]` (hidden on mobile)
- Body: `max-w-[1170px] flex-1 px-20`
- Quotes: `&ldquo;` and `&rdquo;` entities
- `whitespace-pre-wrap`

---

## 5. QuoteSection

### Purpose
Centred article quote with left spacer column. Used in experiment detail pages.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quote` | `string` | required | Quote text to display |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Quote (desktop) | `--font-sans` (Space Grotesk) | 40px | 600 | 48px | -1px |
| Quote (mobile) | `--font-sans` | 40px | 600 | 48px | -1px |

### Layout

- Spacer: `h-[80px] w-[69px]` (left column)
- Content: `max-w-[1170px] px-[80px]`
- `whitespace-pre-wrap`
- `flex-[1_0_0]` for flexible width

---

## Cross-Framework Prop Shape

```typescript
interface HeadlineProps {
  text: string;
}

interface BannerLayoutProps {
  title?: string;
  subtitle?: string;
  description?: string;
  addTopPadding?: boolean;
}

interface TextSectionProps {
  number?: string;
  paragraphs?: string[];
  showDivider?: boolean;
}

interface ArticleTitleSectionProps {
  quote?: string;
}

interface QuoteSectionProps {
  quote: string;
}
```

## Token Dependencies

- `color.content.primary`, `color.border.strong`
- `space.*` — xs, sm, lg, xl, 2xl, 3xl, 4xl
- `font.family.*` — display, sans
- `heading.*` — 9xl, display-xl, md, lg, xs
- `text.*` — md
