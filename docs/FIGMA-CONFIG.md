# Harmony — Figma Configuration (canonical)

> The single source of truth for how Harmony is structured **inside Figma**:
> variable collections, modes, scopes, naming, component sets, and Code Connect.
> Code mirrors this; this doc mirrors code. If they drift, `CONTEXT.md` §2 decides.

- Harmony file key: `rna1ko0KAMxJygWQiWQ9KT`
- Portfolio reference file key: `TRUjofEwcRW6XLyxeL9Gxh`

---

## 1. Variable collections (structure)

Six collections. Each variable carries **scopes** (where it can be applied) and a
**WEB code syntax** string (the CSS var an agent should emit).

| Collection | Modes | Types | Code syntax pattern |
| --- | --- | --- | --- |
| **Colour** (primitives) | Mode 1 | COLOR | `--color-{family}-{step}` |
| **Primitive: Type** | Mode 1 | STRING + FLOAT (alias → Unit) | `Family/*`, `Weight/*`, `Size/*`, `Line Height/*`, `Letter Spacing/*` |
| **Unit** (primitives) | Mode 1 | FLOAT (px) | `Unit/{value}` |
| **Scale** (primitives) | Mode 1 | FLOAT (px) | `--space-{name}`, `--radius-{name}` |
| **Semantic: Colour** | Light, Dark | COLOR (alias → Colour) | `--color-{role}` |
| **Semantic: Type Web** | Mode 1 | STRING + FLOAT (alias → Primitive: Type) | `Heading/{size}/Semibold/{prop}`, `Text/{size}/{weight}/{prop}` |

### 1.1 Colour (primitives)
- 6 families × 11 steps (50–950): Brand, Neutral, Green, Red, Blue, Yellow.
- Anchor step = `500`. Values owned by Figma; exported to `tokens/primitives.json`.
- Scope: fills + strokes. Code syntax: `--color-brand-500`, etc.

### 1.2 Semantic (Light / Dark)
- Every variable is an **alias** to a Colour primitive — no raw hex — except
  `overlay/*`, which store a concrete RGBA (neutral primitive + alpha) since Figma
  aliases can't carry opacity.
- Two modes: `Light` and `Dark`. Same variable, different primitive per mode.
- Roles (match `tokens/semantic.json`):
  - `background/{primary,secondary,tertiary,inverse,hover,pressed,selected,disabled,brand,brand-hover,brand-pressed,brand-disabled}`
  - `surface/{default,raised,sunken,overlay}`
  - `overlay/{scrim,backdrop,hover,pressed}` (RGBA, alpha-based)
  - `content/{primary,secondary,tertiary,inverse,disabled,brand,on-brand,positive,negative,notice,info,on-positive,on-negative,on-notice,on-info}`
  - `border/{subtle,default,strong,hover,focus,selected,disabled,brand,positive,negative,notice,info}`
  - `status/{positive,negative,notice,info}`
  - `status-surface/{positive,negative,notice,info}`
- Code syntax: `--color-content-primary`, `--color-status-negative`,
  `--color-background-brand-hover`, `--color-overlay-scrim`, …

### 1.3 Scale
- Spacing: `none,xs,sm,md,lg,xl,2xl,3xl` (px FLOAT). Code: `--space-md`.
- Radius: `none,sm,md,lg,xl,full`. Code: `--radius-lg`.

### 1.4 Unit primitives (`Unit`)
- Numeric step scale (FLOAT px): `Unit/2`, `Unit/4`, `Unit/8`, `Unit/10`, `Unit/12`, `Unit/14`, `Unit/16`, `Unit/18`, `Unit/20`, `Unit/24`, `Unit/26`, `Unit/28`, `Unit/30`, `Unit/32`, `Unit/34`, `Unit/36`, `Unit/40`, `Unit/48`, `Unit/52`, `Unit/56`, `Unit/60`, `Unit/64`, `Unit/72`, `Unit/80`, `Unit/88`, `Unit/96`, `Unit/104`, `Unit/112`, `Unit/120`, `Unit/142`, `Unit/192`.
- Consumed by `Primitive: Type` and `Scale`.

### 1.5 Primitive: Type (`Primitive: Type`)
- Family (STRING): `Family/Clash Grotesk`, `Family/Space Grotesk`, `Family/Roboto`.
- Weight (STRING): `Weight/Regular`, `Weight/Medium`, `Weight/Semi Bold`, `Weight/Bold`.
- Size (FLOAT px, alias → `Unit/*`): `Size/XS` to `Size/10XL` by shirt-size naming.
- Line Height (FLOAT px, alias → `Unit/*`): `Line Height/XS` to `Line Height/10XL` by shirt-size naming.
- Letter Spacing (FLOAT %): `Letter Spacing/2XS` (-2.88), `Letter Spacing/XS` (-1.8), `Letter Spacing/S` (-1.2), `Letter Spacing/M` (-0.96), `Letter Spacing/L` (-0.54), `Letter Spacing/XL` (-0.3), `Letter Spacing/2XL` (-0.12), `Letter Spacing/None` (0), `Letter Spacing/Positive` (0.12).

