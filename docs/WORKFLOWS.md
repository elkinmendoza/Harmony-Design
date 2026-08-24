# Harmony - How to Run Workflows with Devin / Cascade

> This file is for **human operators**. It tells you exactly what to paste into
> the Devin or Cascade chat so an agent follows the right `.devin/skills/*.md`
> file and keeps the design system consistent.
>
> Read `CONTEXT.md` §2.1 first for the edit-order rules, then use this file
> for the exact prompt templates.

---

## 1. Golden rule before every prompt

Never say *"update theme.css"*. Always say **which source changed** and ask the
agent to **propagate from that source**. Agents must follow the one-way flow:

```
Figma / primitives -> tokens/semantic.json -> tokens/components.json -> code
                            |
                            v
                  foundations/theme.css  (last, mirrors semantic.json)
```

If you ask an agent to edit `theme.css` directly, you will break the source chain.

---

## 2. The 3 entry points (use one per task)

### Entry A - You changed a design rule or principle in `docs/DESIGN.md`
*Examples: new heading size, changed spacing rule, updated colour usage, added brand language.*

**Prompt to paste:**

```
I updated docs/DESIGN.md:
[one-sentence summary, e.g. "added heading.9xl to the typography scale"]

Follow .devin/skills/design-language-sync/SKILL.md step by step. Then verify that
foundations/theme.css, tokens/semantic.json, and docs/README.md all reflect the
change. Do not edit theme.css directly without updating semantic.json first.
```

**What the agent will do:**
1. Read `docs/DESIGN.md` §4-5 to identify the changed bucket.
2. Translate the rule into a value in `tokens/semantic.json`.
3. Mirror the value into `foundations/theme.css`.
4. Update `docs/README.md` or `AGENTS.md` if the change is brand/voice/scope.
5. Bump the changelog in `docs/DESIGN.md` §10.

---

### Entry B - You changed a token value in `tokens/semantic.json`
*Examples: changed 9xl line-height from 8.875rem to 9rem, adjusted space.md, tweaked a shadow.*

**Prompt to paste:**

```
I changed tokens/semantic.json:
[one-sentence summary, e.g. "heading.9xl line-height is now 9rem"]

Follow .devin/skills/docs-sync/SKILL.md. Regenerate foundations/theme.css to match
and update any docs that display this value (e.g. docs/DESIGN.md typography table).
```

**What the agent will do:**
1. Read `tokens/semantic.json` and the current `foundations/theme.css`.
2. Mirror the new value into `foundations/theme.css` only - never invent new variables.
3. Update `docs/README.md` or `docs/DESIGN.md` tables if they show the old value.
4. Verify contrast / WCAG if a colour changed.

---

### Entry C - You got new primitives from Figma
*Examples: a new colour family, updated hex values, new primitive export.*

**Prompt to paste:**

```
I exported updated primitives from Figma. Follow .devin/skills/design-to-token/SKILL.md
to reconcile them. If any primitive is missing from tokens/primitives.json, stop and
ask before inventing values. Then update semantic aliases and regenerate
theme.css via docs-sync.
```

**What the agent will do:**
1. Pull Figma variables via MCP (get_variable_defs).
2. Reconcile against `tokens/primitives.json`.
3. Update `tokens/semantic.json` if needed.
4. Update `tokens/components.json` for component-specific values.
5. Regenerate `foundations/theme.css`.

---

## 3. Workflow trigger reference

| When this happens... | Paste this prompt |
|---|---|
| `docs/DESIGN.md` changed | "I updated DESIGN.md. Follow `.devin/skills/design-language-sync/SKILL.md` step by step." |
| `tokens/semantic.json` changed | "I updated `tokens/semantic.json`. Follow `.devin/skills/docs-sync/SKILL.md` and regenerate `theme.css`." |
| New component token in `tokens/components.json` | "I added a component token. Follow `.devin/skills/docs-sync/SKILL.md` and verify `theme.css` reflects it." |
| New Figma spec arrived | "I pulled a spec from Figma. Follow `.devin/skills/design-to-token/SKILL.md`." |
| Building a new component | "Build the [Name] component for [web/mobile/dashboard]. Follow `.devin/skills/component-build/SKILL.md`." |
| Linking Figma to code | "Create Code Connect for [Component]. Follow `.devin/skills/code-connect/SKILL.md`." |

