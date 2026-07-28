# Harmony — Figma Configuration (canonical)

> The single source of truth for how Harmony is structured **inside Figma**:
> variable collections, modes, scopes, naming, component sets, and Code Connect.
> Code mirrors this; this doc mirrors code. If they drift, `CONTEXT.md` §2 decides.

- Harmony file key: `rna1ko0KAMxJygWQiWQ9KT`
- Portfolio reference file key: `TRUjofEwcRW6XLyxeL9Gxh`

---

## 1. Variable collections (structure)

Four collections. Each variable carries **scopes** (where it can be applied) and a
**WEB code syntax** string (the CSS var an agent should emit).

| Collection | Modes | Types | Code syntax pattern |
| --- | --- | --- | --- |
| **Colour** (primitives) | Mode 1 | COLOR | `--color-{family}-{step}` |
| **Semantic** | Light, Dark | COLOR (alias → Colour) | `--color-{role}` |
| **Scale** | Mode 1 | FLOAT (px) | `--space-{name}`, `--radius-{name}` |
| **Typography** | Mode 1 | STRING + FLOAT | `--font-*`, `--text-*`, `--heading-*` |

### 1.1 Colour (primitives)
- 6 families × 11 steps (50–950): Brand, Neutral, Green, Red, Blue, Yellow.
- Anchor step = `500`. Values owned by Figma; exported to `tokens/primitives.json`.
- Scope: fills + strokes. Code syntax: `--color-brand-500`, etc.

### 1.2 Semantic (Light / Dark)
- Every variable is an **alias** to a Colour primitive — no raw hex.
- Two modes: `Light` and `Dark`. Same variable, different primitive per mode.
- Roles (match `tokens/semantic.json`):
  - `background/{primary,secondary,tertiary,inverse,brand}`
  - `content/{primary,secondary,tertiary,inverse,brand,onBrand}`
  - `border/{subtle,default,strong,brand}`
  - `feedback/{success,error,info,warning}`
  - `feedbackSurface/{success,error,info,warning}`
- Code syntax: `--color-content-primary`, `--color-feedback-error`, …

### 1.3 Scale
- Spacing: `none,xs,sm,md,lg,xl,2xl,3xl` (px FLOAT). Code: `--space-md`.
- Radius: `none,sm,md,lg,xl,full`. Code: `--radius-lg`.

### 1.4 Typography
- Families (STRING): `display` (Clash Grotesk), `sans` (Space Grotesk), `body` (Roboto).
  Code: `--font-display`, `--font-sans`, `--font-body`.
- Weights (FLOAT): 400/500/600/700.
- Size / line-height / letter-spacing (FLOAT px) per `text-*` and `heading-*` variant.
  Code: `--text-md-size`, `--heading-xl-line-height`, …

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
`.devin/workflows/code-connect.md`. Summary:

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
