---
description: Build a Harmony component across Vue / React / React Native from a Figma component set
---

# Workflow: Component Build (cross-framework)

Use when turning a Figma component set into production components.

1. Load `AGENTS.md` §7, `.devin/rules/dependencies.md`, `.devin/rules/accessibility.md`,
   and `tokens/components.json`.
2. Read the Figma component set via MCP `get_design_context` + `get_variable_defs`.
   Confirm it is a **component set** with `camelCase` props and lowercase variant values.
3. Define the shared **prop contract** (identical shape across all 3 frameworks):
   `variant`, `size`, `disabled`, plus component-specific props.
4. Ensure/author component tokens in `tokens/components.json`
   (`--{component}-{property}` → alias semantic tokens only).
5. Implement per target:
   - **React** — function component + hooks, `"use client"` only if interactive,
     Tailwind v4 utilities from `theme.css`, typed prop interface.
   - **Vue** — Composition API + `<script setup>`, same utilities, same prop names.
   - **React Native** — token objects / StyleSheet, same prop names, no CSS vars.
6. Implement **all states**: default/hover/focus/active/disabled/loading/error.
7. Accessibility pass (`.devin/rules/accessibility.md`): focus, keyboard, 44pt targets,
   no color-only state, `prefers-reduced-motion` for any motion.
8. Prepare **Code Connect** (run the code-connect workflow) so Figma maps to source.
9. Write the component description (purpose, props, usage, a11y).
10. Verify Definition of Done in `.devin/rules/harmony-core.md`.

**Guardrails:** no class components, no deprecated APIs, no hardcoded hex/px,
identical prop shape across frameworks.
