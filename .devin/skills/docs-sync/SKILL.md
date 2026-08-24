---
name: docs-sync
description: Regenerate theme.css from tokens and keep docs + context index in sync
---

# Workflow: Docs / Foundation Sync

Run after any change to `tokens/*.json`. Keeps generated output + docs truthful.

> **Human operators:** see `docs/WORKFLOWS.md` for the exact prompt to paste into
> Devin / Cascade to invoke this skill.

1. Read current `tokens/primitives.json`, `semantic.json`, `components.json`.
2. Regenerate `foundations/theme.css` (Tailwind v4 `@theme`):
   - Primitives → `--color-{family}-{step}` (50–950).
   - Semantic (light) → `--color-{role}` referencing primitives:
     background, surface, overlay (color-mix), content, border,
     status, status-surface, plus interaction states (hover/pressed/selected/disabled/focus).
   - Dark overrides → `@media (prefers-color-scheme: dark)` + `[data-theme="dark"]`.
   - Spacing / radius (including 2xl, 3xl) / shadow / typography scales.
   - Confirm every token becomes a usable Tailwind utility.
3. Do NOT hand-edit `theme.css` — it is generated output.
4. Update `docs/README.md` if a token group / usage changed.
5. Update `CONTEXT.md` §3 inventory if a file was added/removed.
6. If Figma is the changed source, mirror the change back into the Figma variable
   collection (see `docs/FIGMA-CONFIG.md`) so Figma + code stay identical.
7. Verify: light + dark resolve, contrast ≥ WCAG AA.

**Guardrails:** generation is deterministic — same tokens in, same CSS out.
