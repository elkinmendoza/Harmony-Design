# Figma Make Prompt — Design Agency Website Template

> Paste this into Figma Make or Figma AI agents. It instructs the model to generate
> a full Design Agency website template that respects the Harmony design system.

---

## PROMPT START

You are designing a **Design Agency Website Template** using the **Harmony Design System**. This template must be reusable, token-bound, and production-ready for Code Connect export to Vue.js, React.js, and React Native.

**IMPORTANT — Source of truth files (respect these strictly):**

This prompt is governed by two foundational documents inside the Harmony project
(Devin/Windsurf environment at `/Users/elkinmendoza/Documents/Harmony/`):

1. **`docs/DESIGN.md`** — The design-language foundation. Defines brand identity,
   visual principles, color usage, typography scale, spacing ladder, layout rules,
   component behaviour, accessibility, and hard constraints. Every design decision
   must trace back to this file. When in doubt, DESIGN.md wins.

2. **`SKILL.md`** — The Figma AI skill file. Contains the full component
   architecture (7 categories, 40+ components with props & microinteractions),
   the complete color palette hex values, semantic role mappings, spacing/radius/
   shadow tokens, and working rules for Figma generation.

3. **Figma "Foundations" page** — The Figma file's Foundations page contains the
   live variable collections (Colour, Scale, Typography, Semantic). All fills,
   strokes, spacing, radius, and typography in this template MUST bind to those
   Figma variables — never use raw values.

**Mandatory token binding rules (from DESIGN.md §4):**

- Every text node must bind `fontFamily` to a semantic token: `font/display`
  (Clash Grotesk), `font/sans` (Space Grotesk), or `font/body` (Roboto).
- Every text node must bind `fontWeight` to: `font-weight/regular` (400),
  `font-weight/medium` (500), `font-weight/semibold` (600), or `font-weight/bold` (700).
- Every text node must bind `fontSize` to the matching `heading/*/size` or `text/*/size` token.
- Every text node must bind `lineHeight` to `heading/*/line-height` or `text/*/line-height`.
- Every text node must bind `letterSpacing` to `heading/*/letter-spacing` or `text/*/letter-spacing`.
- Every text fill must bind to a semantic color variable (`content/primary`, `content/secondary`, `content/inverse`, `content/brand`, etc.).
- Every background/surface fill must bind to `background/*` or `surface/*` variables.
- Every border/stroke must bind to `border/*` variables.
- Every spacing (padding, gap, margin) must bind to `space/*` scale variables.
- Every corner radius must bind to `radius/*` variables.

**No raw values. No unbound properties. Everything traces to a Harmony variable.**

---

### BRAND CONTEXT

Harmony carries the **EM Mendoza brand** — stylish, unique, editorial. Never generic.

**Personality:** Confident, editorial, calm, precise, expressive, elegant.

**Design signature:**
1. Big, characterful titles — oversized Clash Grotesk display type is the hero.
2. Organised, rhythmic layouts — 4/8pt grid, generous whitespace, consistent chrome.
3. Readable, usable body — calm, high-contrast paragraphs; usability never sacrificed.
4. Stylish by default — every component looks considered and premium.

---

### TYPOGRAPHY (use these exact families & tokens)

| Role | Family | Token |
| --- | --- | --- |
| Display / big titles | **Clash Grotesk** (Bold 700) | `--font-display` |
| UI / labels / nav | **Space Grotesk** (400/600/700) | `--font-sans` |
| Body / long-form | **Roboto** (400/500/700) | `--font-body` |

**Type scale to use:**

- Hero headline: `heading/display-2xl` (96px / 96px line-height / -0.03em)
- Section titles: `heading/display-xl` (72px) or `heading/xl` (48px)
- Card headings: `heading/md` (30px / 36px line-height)
- Component headings: `heading/sm` (24px / 32px line-height)
- Eyebrows / labels: `heading/xs` (20px / 28px line-height, Space Grotesk 600)
- Body text: `text/md` (16px / 24px line-height, Roboto 400) — default
- Captions: `text/sm` (14px / 20px line-height, Space Grotesk 400)
- Badges/tags: `text/xs` (12px / 16px line-height)

Never mix more than one display family per composition. Display is tightly tracked; body stays calm.

---

### COLOR PALETTE (bind to Harmony variables)

**Primary brand:** `#ff9500` (Brand.500) — CTAs, emphasis, active states only.

