# Media — Component Spec

> Harmony Design System · Derived from `2026-ultimate-portfolio`
> Covers: **FullWidthImage**, **ImageSection**, **TwoColumnImages**, **ImageBackground**
> Mobile variants: **MobileBackgroundImage**, **MobilePortraitImage**, **MobileStackedImages**

---

## Overview

Media components handle image display in various layouts — full-width, portrait/landscape, side-by-side, and background sections. All use `object-cover` for consistent sizing and `pointer-events-none` to prevent accidental interaction. They are first-class citizens in Harmony, not afterthoughts.

**Surfaces:** Website, Mobile app

---

## 1. FullWidthImage

### Purpose
Full-width image spanning the content container with configurable height and object positioning. Used for hero images in article detail pages.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | `string` | required | Image source URL |
| `height` | `number?` | `959` | Image container height in px |
| `objectPosition` | `"top" \| "center" \| "bottom"` | `"center"` | CSS object-position |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Padding X | `space.lg` | `--space-lg` | 24px |
| Max width | — | — | 1440px |

### Layout

```
┌─────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────┐  │
│  │                                               │  │
│  │         [Full-width image]                    │  │ h-[959px] default
│  │         object-cover · object-{position}      │  │
│  │                                               │  │
│  └───────────────────────────────────────────────┘  │
│                              max-w-[1440px] · px-6  │
└─────────────────────────────────────────────────────┘
```

- Relative container with absolute image (`inset-0`)
- `object-cover`, `pointer-events-none`, `max-w-none`

---

## 2. ImageSection

### Purpose
Image display in portrait or landscape orientation with fixed dimensions. Used for standalone images in article pages.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | `string` | required | Image source URL |
| `orientation` | `"portrait" \| "landscape"` | `"portrait"` | Image orientation |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Padding X | `space.lg` | `--space-lg` | 24px |
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Dimensions

| Orientation | Width | Height |
|-------------|-------|--------|
| Portrait | 783px | 1190px |
| Landscape | 100% | 600px |

### Layout

```
Portrait:                    Landscape:
┌──────────────────┐         ┌──────────────────────────┐
│  ┌──────────┐    │         │  ┌──────────────────────┐│
│  │          │    │         │  │                      ││ h-[600px]
│  │  783px   │    │         │  │    full width         ││
│  │  ×       │    │         │  └──────────────────────┘│
│  │  1190px  │    │         │              px-6 · py-18│
│  │          │    │         └──────────────────────────┘
│  └──────────┘    │
│       px-6 py-18 │
└──────────────────┘
```

---

## 3. TwoColumnImages

### Purpose
Two images displayed side-by-side with configurable heights and object positioning. Used for visual variety in article layouts.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leftImage` | `string` | required | Left image URL |
| `rightImage` | `string` | required | Right image URL |
| `leftHeight` | `number?` | `440` | Left image height in px |
| `rightHeight` | `number?` | `1106` | Right image height in px |
| `leftObjectPosition` | `"top" \| "center" \| "bottom"` | — | Left image position |
| `rightObjectPosition` | `"top" \| "center" \| "bottom"` | — | Right image position |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Padding X | `space.lg` | `--space-lg` | 24px |
| Gap | `space.lg` | `--space-lg` | 24px |

### Layout

```
┌────────────────────────────────────────────────────┐
│  ┌──────────────────┐  ┌──────────────────────────┐│
│  │                  │  │                          ││
│  │  Left image      │  │  Right image             ││
│  │  h-[440px]       │  │  h-[1106px]              ││
│  │                  │  │                          ││
│  └──────────────────┘  │                          ││
│                        │                          ││
│  flex-[1_0_0]    gap-6 │  flex-[1_0_0]            ││
│                        └──────────────────────────┘│
│                              max-w-[1440px] · px-6 │
└────────────────────────────────────────────────────┘
```

- Equal columns: `flex-[1_0_0]`
- Gap: `gap-6` (24px)

---

## 4. ImageBackground

### Purpose
Full-width background image section used as visual breaks between content sections. Fixed height with overflow clip.

### Prop Contract

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| — | — | — | Self-contained |

### Token Usage

| Property | Token | CSS Variable | Value |
|----------|-------|-------------|-------|
| Padding Y | `space.4xl` | `--space-4xl` | 72px |

### Layout

- Container: `h-[768px] max-h-[768px] max-w-[1440px]`
- Image: large offset positioning (`h-[1697px] w-[2546px]`)
- `overflow-clip`, `object-cover`

---

## 5. Mobile Variants

### MobileBackgroundImage

| Prop | Type | Description |
|------|------|-------------|
| `imageUrl` | `string` | Image URL |

- Full width, `flex-1 min-h-px`
- `overflow-clip`, `object-cover`

### MobilePortraitImage

| Prop | Type | Description |
|------|------|-------------|
| `imageUrl` | `string` | Image URL |

- Height: `h-[1190px]`
- Padding: `px-6`
- `flex-1 min-w-px`, `object-cover`

### MobileStackedImages

| Prop | Type | Description |
|------|------|-------------|
| `imageUrl1` | `string` | First image URL |
| `imageUrl2` | `string?` | Second image URL (optional) |

- Stacked: `flex flex-col gap-6`
- Each image: `h-[528px] shrink-0`
- Padding: `px-6`

---

## Cross-Framework Prop Shape

```typescript
interface FullWidthImageProps {
  imageUrl: string;
  height?: number;
  objectPosition?: "top" | "center" | "bottom";
}

interface ImageSectionProps {
  imageUrl: string;
  orientation?: "portrait" | "landscape";
}

interface TwoColumnImagesProps {
  leftImage: string;
  rightImage: string;
  leftHeight?: number;
  rightHeight?: number;
  leftObjectPosition?: "top" | "center" | "bottom";
  rightObjectPosition?: "top" | "center" | "bottom";
}

interface ImageBackgroundProps {}

interface MobileBackgroundImageProps {
  imageUrl: string;
}

interface MobilePortraitImageProps {
  imageUrl: string;
}

interface MobileStackedImagesProps {
  imageUrl1: string;
  imageUrl2?: string;
}
```

## Accessibility

- All images require descriptive `alt` text
- `pointer-events-none` on decorative images
- Lazy loading for below-the-fold images
- Reduced motion: static poster fallback for any video media

## Token Dependencies

- `space.*` — lg, 4xl
- No colour tokens (media-only)
