---
description: Propagate a change in docs/DESIGN.md (the design-language foundation) to tokens, rules, Figma, and docs
---

# Workflow: Design-Language Sync (listener for docs/DESIGN.md)

Run this **every time `docs/DESIGN.md` changes**. `DESIGN.md` is upstream and does
not auto-update anything — this workflow keeps the downstream system truthful.

> **Human operators:** see `docs/WORKFLOWS.md` for the exact prompt to paste into
> Devin / Cascade to invoke this workflow.

## 0. Detect what changed
Read the diff of `docs/DESIGN.md`. Classify the change into one or more buckets
below, then run only the matching steps.

## 1. Palette / color intent changed (§4 color usage)
1. Update `tokens/semantic.json` (roles/aliases) — never invent primitives.
2. Mirror into Figma `Semantic` collection (Light/Dark).
3. Run `docs-sync` → regenerate `foundations/theme.css`.
4. Re-check WCAG AA contrast.

## 2. Typography rule / scale changed (§4 typography)
1. Update the type scale in `tokens/semantic.json` (`heading-*`, `text-*`, `font.*`).
2. Mirror into Figma `Typography` collection.
3. Run `docs-sync`. Update `docs/README.md` type table if variants changed.

## 3. Spacing / radius / elevation changed (§4–5)
1. Update `tokens/semantic.json` (`space`, `radius`, `shadow`).
2. Mirror into Figma `Scale` collection.
3. Run `docs-sync`.

## 4. Component behaviour / states / motion changed (§6)
1. Update `.devin/rules/accessibility.md` if a11y expectations shifted.
2. Update `SKILL.md` §5 (component contract) and any component specs.
3. Re-run `component-build` for affected components; re-verify states.

## 5. Brand / voice / audience / scope changed (§1–3)
1. Update `AGENTS.md` §0.1 (brand identity) to match.
2. Regenerate the Figma Make skill `SKILL.md` (see §5a).
3. If it affects agent guardrails, update `.devin/rules/harmony-core.md` brand invariants.

## 5a. Regenerate the Figma Make skill (`SKILL.md`, name: `harmony-design-system`)
`SKILL.md` is a **derived artifact** — never a source. Rebuild its body from the
config so Figma Make stays on-brand:
1. §2 Brand & Style ← `docs/DESIGN.md` §2–4 (personality, principles, typography).
2. §3 Audience / verticals / surfaces / media ← `docs/DESIGN.md` §1, §3, §5.
3. §4 Token architecture + naming ← `.devin/rules/tokens.md` + `docs/FIGMA-CONFIG.md` §1–2.
4. §5 Component contract ← `docs/FIGMA-CONFIG.md` §3 + `.devin/rules/accessibility.md`.
5. Bump `version:` in the `SKILL.md` frontmatter.
6. **Publish**: Devin cannot write into Figma Make directly — copy the updated
   `SKILL.md` into the Figma Make project's guidelines so the hosted skill mirrors it.

## 6. Always (after any of the above)
1. Bump the changelog in `docs/DESIGN.md` §10.
2. If files were added/removed/renamed, update `CONTEXT.md` §1 + §3 and `AGENTS.md` §6.
3. Confirm Definition of Done in `.devin/rules/harmony-core.md`.

**Guardrails:** DESIGN.md is human intent; it must be *translated* into tokens/rules,
never bypass the token flow. Precedence in `CONTEXT.md` §2 still applies — if DESIGN.md
implies a value that conflicts with a primitive, escalate before changing primitives.
