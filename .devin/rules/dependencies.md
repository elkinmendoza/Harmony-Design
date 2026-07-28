# Harmony — Dependency & Stack Rule

> Applies to any code generation or package decision across the three targets.

## Targets
- **Web (Vue 3 + React 18/19)** and **React Native** share one token contract.
- Styling: **Tailwind CSS v4** (`@theme`) on web; token objects / StyleSheet on RN.

## Version strategy
- Always latest **stable** (LTS where available). No alpha/beta/canary in production.
- Pin with `^` (controlled minor updates). Never `*`.
- One package manager per repo; never mix lockfiles.

## Modern patterns only
- Function components + hooks. **No class components.**
- No deprecated APIs / legacy lifecycle methods.
- Vue: Composition API + `<script setup>`. React: modern hooks + Server Components
  where the framework supports them; add `"use client"` only for interactivity.
- GSAP v3+ (`gsap`, `gsap.timeline()`, `ScrollTrigger` registered) — no TweenLite/TimelineLite.
- Imports at the top of the file, always.

## Hygiene & security
- Remove unused deps; avoid duplicate libraries solving the same problem.
- Keep bundle minimal. Run vulnerability checks; patch critical issues immediately.
- Review breaking changes + changelogs before upgrading.

## TypeScript
- Typed prop interfaces for every component.
- Typed DOM refs (`useRef<HTMLDivElement>`).
- Identical prop shape across Vue/React/RN — only implementation differs.