### 1.6 Semantic: Type Web (`Semantic: Type Web`)
- All variables alias `Primitive: Type`.
- Heading roles: `Heading/{5XL..2XS}/Semibold/{Weight,Size,Line Height,Letter Spacing}`.
- Text roles: `Text/{XL..XS}/{Regular,Semibold}/{Weight,Size,Line Height,Letter Spacing}`.
- Code mirrors the FDS convention: `--heading-5xl-size`, `--text-xl-regular-size`, etc.

---

## 2. Naming & scope rules (in Figma)

- Group with `/` so Figma nests them (e.g. `background/primary`).
- Set **scopes** on every variable so it only appears where valid (color → fills/strokes;
  spacing → gap/padding; radius → corner radius; font size → text).
- Fill the **Code syntax (Web)** field with the exact CSS var from §1 — this is what
  `get_variable_defs` returns and what agents emit. Keep it identical to `.devin/rules/tokens.md`.
- Never store a raw hex in Semantic — always alias a Colour primitive.

---

## 3. Component sets (design-to-code contract)

- Every component is a **component set** (variants), not loose frames.
- Props → Figma properties, `camelCase`; variant values lowercase stable strings
  (`primary/secondary/ghost`, `sm/md/lg`).
- Ship states: default/hover/focus/active/disabled/loading/error.
- Bind every visual property to a **variable** (semantic/component), never a raw value.
- Layer names by role (`container`, `label`, `icon-leading`), auto-layout everything.
- Add a component **description**: purpose, props, usage, a11y.

---

## 4. Code Connect

Links a Figma component set to its Vue/React/RN source. Full steps in
`.devin/skills/code-connect/SKILL.md`. Summary:

1. `get_context_for_code_connect` → real props/variants/tree.
2. `get_code_connect_suggestions` → review vs. actual source path + name.
3. Map Figma props → code props 1:1 (see table below).
4. `send_code_connect_mappings` (one per framework label present).
5. Verify with `get_code_connect_map`.

| Figma property | Vue | React | React Native |
| --- | --- | --- | --- |
| `variant` | prop `variant` | prop `variant` | prop `variant` |
| `size` | prop `size` | prop `size` | prop `size` |
| boolean `disabled` | prop `disabled` | prop `disabled` | prop `disabled` |
| instance-swap `icon` | slot / prop | children / prop | prop |

---

## 5. Documentation pages (Foundations)

The `🌈 Foundations` page holds 6 editorial docs frames (`01 · Cover` →
`06 · Space & Radius`), 1920px wide, bound to live variables. Navigate: select the
`🌈 Foundations` page, then **Shift + 1** (zoom to fit).

---

## 6. Sync contract (Figma ⇆ code)

- Primitive change → edit in Figma, export to `tokens/primitives.json`, run docs-sync.
- Semantic/component change → edit token JSON, mirror into the Figma collection, run docs-sync.
- Never let Figma and `tokens/*.json` diverge silently; `CONTEXT.md` §2 resolves conflicts.

---

## 7. Portfolio reference capture — component-type pages

The EM Mendoza 2026-ultimate-portfolio has been reverse-engineered into Harmony component specs. To bring the live site into the Harmony Figma file (`rna1ko0KAMxJygWQiWQ9KT`) for visual reference, create **pages by component type**, not by site page. This keeps the design system scannable and mirrors the `components/specs/` structure.

### 7.1 Suggested Figma page list

Keep the existing `Cover` and `🌈 Foundations` pages, then add:

| # | Page name | What to place here | Source URL |
|---|-----------|--------------------|------------|
| 01 | `🧭 Components / Navigation` | Header (default, scrolled), MobileNav (open/closed) | `http://localhost:3000/` + `http://localhost:3000/about` |
| 02 | `✨ Components / Hero` | HeroBanner, MobileHeroBanner, MediaHero | `http://localhost:3000/` + `http://localhost:3000/playground/leveraging-web-development-with-ai` |
| 03 | `🔤 Components / Display Text` | Headline, BannerLayout, TextSection, ArticleTitleSection, QuoteSection | `http://localhost:3000/about` + `http://localhost:3000/playground/creative-photography-portfolio` |
| 04 | `👤 Components / Bio` | BioSection, MobileBioSection | `http://localhost:3000/about` |
| 05 | `💼 Components / Service Cards` | ServiceItems, MobileServiceItems | `http://localhost:3000/` |
| 06 | `🖼 Components / Project Grid` | HomeProjects, ProjectThumbnail, SkillsMarquee | `http://localhost:3000/` + `http://localhost:3000/projects` |
| 07 | `📽 Components / Project Presentation` | ProjectPresentation, MobileProjectPresentation | `http://localhost:3000/projects/novated-lease-australia` |
| 08 | `🧪 Components / Experiment Card` | HomeExperiments, MobileHomeExperiments | `http://localhost:3000/` + `http://localhost:3000/playground` |
| 09 | `✍ Components / Article` | ArticleMeta, ArticleParagraph, ArticleShare, ArticleExperiments | `http://localhost:3000/playground/leveraging-web-development-with-ai` |
| 10 | `🎞 Components / Media` | FullWidthImage, ImageSection, TwoColumnImages, ImageBackground, mobile variants | `http://localhost:3000/about` + `http://localhost:3000/playground/motion-design-experiments` |
| 11 | `➡ Components / Sliders & Marquees` | AutoScrollSlider, DualDirectionSlider, InteractiveDragSlider, SkillsMarquee | `http://localhost:3000/` + `http://localhost:3000/playground` |
| 12 | `🌌 Components / Transitions` | PageTransition, Preloader, SmoothScroller | `http://localhost:3000/` (refresh to trigger) |
| 13 | `📊 Components / Work Experience` | WorkExperience timeline | `http://localhost:3000/about` |
| 14 | `💎 Components / Values` | SelectedWorkCaptions | `http://localhost:3000/` |
| 15 | `🔜 Components / Next Experiment` | NextExperiment, MobileNextExperiment | `http://localhost:3000/playground/leveraging-web-development-with-ai` |
| 16 | `🦶 Components / Footer` | Footer, FooterCta, FooterList | `http://localhost:3000/` + `http://localhost:3000/about` |
| 17 | `📄 Templates / Home` | Full home page, desktop + mobile | `http://localhost:3000/` |
| 18 | `📄 Templates / About` | Full about page, desktop + mobile | `http://localhost:3000/about` |
| 19 | `📄 Templates / Projects` | Full projects index | `http://localhost:3000/projects` |
| 20 | `📄 Templates / Project Detail` | `novated-lease-australia` case study | `http://localhost:3000/projects/novated-lease-australia` |
| 21 | `📄 Templates / Playground` | Full playground index | `http://localhost:3000/playground` |
| 22 | `📄 Templates / Experiment Detail` | `leveraging-web-development-with-ai` article | `http://localhost:3000/playground/leveraging-web-development-with-ai` |
| 23 | `🧪 Archive / WIP` | In-progress or superseded explorations | — |