---

## 4. Precautions and good practices

### Before the agent runs
- **Identify the source change.** If you changed `DESIGN.md`, say so. If you changed `semantic.json`, say so.
- **Only one source per prompt.** Don't say "I changed DESIGN.md and semantic.json and theme.css" - the agent can't tell precedence. Fix one source, run one workflow, then fix the next.
- **Never ask the agent to hand-edit `theme.css` as a source.** It is allowed only to mirror `semantic.json`.

### After the agent runs
- **Check the diff.** Run `git diff` and verify only the expected files changed.
- **Verify `theme.css` mirrors `semantic.json`.** Search for the variable name in both files and confirm the value is identical.
- **Check token flow integrity.** Ask: "Confirm the value in theme.css is only a mirror of semantic.json, not a hardcoded override."
- **Review docs.** If `DESIGN.md` has a table, confirm it matches the new token.

### What to do if the agent makes a mistake
- If `theme.css` was edited before `semantic.json`, revert `theme.css` and re-run the workflow starting from the correct source.
- If a primitive value was invented, revert and re-export from Figma.
- If a derived file like `SKILL.md` or `AGENTS.md` was edited without a `DESIGN.md` change, revert - those update only when brand/scope changes.

---

## 5. Verification checklist (ask the agent to confirm)

After every workflow run, paste:

```
Confirm:
1. Only the correct source file(s) were edited first.
2. foundations/theme.css is a mirror of tokens/semantic.json.
3. No primitive values were invented.
4. docs/DESIGN.md, docs/README.md, and AGENTS.md are updated only if a
   brand/visual/scope change occurred.
5. The changelog in docs/DESIGN.md §10 was bumped.
```

---

## 6. Files and their roles

| File | What it is | Who edits it |
|---|---|---|
| `docs/DESIGN.md` | Human design intent (brand, principles, style guide) | You first, then agent propagates |
| `tokens/primitives.json` | Raw Figma colour export | Figma export only |
| `tokens/semantic.json` | Intent token values | Agent, after DESIGN.md or Figma |
| `tokens/components.json` | Component-scoped aliases | Agent, when building components |
| `foundations/theme.css` | Generated CSS mirror of semantic tokens | Agent mirrors from tokens |
| `SKILL.md` | Derived Figma Make skill | Agent, after DESIGN.md §1-3 changes |
| `AGENTS.md` | Agent operating guide | Agent, when structure/brand changes |
| `CONTEXT.md` | Router / index | Agent, when files are added/removed |

---

## 7. Example walkthroughs

### Add a new heading size (Entry A)

1. You edit `docs/DESIGN.md` typography table.
2. Prompt Cascade: "I updated DESIGN.md with a new `heading.10xl` step. Follow `.devin/skills/design-language-sync/SKILL.md`."
3. Agent updates `tokens/semantic.json` -> mirrors `theme.css` -> updates `docs/README.md`.
4. You `git diff` to verify.

### Change a token value (Entry B)

1. You edit `tokens/semantic.json` (`heading.9xl.lineHeight` to `9rem`).
2. Prompt Cascade: "I changed `heading.9xl.lineHeight` in `tokens/semantic.json` to `9rem`. Follow `.devin/skills/docs-sync/SKILL.md` and regenerate `theme.css`."
3. Agent mirrors the value to `theme.css` and updates the `DESIGN.md` table.
4. You verify the same value in `semantic.json` and `theme.css`.

### New colour from Figma (Entry C)

1. Export the Figma `Colour` collection.
2. Prompt Cascade: "I exported new primitives. Follow `.devin/skills/design-to-token/SKILL.md`."
3. Agent reconciles `primitives.json`, updates `semantic.json`, regenerates `theme.css`.
4. You verify the new `--color-*` variables in `theme.css`.
