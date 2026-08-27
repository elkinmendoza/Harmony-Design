# Harmony — Component Library

> A premium, editorial design system built for **Photography/Videography**, **Digital Agency**, **Fashion Ecommerce**, and **Promotional Landing Pages**. Inspired by [Aceternity UI](https://ui.aceternity.com/) microinteraction patterns, the EM Mendoza portfolio aesthetic, and modern motion-first design.

Follow `.devin/skills/component-build/SKILL.md` and `.devin/skills/code-connect/SKILL.md` for every new component.

---

## Architecture

```
components/
│
├── ui/                          ← Atomic primitives
│   ├── Button/
│   ├── Link/
│   ├── Icon/
│   ├── Badge/
│   ├── Input/
│   ├── Select/
│   ├── Modal/
│   ├── Drawer/
│   └── Tooltip/
│
├── layout/                      ← Structural primitives
│   ├── Container/
│   ├── Section/
│   ├── Grid/
│   ├── Stack/
│   ├── Cluster/
│   └── Divider/
│
├── media/                       ← Visual content
│   ├── Media/
│   ├── Image/
│   ├── Video/
│   ├── MediaGallery/
│   ├── Lightbox/
│   ├── Carousel/
│   └── VideoPlayer/
│
├── navigation/                  ← Wayfinding
│   ├── Navbar/
│   ├── Menu/
│   ├── MobileMenu/
│   ├── Breadcrumbs/
│   └── Pagination/
│
├── content/                     ← Content patterns
│   ├── Card/
│   ├── ProjectCard/
│   ├── ProductCard/
│   ├── ArticleCard/
│   ├── Testimonial/
│   └── TeamMember/
│
├── interaction/                 ← Motion & microinteraction
│   ├── Reveal/
│   ├── Parallax/
│   ├── Magnetic/
│   ├── Marquee/
│   ├── Cursor/
│   └── ScrollProgress/
│
├── forms/                       ← Data collection
│   ├── Form/
│   ├── Input/
│   ├── Textarea/
│   ├── Select/
│   ├── FileUpload/
│   └── Validation/
│
├── specs/                       ← Framework-agnostic specs
├── web/react/                   ← React implementations
├── web/vue/                     ← Vue implementations
├── react-native/                ← React Native implementations
└── code-connect/                ← Figma Code Connect mappings
```

---

## Component ↔ Figma Mapping

### Legend

| Status | Meaning |
|--------|---------|
| **EXISTS** | Component exists in Figma with variants/tokens bound |
| **PARTIAL** | Figma has a related component but needs restructuring |
| **CREATE** | Must be designed from scratch in Figma |

---

### ui/ — Atomic Primitives

| Component | Figma Status | Figma Source | Variants | Microinteraction |
|-----------|-------------|--------------|----------|------------------|
| **Button** | PARTIAL | `tokens/components.json` (spec only) | `variant`: primary / secondary / ghost / outline / link | Magnetic hover pull, scale 0.98 on press, shimmer on idle CTA |
| **Link** | CREATE | — | `variant`: default / underline / animated | Underline slide-in from left, color transition 200ms |
| **Icon** | CREATE | — | `size`: sm / md / lg / xl | Rotate on hover, scale bounce on click |
| **Badge** | EXISTS | `🔨 Tools` → `Badge` | `type`: Default / Subtle; `status`: Inverse / Positive / Negative / Warning / Info | Pulse on status change, fade-in on mount |
| **Input** | PARTIAL | `tokens/components.json` (spec only) | `state`: default / focus / error / disabled; `size`: sm / md / lg | Border color morph, label float animation |
| **Select** | CREATE | — | `state`: default / open / disabled; `size`: sm / md / lg | Dropdown slide + fade, option highlight sweep |
| **Modal** | CREATE | — | `size`: sm / md / lg / full | Backdrop blur-in, content scale-up from 0.95 with spring |
| **Drawer** | CREATE | — | `position`: left / right / bottom | Slide-in with physics spring, backdrop fade |
| **Tooltip** | CREATE | — | `position`: top / right / bottom / left | Scale-in from origin with 50ms delay |

---

### layout/ — Structural Primitives

| Component | Figma Status | Figma Source | Variants | Notes |
|-----------|-------------|--------------|----------|-------|
| **Container** | PARTIAL | Used in many components | `size`: sm / md / lg / xl / full | Max-width wrapper with responsive padding |
| **Section** | PARTIAL | Multiple section patterns | `spacing`: compact / default / spacious; `bg`: transparent / surface / inverse | Full-width semantic section wrapper |
| **Grid** | EXISTS | `Grids & Cards` → `ImageGridTwo` | `columns`: 1 / 2 / 3 / 4 / auto-fit | Responsive CSS Grid with gap tokens |
| **Stack** | PARTIAL | Layout pattern in Spacer | `direction`: vertical / horizontal; `gap`: xs–5xl | Flexbox with token-based spacing |
| **Cluster** | CREATE | — | `gap`: xs–5xl; `justify`: start / center / end / between | Inline-flex wrapping cluster |
| **Divider** | CREATE | — | `orientation`: horizontal / vertical; `variant`: subtle / default / strong | Animated draw-in line |

---

### media/ — Visual Content

| Component | Figma Status | Figma Source | Variants | Microinteraction |
|-----------|-------------|--------------|----------|------------------|
| **Media** | PARTIAL | Multiple image components | `type`: image / video; `aspect`: 1:1 / 4:3 / 16:9 / 3:4 / free | Skeleton shimmer on load, fade-in reveal |
| **Image** | EXISTS | `🖼 Project Grid` → `ProjectThumbnail` | `fit`: cover / contain; `radius`: none–full | Parallax on scroll, zoom on hover |
| **Video** | PARTIAL | Background video in portfolio | `autoplay`: true / false; `controls`: minimal / full / none | Play icon morph, progress bar glow |
| **MediaGallery** | PARTIAL | `Grids & Cards` → `ImageGridTwo` | `layout`: masonry / grid / slider | Stagger reveal on scroll, lightbox on click |
| **Lightbox** | CREATE | — | `navigation`: arrows / dots / swipe | Backdrop blur, image scale spring, swipe physics |
| **Carousel** | EXISTS | `➡ Sliders & Marquees` → `AutoScrollSlider`, `InteractiveDragSlider` | `autoPlay`: true / false; `drag`: true / false | Momentum drag physics, parallax per-slide |
| **VideoPlayer** | CREATE | — | `variant`: inline / fullscreen / background | Poster crossfade, control bar slide-up |

---

### navigation/ — Wayfinding

| Component | Figma Status | Figma Source | Variants | Microinteraction |
|-----------|-------------|--------------|----------|------------------|
| **Navbar** | EXISTS | `🧭 Navigation` → `Header` | `variant`: transparent / solid / blur; `sticky`: true / false | Hide on scroll-down, reveal on scroll-up, backdrop blur transition |
| **Menu** | PARTIAL | `🧭 Navigation` → `Header` (nav links) | `orientation`: horizontal / vertical | Link underline slide, active indicator morph |
| **MobileMenu** | EXISTS | `🧭 Navigation` → `MobileNavOpen` / `MobileNavClosed` | `state`: open / closed | Fullscreen wipe, staggered link reveal, oversized typography |
| **Breadcrumbs** | CREATE | — | `separator`: slash / chevron / dot | Truncation ellipsis, animate new crumb slide-in |
| **Pagination** | EXISTS | `🧪 Experiment Card` → `Pagination` | `variant`: numbered / dots / load-more | Active dot scale, page number morph |

---

### content/ — Content Patterns

| Component | Figma Status | Figma Source | Variants | Microinteraction |
|-----------|-------------|--------------|----------|------------------|
| **Card** | EXISTS | `Grids & Cards` → `ProjectCardXl` (base pattern) | `variant`: elevated / outlined / filled; `size`: sm / md / lg | Hover lift + shadow expand, tilt on cursor position |
| **ProjectCard** | EXISTS | `Grids & Cards` → `ProjectCardXl`, `ProjectCardLandscape` | `size`: XS / SM / MD / LG / XL; `orientation`: portrait / landscape | Image zoom on hover, overlay gradient reveal, title slide-up |
| **ProductCard** | CREATE | — | `variant`: minimal / detailed / quick-view; `badge`: sale / new / none | Add-to-cart button expand, price crossfade on sale, quick-view overlay |
| **ArticleCard** | EXISTS | `Grids & Cards` → `ArticleSections` | `variant`: featured / standard / compact | Category badge pulse, read-time fade, image parallax |
| **Testimonial** | CREATE | — | `variant`: quote / card / inline | Quote mark scale-in, avatar border glow, text typewriter |
| **TeamMember** | CREATE | — | `variant`: grid / list / featured | Photo grayscale→color on hover, social links stagger reveal |

---

### interaction/ — Motion & Microinteraction

| Component | Figma Status | Figma Source | Variants | Microinteraction |
|-----------|-------------|--------------|----------|------------------|
| **Reveal** | PARTIAL | `🌌 Transitions` → `PageTransition` (transition pattern) | `direction`: up / down / left / right; `type`: fade / slide / clip | IntersectionObserver trigger, stagger children, clip-path reveal |
| **Parallax** | PARTIAL | Used in sliders | `speed`: slow / medium / fast; `direction`: vertical / horizontal | Scroll-linked transform, GPU-accelerated layers |
| **Magnetic** | CREATE | — | `strength`: subtle / medium / strong; `radius`: sm / md / lg | Cursor-following translation with spring physics, snap-back on leave |
| **Marquee** | EXISTS | `🔤 Display Text` → `MarqueeText`, `🖼 Project Grid` → `SkillsMarquee` | `direction`: left / right; `speed`: slow / medium / fast; `pauseOnHover`: true / false | Infinite CSS animation, smooth pause/resume, hover deceleration |
| **Cursor** | CREATE | — | `variant`: default / pointer / drag / expand | Custom cursor follow with lerp, scale on interactive elements, blend mode |
| **ScrollProgress** | CREATE | — | `variant`: bar / circle / number | Scroll-linked width/stroke, color transition at thresholds |

---

### forms/ — Data Collection

| Component | Figma Status | Figma Source | Variants | Microinteraction |
|-----------|-------------|--------------|----------|------------------|
| **Form** | CREATE | — | `layout`: stacked / inline / grid | Submit button state machine, success confetti, error shake |
| **Input** | PARTIAL | `tokens/components.json` | `type`: text / email / password / search; `size`: sm / md / lg | Label float on focus, border morph, clear button fade-in |
| **Textarea** | CREATE | — | `resize`: none / vertical / auto; `size`: sm / md / lg | Auto-grow height, character count fade, focus ring expansion |
| **Select** | CREATE | — | `variant`: default / searchable / multi; `size`: sm / md / lg | Options dropdown spring, selected chip animate-in, search highlight |
| **FileUpload** | CREATE | — | `variant`: dropzone / button / inline | Drag-over pulse border, progress ring fill, preview thumbnail scale-in |
| **Validation** | CREATE | — | `type`: error / warning / success / info | Shake on error, checkmark draw on success, message slide-down |

---

## Existing Figma Components — Full Cross-Reference

### Direct matches (component exists in Figma, maps 1:1)

| New Path | Figma Page | Figma Component | Notes |
|----------|-----------|-----------------|-------|
| `ui/Badge` | 🔨 Tools | `Badge` (14 variants) | Rename variants to match new prop schema |
| `navigation/Navbar` | 🧭 Navigation | `Header` | Restructure as component set with `variant` prop |
| `navigation/MobileMenu` | 🧭 Navigation | `MobileNavOpen` + `MobileNavClosed` | Merge into single component set with `state` prop |
| `navigation/Pagination` | 🧪 Experiment Card | `Pagination` (2 variants) | Extend with more variant types |
| `content/ProjectCard` | Grids & Cards | `ProjectCardXl` (5 sizes) + `ProjectCardLandscape` (5 sizes) | Merge into single component set with `size` + `orientation` |
| `content/ArticleCard` | Grids & Cards | `ArticleSections` (2 variants) | Extract card pattern from section |
| `media/Carousel` | ➡ Sliders & Marquees | `AutoScrollSlider`, `InteractiveDragSlider`, `DualDirectionSlider` | Consolidate into single Carousel with mode variants |
| `interaction/Marquee` | 🔤 Display Text + 🖼 Project Grid | `MarqueeText`, `SkillsMarquee` | Merge into generic Marquee with content slot |
| `interaction/Reveal` | 🌌 Transitions | `PageTransition` | Generalize to reusable reveal wrapper |

### Partial matches (needs restructuring or extension)

| New Path | Figma Page | Figma Component | What needs to change |
|----------|-----------|-----------------|---------------------|
| `ui/Button` | — | `tokens/components.json` spec | Design component set in Figma with all 5 variants + states |
| `ui/Input` | — | `tokens/components.json` spec | Design component set in Figma with states/sizes |
| `layout/Container` | — | Used internally in many components | Extract as standalone utility component |
| `layout/Section` | 🔤 Display Text | `TextSection`, `ArticleSection` | Generalize section wrapper pattern |
| `layout/Grid` | Grids & Cards | `ImageGridTwo` | Generalize to configurable grid |
| `layout/Stack` | 🔨 Tools | `Spacer` (15 sizes) | Evolve into Stack with direction + gap |
| `media/Image` | 🖼 Project Grid | `ProjectThumbnail` | Generalize image handling with aspect ratios |
| `media/Video` | — | Background video patterns exist in portfolio | Design dedicated video component |
| `media/MediaGallery` | Grids & Cards | `ImageGridTwo` | Extend with masonry + slider modes |
| `content/Card` | Grids & Cards | `ProjectCardXl` (base pattern) | Create generic Card variant without project-specific content |
| `interaction/Parallax` | ➡ Sliders & Marquees | Parallax used in sliders | Extract as standalone wrapper |

### Must create from scratch

| New Path | Priority | Use Cases |
|----------|----------|-----------|
| `ui/Link` | High | All websites — nav, inline, footer links |
| `ui/Icon` | High | All websites — UI chrome, actions |
| `ui/Select` | Medium | Forms, filters, ecommerce sorting |
| `ui/Modal` | High | Product quick-view, image lightbox, confirmations |
| `ui/Drawer` | Medium | Mobile nav, cart sidebar, filters panel |
| `ui/Tooltip` | Medium | Dashboard, form help, truncated text |
| `layout/Cluster` | Medium | Tag groups, button groups, breadcrumbs |
| `layout/Divider` | Low | Section breaks, list separators |
| `media/Lightbox` | High | Photography, fashion lookbooks |
| `media/VideoPlayer` | High | Videography, agency showreels |
| `content/ProductCard` | High | Fashion ecommerce, product grids |
| `content/Testimonial` | Medium | Agency, fashion brand social proof |
| `content/TeamMember` | Medium | Agency about pages |
| `interaction/Magnetic` | High | CTAs, nav items — Aceternity-style |
| `interaction/Cursor` | Medium | Portfolio, agency — premium feel |
| `interaction/ScrollProgress` | Low | Long-form articles, product pages |
| `forms/Form` | High | Contact, newsletter, checkout |
| `forms/Textarea` | Medium | Contact forms, reviews |
| `forms/FileUpload` | Medium | Portfolio submissions, ecommerce returns |
| `forms/Validation` | High | All form contexts |
| `navigation/Breadcrumbs` | Low | Ecommerce, multi-page flows |

---

## Microinteraction Spec (Aceternity-Inspired)

All components ship with built-in microinteractions. These are designed in Figma as **interaction annotations** and implemented with Motion (Framer Motion) / GSAP.

### Interaction Principles

1. **Spring physics over linear** — all translations use spring(`damping: 25, stiffness: 300`).
2. **Stagger children** — lists reveal items with 50ms offset.
3. **Scroll-linked** — parallax, reveal, progress tied to IntersectionObserver or scroll position.
4. **Cursor-aware** — magnetic pulls, tilt on hover, custom cursors.
5. **Reduced motion** — all animations respect `prefers-reduced-motion: reduce`.

### Per-Component Interaction Matrix

| Component | Hover | Click/Tap | Scroll | Focus | Mount |
|-----------|-------|-----------|--------|-------|-------|
| Button | Scale 1.02, magnetic pull | Scale 0.98, ripple | — | Ring expand | — |
| Card | Lift 4px, shadow expand, image zoom | — | Reveal fade-up | Ring | Stagger in |
| ProjectCard | Overlay gradient reveal, title slide-up | Navigate | Parallax image | — | Fade scale |
| ProductCard | Quick-view expand, price highlight | Add to cart feedback | — | Ring | Stagger |
| Navbar | — | — | Hide/reveal on direction | — | Slide down |
| MobileMenu | — | Wipe transition | — | Trap focus | Stagger links |
| Marquee | Decelerate | — | Speed modulation | — | Auto-start |
| Carousel | Grab cursor | Drag momentum | — | Slide indicator | First slide |
| Modal | — | — | — | Trap | Scale spring |
| Input | Border morph | — | — | Label float, ring | — |
| Reveal | — | — | Clip/fade trigger | — | — |
| Magnetic | Translation toward cursor | Snap scale | — | — | — |
| Tooltip | — | — | — | Scale-in from origin | — |

---

## Industry-Specific Usage Guide

### Photography / Videography
- **Hero**: `media/Video` (background) + `interaction/Reveal` + `layout/Section`
- **Gallery**: `media/MediaGallery` (masonry) + `media/Lightbox`
- **Portfolio**: `content/ProjectCard` (landscape) + `interaction/Parallax`
- **Showreel**: `media/VideoPlayer` (fullscreen) + `interaction/Cursor` (play icon)

### Digital Agency
- **Landing**: `interaction/Magnetic` (CTAs) + `interaction/Marquee` (clients)
- **Services**: `content/Card` + `interaction/Reveal` (stagger)
- **Team**: `content/TeamMember` + `interaction/Reveal`
- **Case Studies**: `content/ProjectCard` + `media/Carousel`

### Fashion Ecommerce
- **Product Grid**: `content/ProductCard` + `layout/Grid` (auto-fit)
- **Product Detail**: `media/MediaGallery` + `ui/Select` (size) + `ui/Button` (add to cart)
- **Lookbook**: `media/Carousel` (drag) + `media/Lightbox`
- **Cart**: `ui/Drawer` (right) + `content/ProductCard` (compact)

### Fashion Design Landing Page
- **Hero**: `media/Video` (background) + `interaction/Reveal` (text clip)
- **Collection**: `media/Carousel` + `interaction/Parallax`
- **Editorial**: `content/ArticleCard` + `layout/Grid`
- **CTA**: `ui/Button` (magnetic) + `ui/Modal` (newsletter)

---

## How to add a component

1. **Design the component set in Figma first** (`docs/FIGMA-CONFIG.md` §3).
   - Use a component set with variants, `camelCase` props, lowercase values.
   - Bind every property to a semantic or component token.
   - Add interaction annotations (hover/focus/active state frames).
2. **Add component tokens** in `tokens/components.json` if needed (alias semantic only).
3. **Write the spec** in `components/specs/{category}/{name}.md`.
4. **Implement per target:**
   - **Web React** → `components/web/react/{category}/{name}.tsx`
   - **Web Vue**   → `components/web/vue/{category}/{name}.vue`
   - **React Native** → `components/react-native/{category}/{name}.tsx`
5. **Add microinteractions** using Motion (React) / GSAP (Vue) / Reanimated (RN).
6. **Run the accessibility pass** (`.devin/rules/accessibility.md`).
7. **Set up Code Connect** (`.devin/skills/code-connect/SKILL.md`).

## Token usage rule

Components must consume **semantic or component tokens only** — never raw primitives. See `AGENTS.md` §3 and `.devin/rules/tokens.md`.