### 7.2 How to populate each page

1. Open the source URL in a browser at the target viewport.
2. Screenshot the full page or the isolated section (use the browser's element inspector to crop to a specific component's DOM node if available).
3. Paste the screenshot into the matching Figma page as a locked reference image.
4. Trace the reference image into **component sets** following §3 naming and §2 token rules.

### 7.3 Recommended capture viewports

| Surface | Width × Height | Notes |
|---------|----------------|-------|
| Desktop | 1440 × 900 (or full scroll) | Primary component spec viewport |
| Mobile | 390 × 844 | iPhone 14/15 viewport for mobile variants |
| Tablet | 768 × 1024 | Optional middle breakpoint |

### 7.4 Handy detail URLs

- Project detail: `http://localhost:3000/projects/{slug}`
  - `novated-lease-australia`
  - `launchpad6-contest-builder`
  - `colombia-france-year`
  - `nabica-official-website`
  - `hawksbill-conservation-app`
- Experiment detail: `http://localhost:3000/playground/{slug}`
  - `leveraging-web-development-with-ai`
  - `creative-photography-portfolio`
  - `motion-design-experiments`

### 7.5 Figma file key (reference)

- Harmony: `rna1ko0KAMxJygWQiWQ9KT`
- Portfolio reference: `TRUjofEwcRW6XLyxeL9Gxh`

---

## 8. Hero tokenization reference

The `HeroBanner` component set (`✨ Hero` page) was imported **exactly** from the 2026-ultimate-portfolio Figma node `192-1104`. Both the desktop and mobile versions are tokenized to Harmony variables.

### 8.1 Component set

| Component | Variant / Component | Source node |
|-----------|---------------------|-------------|
| `HeroBanner` | `Property 1=default`, `Property 1=parallax2`, `Property 1=Variant3` | `TRUjofEwcRW6XLyxeL9Gxh` `426:1557` |
| `HeroBanner / Mobile` | mobile variant | `TRUjofEwcRW6XLyxeL9Gxh` `426:1467` |

### 8.2 Token bindings

| Element | Property | Harmony Figma variable | Resolved value |
|---|---|---|---|
| Desktop headline words | `fontSize` | `Unit/192` | 192px |
| Desktop headline words | `lineHeight` | `Unit/142` | 142px |
| Desktop headline words | `fills` | `content/primary` | #1e1e1e |
| Desktop headline words | `fontName` | `font/display` | Clash Grotesk Bold |
| Mobile headline words | `fontSize` | `Unit/56` | 56px |
| Mobile headline words | `lineHeight` | `Unit/64` | 64px |
| Mobile tagline | `fontSize` | `Unit/12` | 12px |
| Mobile tagline | `lineHeight` | `Unit/16` | 16px |
| Mobile tagline | `fontName` | `font/body` | Roboto Regular |
| Desktop tagline | `fontSize` | `Unit/20` | 20px |
| Desktop tagline | `lineHeight` | `Unit/28` | 28px |
| Desktop tagline | `fontName` | `font/sans` | Space Grotesk SemiBold |
| Section background | `fills` | `background/primary` | #ffffff |
| Container padding (x) | `paddingLeft` / `paddingRight` | `space/xl` | 24px |
| Container padding (bottom) | `paddingBottom` | `space/4xl` | 48px |
| Row/headline gap | `itemSpacing` | `Unit/12` | 12px |
| Mobile inter-word gap | `itemSpacing` | `space/sm` | 8px |
| Mobile inter-row gap | `itemSpacing` | `Unit/2` | 2px |

### 8.3 Notes

