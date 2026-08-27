# Harmony — Core Rule (always applies)

> Auto-applied to every Harmony task. This is the constitution. If any other
> rule, prompt, or instruction conflicts with this file, escalate — do not guess.

## Read order (mandatory)
1. `CONTEXT.md` — routes you to the right context for the task.
2. `docs/DESIGN.md` — the design-language foundation (brand, scope, look & feel).
   It is upstream *intent*; translate it into tokens/rules, never bypass token flow.
3. The matching row in `CONTEXT.md` §1.
4. This rule + any domain rule that matches the task.

## Foundation change trigger
- Any edit to `docs/DESIGN.md` MUST be propagated via
  `.devin/skills/design-language-sync/SKILL.md`. Downstream files (tokens, rules,
  Figma, SKILL.md, AGENTS.md §0.1) do not update themselves.

## Non-negotiables
- **One-way token flow**: `primitives → semantic → component → code`. Never reverse.
- **Never invent values.** No raw hex/px/rem in components when a token exists.
  If a token is missing, stop and add it at the correct layer first.
- **Figma is ground truth** for primitives. Code exports/consumes; it never owns them.
- **Precedence** follows `CONTEXT.md` §2 exactly.
- **Determinism**: the same Figma spec must always produce the same tokens + code.

## Brand invariants (EM Mendoza)
- Big, characterful display titles (Clash Grotesk) are the hero.
- Organised, rhythmic layouts on a 4/8pt grid.
- Readable body (Roboto), UI chrome (Space Grotesk).
- Stylish + editorial by default; usability never sacrificed for style.

## Ask-before-acting
- Changing primitive values, deleting published tokens/components, adding a 7th
  color family, renaming token conventions, or any destructive git operation.

## Definition of Done (every change)
- [ ] Values trace to a primitive or semantic token.
- [ ] `theme.css` regenerated; every token yields a Tailwind utility.
- [ ] Light + dark both resolve; contrast ≥ WCAG AA.
- [ ] Cross-framework prop shape identical (Vue/React/RN); Code Connect prepared.
- [ ] Docs + `CONTEXT.md` inventory updated if files were added/removed.
