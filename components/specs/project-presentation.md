# Project Presentation — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **ProjectPresentation** (desktop), **MobileProjectPresentation** (mobile)

---

## Overview

The Project Presentation is an interactive gallery component with a draggable sidebar listing projects and a detail view showing project media, description, tech stack, and deliverables. On desktop it's a split-panel layout; on mobile it's a sequential card view with prev/next navigation.

**Surfaces:** Website, Mobile app

---

## 1. ProjectPresentation (Desktop)

### Purpose
Split-panel project gallery. Left sidebar (414px) has a vertically auto-scrolling, draggable list of project thumbnails. Right panel (1026px) shows the selected project's media, description, "What Was Done", and "Tech Stack".

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `projects` | `ProjectItem[]` | required | Array of project data |
| `initialSlug` | `string?` | — | Pre-select a project by slug |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Background | `color.background.primary` | `--color-background-primary` | `neutral.50` |
| Text primary | `color.content.primary` | `--color-content-primary` | `neutral.900` |
| Text secondary | `color.content.secondary` | `--color-content-secondary` | `neutral.600` |
| Border | `color.border.strong` | `--color-border-strong` | `neutral.400` |
| Media bg | `color.background.inverse` | `--color-background-inverse` | `neutral.900` |
| Button bg | `color.background.inverse` | `--color-background-inverse` | `neutral.900` |
| Button fg | `color.content.inverse` | `--color-content-inverse` | `neutral.50` |
| Padding | `space.lg` | `--space-lg` | 24px |

### Typography

| Element | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| Project ID | `--font-sans` (Space Grotesk) | 20px | 400 | 28px | 0 |
| Title | `--font-sans` (Space Grotesk) | 16px | 600 | 24px | -0.5px |
| Year | `--font-sans` (Space Grotesk) | 14px | 400 | 20px | 0 |
| Section headers | `--font-sans` (Space Grotesk) | 20px | 600 | 28px | 0 |
| Body text | `--font-body` (Roboto) | 16px | 400 | 24px | 0 |

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ ┌────────────────┬─────────────────────────────────────────┐ │
│ │  SIDEBAR       │  DETAIL VIEW                           │ │
│ │  w-[414px]     │  w-[1026px]                            │ │
│ │                │                                        │ │
│ │  (EM® — 01)   │  ┌────────────────────────────────────┐ │ │
│ │  NLA           │  │  [Project Media]                   │ │ │
│ │  [thumb 160×95]│  │  aspect-square · bg-inverse        │ │ │
│ │  ─────────     │  └────────────────────────────────────┘ │ │
│ │  (EM® — 02)   │                                        │ │
│ │  LAUNCHPAD6    │  Description paragraph...              │ │
│ │  [thumb]       │                                        │ │
│ │  ─────────     │  WHAT WAS DONE        TECH STACK      │ │
│ │  (EM® — 03)   │  • Front-end Dev      • Vue.js        │ │
│ │  ...           │  • Design System      • Nuxt.js       │ │
│ │                │                                        │ │
│ │  ↕ draggable   │  [←]  [→]  navigation buttons         │ │
│ └────────────────┴─────────────────────────────────────────┘ │
│  h-[720px] · max-w-[1440px]                                  │
└──────────────────────────────────────────────────────────────┘
```

- Split: sidebar 414px + detail 1026px
- Fixed height: 720px
- Thumbnails: `h-[95px] w-[160px]`
- Media: `aspect-square bg-inverse`
- Auto-scroll with GSAP, draggable with inertia
- Pause on hover/drag

### States

| State | Behaviour |
|-------|-----------|
| Default | First project selected, sidebar auto-scrolling |
| Hover (sidebar) | Pauses auto-scroll, `opacity: 0.8` |
| Dragging | User drags sidebar, auto-scroll paused |
| Selected | Active project highlighted in sidebar + shown in detail |

### Animation

- Sidebar auto-scroll: GSAP `y: -scrollDistance`, yoyo, repeat, ease `none`
- Draggable with inertia (throwProps)
- Project hover: `opacity: 0.8` transition

### Accessibility

- Keyboard-navigable sidebar
- Prev/next buttons with aria-labels
- Project detail uses semantic headings
- List items use proper list markup

---

## 2. MobileProjectPresentation

### Purpose
Mobile-optimised project view with sequential card navigation. Counter shows position (01 / 05). Thumbnail strip at top for quick navigation.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `projects` | `ProjectItem[]` | required | Array of project data |
| `initialSlug` | `string?` | — | Pre-select a project by slug |

### Token Usage

Same tokens as desktop. Additional:

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Border top | `color.border.strong` | — | `#181818` |
| Border items | `color.border.subtle` | — | `#e5e5e5` |
| Loading overlay | `color.background.primary` | — | 80% opacity |

### Typography

| Element | Family | Size | Weight | Line Height |
|---------|--------|------|--------|-------------|
| Counter | `--font-sans` | 16px | 600 | 24px |
| Project ID | `--font-sans` | 20px | 400 | 28px |
| Title | `--font-sans` | 20px | 600 | 28px |
| Description | `--font-sans` | 20px | 400 | 28px |
| Section headers | `--font-sans` | 20px | 600 | 28px |
| Body | `--font-body` | 16px | 400 | 24px |

### Layout

```
┌──────────────────────────────────┐
│  01 / 05            [←] [→]  │ counter + nav
│ ┌──────────────────────────┐ │
│ │ ─────────────────────── │ │ border-t-2
│ │ [thumb] [thumb] [thumb] │ │ thumbnail strip
│ │ ─────────────────────── │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │  [Project Media]         │ │ aspect-square
│ │                          │ │
│ └──────────────────────────┘ │
│  (EM® — 01)                  │
│  NOVATED LEASE AUSTRALIA     │
│                              │
│  Description...              │
│                              │
│  WHAT WAS DONE   TECH STACK  │
│  • Front-end     • Vue.js    │
│                      p-6     │
└──────────────────────────────┘
```

- Full width
- Nav buttons: `size-10` (40×40)
- Loading state: spinner overlay with backdrop blur
- Content fade: `transition-opacity duration-300`

### States

| State | Behaviour |
|-------|-----------|
| Default | Current project displayed |
| Loading | 80% white overlay + spinner |
| Transitioning | 300ms opacity fade between projects |

---

## Data Shape

```typescript
interface ProjectItem {
  id: string;           // "(EM® — 01)"
  slug: string;         // "novated-lease-australia"
  title: string;        // "NOVATED LEASE AUSTRALIA"
  category: string;     // "WEBSITE"
  year: string;         // "2025"
  href: string;         // "/projects/novated-lease-australia"
  imageUrl: string;     // "/projects/NLA.jpg"
  imageHeight: "tall" | "short";
  description: string;
  whatWasDone: string[];
  techStack: string[];
}
```

## Cross-Framework Prop Shape

```typescript
interface ProjectPresentationProps {
  projects: ProjectItem[];
  initialSlug?: string;
}
```

## Token Dependencies

- `color.background.*` — primary, inverse
- `color.content.*` — primary, secondary, inverse
- `color.border.*` — strong, subtle
- `space.*` — sm, md, lg, xl, 2xl
- `font.family.*` — sans, body
- `heading.xs`, `text.*` — sm, md