- Letter-spacing values (`-6px` desktop, `-1px` mobile) are not tokenized because Harmony has no matching step in the letter-spacing scale. They are left as raw values.
- Image placeholders are the exact cropped images from the portfolio file; the 3 desktop inline images and mobile image behavior are preserved as imported.
- Figma node `245:162` is the canonical `HeroBanner` component set.

## 9. Additional portfolio components imported

Imported from nodes `199:2065` (Sliders & Marquees) and `199:2066` (sections / page components) into the Harmony Figma file. All dimensions, spacing, typography, and colours are bound to Harmony variables.

### 9.1 Component sets

| Page | Component set | Variants | Harmony node | Source node |
|------|---------------|----------|--------------|-------------|
| `➡ Sliders & Marquees` | `SliderMessage` | `mode=dark`, `mode=light` | `256:89` | `199:2065` slider section |
| `📊 Work Experience` | `WorkExperience` | `mode=Default`, `mode=mobile` | `259:100` | `224:5152` |
| `💎 Values Section` | `SelectedWorkCaptions` | `mode=Default`, `mode=mobile` | `260:113` | `206:4236` / `206:4238` |
| `✨ Hero` | `NextProjectBanner` | `property1=Default`, `property1=Mobile` | `265:33` | `531:2221` |

### 9.2 New / used primitives and tokens

| Token | Value | Used in |
|-------|-------|---------|
| `Unit/160` | 160px | `SliderMessage` large marquee text (mobile) |
| `Unit/280` | 280px | `NextProjectBanner` desktop slider text |
| `Unit/21` | 21px | `NextProjectBanner` desktop header leading |
| `Unit/34` | 34px | `NextProjectBanner` mobile title leading |
| `Unit/60` | 60px | `NextProjectBanner` desktop title leading |
| `Unit/72` | 72px | `WorkExperience` desktop index number |
| `Unit/80` | 80px | `WorkExperience` desktop index number leading |
| `Unit/56` | 56px | `WorkExperience` right-column `paddingLeft` |

### 9.3 Semantic colour choices

- Portfolio `#1e1e1e` dark surfaces mapped to `Neutral/900` and `Neutral/800` (`background/inverse` not available at that exact value).
- Portfolio `#d2d2d2` muted text mapped to `Neutral/300`.
- Portfolio `#ffffff` / `white/100` text mapped to `content/inverse`.
- Portfolio `#787878` (`black/300`) borders / secondary text mapped to `Neutral/500`.

### 9.4 Notes

- Image assets from the portfolio cannot be transferred through the Figma MCP, so image placeholders use `Neutral/500` rectangles. Replace with the exported portfolio assets if exact images are required.
- Font smoothing / antialiasing differences and opacity tints (e.g. `rgba(255,255,255,0.6)`) are represented by the nearest semantic/primitive tokens because Harmony has no variable-opacity tokens.

## 10. Continued import batch

Additional components built on the next pass:

| Page | Component set | Variants | Harmony node | Source node |
|------|---------------|----------|--------------|-------------|
| `🔤 Display Text` | `TextSection` | `mode=Default`, `mode=mobile` | `266:25` | `224:5069` |
| `🔤 Display Text` | `TextContentSection2` | `mode=Default`, `mode=mobile` | `266:26` | `224:5079` |
| `🖼 Project Grid` | `FeaturedProject` | `mode=Default`, `mode=mobile` | `267:37` | `202:3126` |

### 10.1 Tokens used in this batch

| Token | Value | Used in |
|-------|-------|---------|
| `Unit/32` | 32px | `TextSection` body copy, `TextContentSection2` n/a |
| `Unit/40` | 40px | `TextSection` body leading |
| `Unit/48` | 48px | `TextContentSection2` mobile headline |
| `Unit/56` | 56px | `TextContentSection2` mobile leading |
| `Unit/72` | 72px | `TextSection` index number, `TextContentSection2` desktop headline |
| `Unit/80` | 80px | `TextSection` index leading, `TextContentSection2` desktop leading |
| `Unit/12` | 12px | `FeaturedProject` inner padding |
| `background/primary` | `#ffffff` | `TextSection`, `TextContentSection2`, `FeaturedProject` surfaces |
| `content/primary` | `#161512` | `TextSection`, `TextContentSection2`, `FeaturedProject` primary text |
| `Neutral/500` | `#787470` | `FeaturedProject` metadata, `TextSection` underline |
| `Neutral/300` | `#c7c4bc` | `FeaturedProject` image placeholder |

### 10.2 Notes

- `TextSection` uses `whitespace-pre-wrap` equivalent (`textAutoResize = 'HEIGHT'`) to preserve the paragraph breaks in the body copy.
- `FeaturedProject` uses `Neutral/300` as the image placeholder because the section sits on a white background.

## 11. About Section

| Page | Component set | Variants | Harmony node | Source node |
|------|---------------|----------|--------------|-------------|
| `👤 Bio Section` | `AboutSection` | `property1=Default`, `property1=Variant2` | `272:69` | `573:1992` |

### 11.1 New / used tokens

