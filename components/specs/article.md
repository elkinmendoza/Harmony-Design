# Article — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **ArticleMeta**, **ArticleParagraph**, **ArticleShare**, **ArticleExperiments**

---

## Overview

Article components handle the content structure of experiment/blog detail pages. They follow the editorial two-column layout pattern with consistent 72px vertical rhythm and max-width containers.

**Surfaces:** Website, Mobile app

---

## 1. ArticleMeta

### Purpose
Displays article metadata — author name (with link), date, and description — in a two-column asymmetric layout. Includes social share buttons via ArticleShare.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `author` | `ExperimentAuthor` | required | `{ authorName, authorLink }` |
| `date` | `string` | required | Publication date (e.g. "06/15/24") |
| `description` | `string` | required | Article description/summary |
| `title` | `string?` | — | Title for share metadata |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |
| Gap meta | `space.lg` | `--space-lg` | 24px |
| Gap author | `space.sm` | `--space-sm` | 8px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Labels | `--font-sans` (Space Grotesk) | 20px | 400/600 | 28px | 0 |
| Description | `--font-sans` (Space Grotesk) | 40px | 400 | 48px | -1px |

### Layout

```
┌─────────────────────────────────────────────────────┐
│  Written by              Let's explore how AI is    │
│  ELKIN MENDOZA           transforming the web       │
│  06/15/24                development landscape...   │
│  [Share icons]                                      │
│                                                     │
│  w-[457px]               w-[807px]                  │
│                              max-w-[1440px] · py-18 │
└─────────────────────────────────────────────────────┘
```

### States

| State | Behaviour |
|-------|-----------|
| Author link hover | Underline opacity reduces to 70% (200ms) |

### Mobile Variant (MobileCaption)

- Stacked single-column layout
- Description: 32px / 40px / -1px
- Labels: 20px / 28px
- Padding: `px-6 py-18`

---

## 2. ArticleParagraph

### Purpose
Renders article body content (HTML) with optional sidebar spacer for layout alignment.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | required | HTML content string |
| `showSidebar` | `boolean?` | `false` | Show left sidebar spacer |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Typography

| Element | Family | Size | Weight | Line Height |
|---------|--------|------|--------|-------------|
| Body | `--font-body` (Roboto) | 16px | 400 | 24px |

### Layout

- Sidebar: `w-[457px] h-[224px]` (when visible)
- Content: `w-[807px]`
- `whitespace-pre-wrap` for text formatting
- Uses `dangerouslySetInnerHTML` for HTML content

### Mobile Variant (MobileParagraph)

- Full width, no sidebar
- Optional blank space: `h-[224px]`
- `overflow-clip`, `px-6 py-18`

---

## 3. ArticleShare

### Purpose
Social sharing buttons for articles with platform-specific icons and Web Share API fallback.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string?` | — | Article title for share metadata |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Icon color | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Focus outline | `color.content.primary` | — | 2px with 2px offset |

### Typography

| Element | Family | Size | Weight | Line Height |
|---------|--------|------|--------|-------------|
| Label | `--font-sans` (Space Grotesk) | 20px | 400 | 28px |

### Layout

```
┌─────────────────────────────────────┐
│  Share                              │
│  [X] [LI] [Dr] [Pi] [Be] [Ig] [•]  │ gap-3
│                          gap-2      │
└─────────────────────────────────────┘
```

- Icon size: 20×20px (viewBox 24×24, stroke width 2)
- Gap label→icons: `gap-2`
- Gap between icons: `gap-3`

### Platforms

| Platform | Action |
|----------|--------|
| Twitter/X | Opens intent URL |
| LinkedIn | Opens share-offsite URL |
| Pinterest | Opens pin/create URL |
| Dribbble | Placeholder |
| Behance | Placeholder |
| Instagram | Placeholder |
| More | Native Web Share API, clipboard fallback |

### States

| State | Behaviour |
|-------|-----------|
| Hover | `opacity: 0.6` |
| Focus | `outline: 2px solid`, `outline-offset: 2px` |
| Copied | "Link copied" feedback for 1800ms |

---

## 4. ArticleExperiments

### Purpose
List of experiment articles with image, metadata, and category badges. Desktop uses a horizontal three-column layout; mobile stacks vertically.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `experiments` | `ExperimentItem[]` | required | Array of experiments to display |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Text | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Border | `color.border.strong` | `--color-border-strong` | `neutral.400` |
| Hover bg | `color.background.secondary` | `--color-background-secondary` | `neutral.100` |
| Badge radius | `radius.full` | `--radius-full` | 9999px |
| Padding | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Typography

| Element | Family | Size (desktop) | Size (mobile) | Weight |
|---------|--------|---------------|---------------|--------|
| Title | `--font-sans` | 20px | 16px | 400 |
| Subtitle | `--font-sans` | 32px | 24px | 400 |
| Description | `--font-sans` | 64px | 32px | 400 |
| Badge | `--font-sans` | 11px | 11px | 400 |

### Layout (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ ┌──────────────────────────────────────────────────────────┐  │
│ │  (EM® — 02)  (AI)  Leveraging web...   [Image 320×270]  │  │ border-t-2
│ │  title       sub   description          image            │  │
│ │  [AI] [Type]                                             │  │
│ ├──────────────────────────────────────────────────────────┤  │
│ │  (EM® — 03)  (Photo) Creative...       [Image]          │  │
│ │  [Photography] [Color]                                   │  │
│ ├──────────────────────────────────────────────────────────┤  │ border-b-2
│                              max-w-[1440px] · px-6 · py-18   │
└───────────────────────────────────────────────────────────────┘
```

- Three columns per row: title, subtitle+description, image
- Borders: `border-t-2` (all items), `border-b-2` (last item)
- Image: `h-[270px] min-h-[270px] max-w-[320px]`
- Item padding: `py-6`

### States

| State | Behaviour |
|-------|-----------|
| Default | Static display |
| Hover | `bg-secondary` background |

---

## Data Shapes

```typescript
interface ExperimentAuthor {
  authorName: string;
  authorLink: string;
}

interface ExperimentItem {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  slug: string;
  categories: string[];
}
```

## Cross-Framework Prop Shape

```typescript
interface ArticleMetaProps {
  author: ExperimentAuthor;
  date: string;
  description: string;
  title?: string;
}

interface ArticleParagraphProps {
  content: string;
  showSidebar?: boolean;
}

interface ArticleShareProps {
  title?: string;
}

interface ArticleExperimentsProps {
  experiments: ExperimentItem[];
}
```

## Token Dependencies

- `color.content.*` — primary, secondary
- `color.background.*` — primary, secondary
- `color.border.strong`
- `radius.full`
- `space.*` — sm, md, lg, xl, 4xl
- `font.family.*` — sans, body
- `heading.*` — xs, md, lg, display-lg
- `text.*` — xs, sm, md