**Neutral (warm gray):** surfaces, text, borders.
- Light backgrounds: Neutral.50 `#f8f7f5` / Neutral.100 `#f0efed`
- Body text: Neutral.900 `#161512` (light) / Neutral.50 `#f8f7f5` (dark)
- Secondary text: Neutral.600 `#545250` (light) / Neutral.300 `#c7c4bc` (dark)
- Borders: Neutral.200 `#e2e0db` (subtle) / Neutral.300 `#c7c4bc` (default)

**Status colors (feedback only, never decorative):**
- Positive: Green.500 `#1a9e52`
- Negative: Red.500 `#e53e2a`
- Info: Blue.500 `#2d6bf4`
- Warning: Yellow.500 `#f5c518`

**Dark mode:** invert semantic roles, avoid pure black. Darkest = Neutral.950 `#0d0c0a`.

---

### SPACING (4pt ladder — no arbitrary values)

| Token | px | Use |
| --- | --- | --- |
| `space-xs` | 4 | icon-to-label |
| `space-sm` | 8 | label-to-value |
| `space-md` | 16 | default element gap |
| `space-lg` | 24 | container gutter |
| `space-xl` | 32 | card padding |
| `space-2xl` | 48 | column inner pad |
| `space-3xl` | 64 | section pad (mobile) |
| `space-4xl` | 72 | section pad (desktop) |
| `space-5xl` | 96 | hero section pad |

---

### LAYOUT RULES

- 12-col grid, max content width **1440px**, centred.
- Gutters: 24px desktop, 16px mobile.
- Breakpoints: 640 / 768 / 1024 / 1280 / 1536 (mobile-first).
- Section rhythm: `space-4xl` (72px) standard, `space-5xl` (96px) for hero/feature.
- Full-bleed backgrounds OK; inner content respects 1440px.

---

### RADIUS & SHADOWS

- Controls/buttons: `radius-md` (8px)
- Cards: `radius-lg` (12px)
- Modals: `radius-xl` (16px)
- Pills/avatars: `radius-full` (9999px)
- Card shadow: `0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)`
- Hover shadow: `0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)`

---

### TEMPLATE SECTIONS TO DESIGN

Create a **complete multi-page Design Agency website** with the following pages/sections. Design each as a full-width frame at 1440px desktop width.

#### Page 1: Homepage

**1. Navigation Bar** (`navigation/Navbar`)
- Variant: `transparent` → `blur` on scroll
- Logo (wordmark) top-left, nav links centre or right, CTA button right
- Links: Work, Services, About, Contact
- Mobile: hamburger → fullscreen mobile menu with staggered link reveal
- Font: Space Grotesk 600, `text/sm`

**2. Hero Section**
- Full viewport height (100vh)
- Oversized headline: `heading/display-2xl` (96px), Clash Grotesk Bold
- Example copy: "We craft digital experiences that move people"
- Subtitle: `text/xl` Roboto — one-line agency positioning statement
- Primary CTA button (Brand.500 `#ff9500`), secondary ghost button
- Background: dark (Neutral.900) with subtle video or abstract gradient
- Microinteraction: headline reveal with clip-path animation, stagger words 80ms

**3. Clients / Logos Marquee** (`interaction/Marquee`)
- Auto-scrolling logo strip (6-8 client logos, grayscale, opacity 0.6)
- Pause on hover
- Divider above and below (`border-subtle`)

**4. Featured Projects Grid** (`content/ProjectCard` + `layout/Grid`)
- 2-column asymmetric grid (one large, one stacked pair)
- Each card: full-bleed image, overlay gradient, project title (`heading/md`), category tag (`text/xs` in pill badge)
- Microinteraction: image zoom 1.03 on hover, title slide-up, overlay gradient reveal
- "View all work" link with animated underline

**5. Services Section**
- Section eyebrow: `heading/xs` Space Grotesk 600 ("What we do")
- Section title: `heading/display-xl` (72px)
- 3–4 service cards in a row: icon (Material Design Icon `mdi-{name}` 24x24) + title (`heading/sm`) + short description (`text/md`) + arrow link
- Cards: `surface.raised`, `radius-lg`, `shadow-card`
- Microinteraction: hover lift 4px + shadow-lg expansion

**6. About / Stats**
- Split layout: left = bold statement (`heading/xl`), right = body paragraph (`text/lg`) + team photo
- Stats row below: 3–4 large numbers (`heading/display-lg`) with labels (`text/sm`)
- Numbers animate on scroll (count up)

**7. Testimonials** (`content/Testimonial`)
- Carousel or single rotating quote
- Large quote mark (decorative, Brand.500 at 20% opacity)
- Quote text: `text/xl` italic, attribution: `text/sm` + avatar
- Microinteraction: crossfade between testimonials, quote mark scale-in

