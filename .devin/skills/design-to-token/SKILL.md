---
name: design-to-token
description: Pull a Figma spec and turn it into Harmony tokens (primitive → semantic)
---

# Workflow: Design → Token

Use when a new/updated spec arrives from Figma and must land as tokens.

1. Get the **file key + node id** from the Figma URL (ask if `node-id` missing).
2. Run Figma MCP `get_variable_defs` on the node → capture colors, spacing, type.
3. Run `get_design_context` for structure + screenshot (reference only, adapt it).
4. **Reconcile** each value against `tokens/primitives.json`:
   - Exists → reuse.
   - Missing + genuinely primitive → STOP, request export from Figma (do not invent).
5. Map new/changed values to intent aliases in `tokens/semantic.json`
   (`background` / `surface` / `overlay` / `content` / `border` / `status.*` /
   `statusSurface.*`, with interaction-state suffixes). Keep light + dark in sync.
6. If a value is component-specific, add it to `tokens/components.json` aliasing
   semantic tokens (never primitives).
7. Regenerate the foundation by running the docs-sync skill.
8. Verify: every new token yields a Tailwind utility; contrast ≥ WCAG AA.
9. Update `CONTEXT.md` inventory if any file was added.

**Guardrails:** never invent primitive values; never reverse the token flow;
follow `.devin/rules/tokens.md` naming exactly.