| Token | Value | Used in |
|-------|-------|---------|
| `Unit/10` | 10px | stats labels, image footer |
| `Unit/12` | 12px | section label |
| `Unit/14` | 14px | vertical sidebar labels |
| `Unit/15` | 15px | body copy size |
| `Unit/26` | 26px | body copy leading |
| `Unit/32` | 32px | stats numbers, mobile headline |
| `Unit/34` | 34px | mobile headline leading |
| `Unit/54` | 54px | desktop headline size |
| `Unit/56` | 56px | desktop headline leading |
| `Neutral/300` | `#c7c4bc` | borders and image placeholder |
| `Neutral/500` | `#787470` | small caps metadata text |
| `content/primary` | `#161512` | primary text, borders |
| `content/inverse` | `#f8f7f5` | image footer text |

### 11.2 Notes

- The portfolio uses `Instrument Serif:Italic` for the headline accent words. That font is not installed in Harmony, so the words fall back to `Space Grotesk` / `Clash Grotesk`.
- Vertical sidebar labels are rotated text nodes rather than separate font styles.

## 12. Image Section 2 — Style 1

| Page | Component set | Variants | Harmony node | Source node |
|------|---------------|----------|--------------|-------------|
| `🎞 Media` | `ImageSection2Style1` | `mode=Default`, `mode=mobile` | `273:11` | `240:7965` |

### 12.1 Tokens

| Token | Value | Used in |
|-------|-------|---------|
| `space/lg` | 24px | container padding, image gap |
| `Neutral/300` | `#c7c4bc` | image placeholder |
| `background/primary` | `#ffffff` | section background |

### 12.2 Notes

- Desktop: two `696×860` images side by side.
- Mobile: two `684×528` images stacked vertically.

## 13. Article Title Section

| Page | Component set | Variants | Harmony node | Source node |
|------|---------------|----------|--------------|-------------|
| `✍ Article` | `ArticleTitleSection` | `mode=Default`, `mode=mobile` | `274:11` | `224:5092` |

### 13.1 Tokens

| Token | Value | Used in |
|-------|-------|---------|
| `Unit/40` | 40px | quote text size |
| `Unit/48` | 48px | quote leading |
| `Unit/80` | 80px | desktop left indent |
| `content/primary` | `#161512` | quote text |
| `background/primary` | `#ffffff` | background |
| `space/lg` | 24px | container padding |
| `space/2xl` | 48px | container padding y |

## 14. Project Presentation

| Page | Component set | Variants | Harmony node | Source node |
|------|---------------|----------|--------------|-------------|
| `📽 Project Presentation` | `ProjectPresentation` | `mode=Default`, `mode=mobile` | `276:62` | `235:6167` |

### 14.1 Tokens

| Token | Value | Used in |
|-------|-------|---------|
| `Unit/14` | 14px | list year, list items |
| `Unit/16` | 16px | list title, mobile meta |
| `Unit/20` | 20px | mobile heading/body, CTA label |
| `Unit/24` | 24px | body leading |
| `Unit/28` | 28px | body leading, CTA label leading |
| `Unit/32` | 32px | desktop CTA title |
| `Unit/40` | 40px | CTA title leading |
| `Neutral/300` | `#c7c4bc` | desktop surface, mobile top border |
| `Neutral/500` | `#787470` | list image placeholder, inactive nav button |
| `Neutral/700` | `#3f3b35` | right-side hero image placeholder |
| `Neutral/900` | `#161512` | top/bottom borders, active nav, CTA bar |
| `content/primary` | `#161512` | primary text |
| `content/inverse` | `#f8f7f5` | CTA text |
| `background/primary` | `#ffffff` | left column, mobile background |
| `space/lg` | 24px | list padding, mobile padding |
| `space/3xl` | 40px | desktop left column vertical padding |
| `space/sm` | 8px | mobile detail gaps |

### 14.2 Notes

- The 6 project thumbnails in the desktop list are placeholders; real portfolio images are not transferred by the MCP.
- The mobile variant uses a single project-detail state (`EM® — 02` / `E-COMMERCE PLATFORM`) with a `WHAT WAS DONE` task list.

---

## 15. Manual import grouping structure

The remaining portfolio components should be imported by component type into the existing Harmony pages. Each page gets a `📍 Cover` frame, then one row per component set (`Default` variant top, `mobile` variant 200 px below, 24 px gaps).

### 15.1 Target page mapping

| Target page | Portfolio source components to place there |
|-------------|----------------------------------------------|
| `🧭 Navigation` | Header, mobile nav, menu states |
| `✨ Hero` | `NextProjectBanner` (done), hero media / background blocks |
| `🔤 Display Text` | `TEXT CONTENT SECTION`, `HEADLINE SECTION`, `TextSection` (done), `TextContentSection2` (done) |
| `👤 Bio Section` | `BIO SECTION`, `AboutSection` (done) |
| `💼 Service Cards` | service / offering frames |
| `🖼 Project Grid` | `Featured project` (done) |
| `📽 Project Presentation` | `PROJECT Presentation` (done) |
| `🧪 Experiment Card` | experiment card / caption frames |
| `✍ Article` | `Article title section`, `Article Sections`, `ArticleTitleSection` (done) |
| `🎞 Media` | `Image Section 2 style 1` (done), full-width images, background media |
| `➡ Sliders & Marquees` | `Slider Message` (done) |
| `🌌 Transitions` | page-transition / effect frames |
| `📊 Work Experience` | `WorkExperience` (done) |
| `💎 Values Section` | `SelectedWorkCaptions` (done) |
| `🔜 Next Experiment` | `Next Project Banner` / CTA frames |
| `🦶 Footer` | footer frames |