**8. CTA / Contact Section**
- Dark background (Neutral.900)
- Big headline: `heading/display-xl` — "Let's build something great"
- Primary CTA button + email link
- Padding: `space-5xl` top/bottom

**9. Footer**
- 4-column grid: logo + tagline, navigation links, services, social links
- Bottom bar: copyright + legal links
- Divider: `border-subtle`
- Font: `text/sm` Space Grotesk

---

#### Page 2: Work / Portfolio

- Hero: `heading/display-xl` title + filter pills (All / Branding / Web / Mobile / Motion)
- Project grid: masonry or 2-col with varied aspect ratios
- Each project card: image + title + category + year
- Load more pagination or infinite scroll indicator

#### Page 3: Project Case Study (detail)

- Full-bleed hero image/video with project title overlay
- Project metadata bar: Client, Role, Year, Timeline
- Body: editorial two-column (index number left, content right)
- Image galleries (full-bleed + grid)
- Next/previous project navigation at bottom

#### Page 4: About

- Team hero with agency philosophy statement (`heading/display-xl`)
- Team grid (`content/TeamMember`): photo (grayscale → color on hover) + name + role + social links
- Values/process section: numbered list with icons
- Awards/recognition strip

#### Page 5: Contact

- Split layout: left = big headline + contact info, right = contact form
- Form fields: Name, Email, Company, Budget (select), Message (textarea)
- Submit button: Brand.500, loading state, success confirmation
- Map or office location below

---

### MICROINTERACTION REQUIREMENTS (Aceternity UI inspired)

For every section, implement these motion patterns:

1. **Scroll reveal** — sections fade + slide up (20px) on IntersectionObserver, stagger children 50-80ms
2. **Spring physics** — all hover translations use spring easing (damping: 25, stiffness: 300)
3. **Cursor interactions** — custom cursor that scales on interactive elements (20px → 40px)
4. **Magnetic buttons** — CTAs pull toward cursor (8px strength), snap back on leave
5. **Parallax** — hero background moves at 0.15x scroll speed
6. **Text reveal** — headlines clip-path reveal word by word
7. **Image hover** — scale(1.03) with overflow hidden, smooth spring transition
8. **Link underlines** — slide in from left on hover, slide out to right on leave
9. **Page transitions** — crossfade between pages (400ms ease)
10. **Marquee** — smooth infinite scroll, decelerate on hover

**Reduced motion:** all of the above must have a `prefers-reduced-motion: reduce` fallback that shows content statically with no animation.

---

### COMPONENT STRUCTURE RULES

- Build every element as a **component set** with variant properties
- Property names: `camelCase` (e.g. `variant`, `size`, `state`, `hasIcon`)
- Variant values: lowercase stable strings (`primary`, `ghost`, `sm`, `lg`)
- Layer names: semantic roles (`container`, `label`, `icon-leading`) not `Rectangle 12`
- All fills/strokes/spacing/typography must bind to **Harmony Figma Variables**
- Auto-layout everything — no fixed positioning except for absolute overlays
- Include states: default, hover, focus, active, disabled where applicable

---

### ACCESSIBILITY

- Contrast: WCAG AA minimum (4.5:1 body text, 3:1 large text)
- Focus states: visible ring (`border.focus` = Brand.500) on all interactive elements
- Touch targets: >= 44x44px on mobile
- Never signal state with color alone — pair with icon + text
- All images: alt text placeholder in description
- Video: poster fallback, captions, reduced-motion fallback

---

### WHAT NOT TO DO

- Do NOT invent new colors or spacing values — only use the tokens above
- Do NOT use status colors decoratively
- Do NOT use pure black (`#000`) — darkest is Neutral.950 `#0d0c0a`
- Do NOT leave lorem ipsum — use realistic agency copy
- Do NOT centre paragraphs longer than 2 lines
- Do NOT skip hover/focus/disabled states on interactive elements
- Do NOT auto-play distracting motion without reduced-motion fallback
- Do NOT use more than one display font family per composition

---

### OUTPUT EXPECTATIONS

Deliver:
1. Desktop frames (1440px wide) for all 5 pages
2. Mobile frames (375px wide) for Homepage + Work + Contact
3. Component instances extracted as reusable component sets
4. All text/color/spacing bound to Harmony Figma Variables
5. Prototype connections with smart animate transitions between pages
6. Component descriptions documenting props, states, and microinteraction specs

## PROMPT END
