---
name: template-build
description: Build a React or React Native template from a Figma design using Harmony foundations
---

# Skill: Template Build (Figma → React / React Native)

Use when transforming a Figma template (e.g. the agency template) into a working
React (Next.js) or React Native (Expo) implementation.

## Prerequisites

- Figma template exists with all tokens bound to Harmony variables.
- `foundations/theme.css` is up to date (run docs-sync first if not).
- `components/specs/` has specs for the components used in the template.
- Monorepo packages exist: `packages/web` (Next.js) and/or `packages/mobile` (Expo).

## Steps

1. **Identify the template** — get the Figma file key + page/node id.
2. **Pull design context** — run `get_design_context` + `get_variable_defs` via
   Figma MCP to capture structure, tokens, and layout.
3. **Map to component specs** — cross-reference the template sections against
   `components/specs/*.md` and `components/README.md` architecture.
4. **Scaffold pages** — create page files in the target package:
   - **React (Next.js):** `packages/web/app/(pages)/` using App Router.
   - **React Native (Expo):** `packages/mobile/app/` using Expo Router.
5. **Implement components** — for each section in the template:
   - Check if the component already exists in `packages/*/components/`.
   - If not, run the component-build skill first.
   - Wire up semantic tokens via Tailwind (web) or StyleSheet (RN).
6. **Apply layout rules** — follow `docs/DESIGN.md` §5:
   - 12-col grid, max 1440px, responsive breakpoints.
   - Section rhythm: `space-4xl` standard, `space-5xl` hero/feature.
   - Mobile-first progressive enhancement.
7. **Wire fonts** — load Clash Grotesk, Space Grotesk, Roboto per platform:
   - **Web:** `@font-face` or Google Fonts, mapped to `--font-display/sans/body`.
   - **RN:** `expo-font` with the same token mapping.
8. **Implement dark mode** — ensure the theme toggle works:
   - **Web:** `[data-theme="dark"]` + `prefers-color-scheme` media query.
   - **RN:** `useColorScheme()` + token objects per mode.
9. **Add microinteractions** — per component spec and `SKILL.md` §5:
   - **Web:** GSAP for complex, CSS transitions for simple.
   - **RN:** Reanimated for complex, Animated API for simple.
   - Always respect `prefers-reduced-motion`.
10. **Verify** — run the app, check:
    - All tokens resolve (no hardcoded hex/px).
    - Light + dark modes work.
    - Responsive at 640/768/1024/1280/1536 breakpoints.
    - WCAG AA contrast on all text.
    - Touch targets >= 44pt on mobile.

## Guardrails

- Never hardcode colors, spacing, or font values — use tokens only.
- Identical component prop shapes across React and React Native.
- Figma MCP output is a reference to adapt, not paste verbatim.
- Images from Figma MCP are placeholders — use Next.js Image or RN Image.
- Follow `.devin/rules/dependencies.md` for all package choices.