### 15.2 New / verified primitives for manual import

| Token | Value | Collection | Use |
|-------|-------|------------|-----|
| `Unit/11` | 11px | `Unit` | bio small caps / metadata |
| `Unit/13` | 13px | `Unit` | vertical sidebar labels |
| `Unit/22` | 22px | `Unit` | body leading approximations |
| `Unit/55` | 55px | `Unit` | desktop headline size/leading |
| `Unit/112` | 112px | `Unit` | `ELKIN` / `MENDOZA` display text |
| `Family/Instrument Serif` | `Instrument Serif` | `Primitive: Type` | italic serif accent text |

### 15.3 Manual import conventions

1. Component set name = PascalCase source name with spaces removed.
2. Default variant = `mode=Default`. If a mobile variant exists, add `mode=mobile`.
3. If a source has only one state, still create both `Default` and `mobile` variants.
4. Bind every dimension, color, spacing, and type value to a Harmony variable.
5. Add a description to the set: source node, tokens used, placeholder notes.
6. Record the imported set in `docs/FIGMA-CONFIG.md`.
7. Export images from the portfolio source first; the Figma MCP cannot transfer images.

## 16. Implemented batch since the plan was approved

| # | Component set | Page | Variants | Harmony node | Source node |
|---|---------------|------|----------|--------------|-------------|
| 1 | `HeadlineSection` | `🔤 Display Text` | `mode=Default`, `mode=mobile` | `280:11` | `202:3152` |
| 2 | `BioSection` | `👤 Bio Section` | `mode=Default`, `mode=mobile` | `281:42` | `202:3019` |
| 3 | `ExperimentCaption` | `🧪 Experiment Card` | `mode=Default`, `mode=mobile` | `282:37` | `237:7857` |
| 4 | `ArticleParagraph1` | `✍ Article` | `mode=Default`, `mode=mobile` | `282:99` | `240:7915` |
| 5 | `ServiceItems` | `💼 Service Cards` | `mode=Default`, `mode=mobile` | `284:71` | `227:5456` |
| 6 | `BackgroundWithSpace` | `🎞 Media` | `mode=Default`, `mode=mobile` | `285:9` | `240:7893` |
| 7 | `ImageSection2Col` | `🎞 Media` | `mode=Default`, `mode=mobile` | `285:49` | `240:7945` |

### 16.1 Tokens used in this batch

| Token | Value | Used in |
|-------|-------|---------|
| `Unit/11` | 11px | `BioSection` metadata, `ExperimentCaption` small text |
| `Unit/13` | 13px | `BioSection` vertical labels |
| `Unit/15` | 15px | `BioSection` body, `ArticleParagraph1` body |
| `Unit/24` | 24px | `ServiceItems` body, `ArticleParagraph1` body leading |
| `Unit/26` | 26px | `BioSection` body leading |
| `Unit/32` | 32px | `ServiceItems` first card title |
| `Unit/40` | 40px | `HeadlineSection` mobile, `ServiceItems` titles |
| `Unit/48` | 48px | `HeadlineSection` mobile, `ServiceItems` title leading |
| `Unit/80` | 80px | `BioSection` mobile display |
| `Unit/112` | 112px | `BioSection` desktop display, `ServiceItems` numbers |
| `Unit/120` | 120px | `ServiceItems` numbers |
| `Family/Clash Grotesk` / `Family/Space Grotesk` / `Family/Roboto` | font families | typography |
| `content/primary` | `#161512` | text, borders |
| `background/primary` | `#ffffff` | surfaces |
| `Neutral/300` | `#c7c4bc` | image placeholders |

### 16.2 Notes

- `HeadlineSection` is a large display `SELECTED` / `WORK` headline.
- `BioSection` is the `ELKIN` / `MENDOZA` + photo column + description block.
- `ServiceItems` uses `Unit/120` for the index numbers and `Unit/112` for their line-height; the card widths (552/624 px) were used directly because they fall outside the Harmony `Unit` scale.
- `BackgroundWithSpace` and `ImageSection2Col` use `Neutral/300` rectangles as image placeholders.

## 17. Component rename log

All Figma `COMPONENT` and `COMPONENT_SET` names were normalized to **PascalCase / generic names** so they can be reused across different pages and contexts. Final names in the Figma file:

| Page | Generic name | Notes |
|------|--------------|-------|
| `🔨 Tools` | `Spacer`, `TableCell`, `TableHeader`, `Badge`, `Token` | removed `Tools/` prefix |
| `🧭 Navigation` | `Header`, `MobileNavClosed`, `MobileNavOpen` | normalized slash / spaces |
| `🔤 Display Text` | `Headline`, `BannerLayout`, `QuoteSection`, `DescriptionColumn`, `MarqueeText`, `TextSection`, `ArticleSection`, `ArticleParagraphLarge`, `ArticleHeader`, `TextContent`, `CaptionGrid`, `DisplayHeadline`, `DisplayStatement` | genericized source labels |
| `Grids & Cards` | `AboutSection`, `ProjectCardXl`, `ProjectCardLandscape`, `ImageGridTwo`, `ArticleSections` | PascalCase, removed long titles |
| `💼 Service Cards` | `ServiceCard`, `ServiceCards` | |
| `🖼 Project Grid` | `ProjectThumbnail`, `ProjectGrid`, `SkillsMarquee`, `FeaturedProject` | |
| `🧪 Experiment Card` | `Pagination` | was `Experiments Pagination Desktop` |
| `✍ Article` | `ArticleMeta`, `ArticleParagraph`, `ArticleShare`, `ArticleTitleSection`, `ArticleBody` | |
| `➡ Sliders & Marquees` | `AutoScrollSlider`, `DualDirectionSlider`, `InteractiveDragSlider`, `SliderMessage`, `TitleImageSlider`, `ServiceCards`, `ProjectShowcase` | |
| `🌌 Transitions` | `PageTransition`, `Preloader` | |
| `📊 Accordions & Graphs` | `AccordionList` | |
| `🦶 Footer` | `FooterCta`, `FooterList` | |

Note: earlier sections of this document may still reference the old names; update those references when you maintain `FIGMA-CONFIG.md`.

## 18. Component tokenization pass

All components in the Harmony Figma file were audited and every bindable styling property was pointed to a Harmony variable.

### 18.1 Bound properties

| Property | Bound count | Notes |
|----------|-------------|-------|
| Fill colors | ~180 | Mapped to semantic/primitive color tokens by context (text → `content/*`, frames → `background/*`/`Neutral/*`, strokes → `border/*`). |
| Stroke colors | ~55 | Same color mapping; remaining unbound strokes are off-palette purples. |
| `fontSize` | ~194 | `Semantic: Type Web`/`Unit` tokens. |
| `lineHeight` | ~105 | `Semantic: Type Web`/`Unit`/primitive line-height tokens. |
| `letterSpacing` | ~176 | `Primitive: Type` and `Semantic: Type Web` letter-spacing tokens. |
| `paddingLeft/Right/Top/Bottom` | ~2,012 | `space/*` for standard values, `Unit/*` for outliers. |
| `itemSpacing` | ~493 | `space/*` or `Unit/*`. |
| `fontFamily` | ~184 | `font/display`, `font/sans`, `font/body`, plus `Family/Inter` and `Family/Menlo`. |
| `fontStyle` | ~214 | `Weight/*` primitive tokens (`Regular`, `Medium`, `Semi Bold`, `Bold`). |

### 18.2 New tokens created

| Token | Value | Reason |
|-------|-------|--------|
| `Unit/3` | 3 | tiny label font sizes / spacing |
| `Unit/6` | 6 | small spacing |
| `Unit/17` | 17 | odd font/ spacing values |
| `Unit/44` | 44 | line-height outlier |
| `Unit/50` | 49.9956 | padding approx |
| `Unit/62` | 61.969 | scaled font size |
| `Unit/67` | 66.661 | padding approx |
| `Unit/74` | 74 | item spacing outlier |
| `Unit/83` | 83.326 | scaled font size |
| `Unit/100` | 100 | image / media dimensions |
| `Unit/124` | 124.422 | padding approx |
| `Unit/151` | 151 | item spacing outlier |
| `Unit/175` | 174.922 | item spacing approx |
| `Unit/233` | 233.102 | item spacing approx |
| `Unit/249` | 249.047 | item spacing approx |
| `Unit/322` | 322 | item spacing outlier |
| `Unit/347` | 347 | horizontal padding in mobile bio |
| `Unit/359` | 359 | item spacing outlier |
| `Unit/394-5` | 394.5 | horizontal padding in `ProjectShowcase` |
| `Unit/931` | 931.437 | large slider gap in `ProjectShowcase` |
| `radius/2xl` | 24 | larger card radius |
| `radius/3xl` | 48 | even larger radius |

### 18.3 Typography fallback cleanup

The imported `Tools` components originally used `Inter` and `Menlo`. Those were mapped to the Harmony type system:

- `Inter` → `font/sans` (`Space Grotesk`) — 65 text nodes total.
- `Menlo` → `font/body` (`Roboto`) — 6 text nodes total.

The temporary `Family/Inter` and `Family/Menlo` primitive tokens were then removed.

### 18.4 Semantic typography binding

All text nodes were pointed to `Semantic: Typography` tokens for the `font-weight`, `heading`, and `text` parameters:

- `fontFamily` → `font/display`, `font/sans`, `font/body`.
- `fontWeight` → `font-weight/regular`, `font-weight/medium`, `font-weight/semibold`, `font-weight/bold`.
- `fontSize`, `lineHeight`, `letterSpacing` → the matching `heading/{variant}/...` or `text/{variant}/...` token when the value exists in the canonical scale.
- `heading/9xl` was created in Figma (`size: 192`, `line-height: 142`, `letter-spacing: -5.76`) to cover the largest display text.

Bound counts in this pass:

- `fontFamily` normalized: 175
- `fontWeight` bound: 223
- `fontSize` → `heading`/`text` token: 3
- `lineHeight` → `heading`/`text` token: 2
- `letterSpacing` → `heading`/`text` token: 0

The low counts for `fontSize`, `lineHeight`, and `letterSpacing` reflect that most imported text values (e.g. 83, 112, 120, 160 px) are not part of the canonical `heading`/`text` scale. To bind them, either the component text sizes must be adjusted to the canonical scale or new `heading`/`text` tokens must be added to `tokens/semantic.json` and Figma.

### 18.5 Token files updated

- `tokens/primitives.json` — extended `Unit` with the new values, added the full `Scale` collection (`space/*` and `radius/*`).

### 18.4 What could not be tokenized

- **`cornerRadius`** — Figma's plugin API does not support `setBoundVariable('cornerRadius', ...)`, so radii stay as raw numeric values even though the matching `radius/*` variables exist.
- **Negative auto-layout padding** in `ArticleSections` `Container` (`paddingLeft: -145.99`, `paddingTop: -141.99`, etc.) — negative values cannot be bound to tokens.
- **Three off-palette purple stroke colors** (`#7b61ff`, `#9747ff`, `#8a38f5`) — no matching color token in the 6 canonical families.

---

## 19. Component Architecture v2

The Harmony component library has been restructured into a **utility-first architecture** designed for reuse across multiple website verticals: Photography/Videography, Digital Agency, Fashion Ecommerce, and Promotional Landing Pages.

### 19.1 Page structure (updated)

| Page | Purpose |
|------|---------|
| `🔨 Tools` | Atomic utilities: `Spacer`, `TableCell`, `TableHeader`, `Badge`, `Token` |
| `🧭 Navigation` | `Header`, `MobileNavClosed`, `MobileNavOpen` |
| `🔤 Display Text` | `Headline`, `BannerLayout`, `QuoteSection`, `DisplayStatement`, `DisplayHeadline`, `DescriptionColumn`, `MarqueeText`, `TextSection`, `ArticleSection`, `ArticleParagraphLarge`, `ArticleHeader`, `TextContent`, `CaptionGrid` |
| `Grids & Cards` | `AboutSection`, `ProjectCardXl`, `ProjectCardLandscape`, `ImageGridTwo`, `ArticleSections` |
| `💼 Service Cards` | `ServiceCard`, `ServiceCards` |
| `🖼 Project Grid` | `ProjectThumbnail`, `ProjectGrid`, `SkillsMarquee`, `FeaturedProject` |
| `🧪 Experiment Card` | `Pagination` |
| `✍ Article` | `ArticleMeta`, `ArticleParagraph`, `ArticleShare`, `ArticleTitleSection`, `ArticleBody` |
| `➡ Sliders & Marquees` | `AutoScrollSlider`, `DualDirectionSlider`, `InteractiveDragSlider`, `SliderMessage`, `TitleImageSlider`, `ServiceCards`, `ProjectShowcase` |
| `🌌 Transitions` | `PageTransition`, `Preloader` |
| `📊 Accordions & Graphs` | `AccordionList` |
| `🦶 Footer` | `FooterCta`, `FooterList` |
| `✨ Microinteractions` | Interaction annotation cards (12 components documented) |

### 19.2 Existing → New architecture mapping

| New Category | Existing Figma Components |
|-------------|--------------------------|
| `ui/Badge` | `Badge` (14 variants) |
| `navigation/Navbar` | `Header` |
| `navigation/MobileMenu` | `MobileNavOpen` + `MobileNavClosed` |
| `navigation/Pagination` | `Pagination` |
| `content/ProjectCard` | `ProjectCardXl` (5 sizes) + `ProjectCardLandscape` (5 sizes) |
| `content/ArticleCard` | `ArticleSections` |
| `media/Carousel` | `AutoScrollSlider`, `InteractiveDragSlider`, `DualDirectionSlider` |
| `interaction/Marquee` | `MarqueeText`, `SkillsMarquee` |
| `interaction/Reveal` | `PageTransition` (generalized) |
| `layout/Grid` | `ImageGridTwo` |

### 19.3 Microinteraction page

The `✨ Microinteractions` page contains 12 annotation cards documenting motion specs for: `Button`, `Card`, `ProjectCard`, `ProductCard`, `Navbar`, `MobileMenu`, `Magnetic`, `Marquee`, `Carousel`, `Modal`, `Reveal`, `ScrollProgress`.

Each card specifies:
- **Trigger** (hover, click, scroll, focus, mount)
- **Animation** (transform, opacity, clip-path, spring physics)
- **Duration/easing** (spring params or cubic-bezier)
- **Reduced motion** fallback

Inspired by [Aceternity UI](https://ui.aceternity.com/) patterns: magnetic hover, stagger reveals, momentum drag, spring physics, cursor-aware tilt.

### 19.4 Industry verticals supported

| Vertical | Key components used |
|----------|-------------------|
| Photography/Videography | `media/MediaGallery`, `media/Lightbox`, `media/VideoPlayer`, `content/ProjectCard`, `interaction/Parallax` |
| Digital Agency | `interaction/Magnetic`, `interaction/Marquee`, `content/Card`, `content/TeamMember`, `interaction/Reveal` |
| Fashion Ecommerce | `content/ProductCard`, `layout/Grid`, `ui/Drawer`, `media/Carousel`, `ui/Select` |
| Fashion Landing Page | `media/Video`, `interaction/Reveal`, `media/Carousel`, `interaction/Parallax`, `ui/Modal` |

See `components/README.md` for the full architecture, mapping table, and per-component microinteraction matrix.
