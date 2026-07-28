# Harmony — Figma MCP Rule

> Applies to any task reading from or writing to Figma via MCP.

## Files
- Harmony design file key: `rna1ko0KAMxJygWQiWQ9KT`
- Portfolio reference file key: `TRUjofEwcRW6XLyxeL9Gxh`

## Reading from Figma
- Prefer `get_variable_defs` and `get_design_context` over guessing from images.
- Never fabricate node ids; if a URL lacks `node-id`, request a node-specific URL.
- Treat MCP reference code as something to **adapt**, not paste verbatim.
- Reconcile pulled values against `tokens/primitives.json` before using them.

## Writing to Figma (`use_figma`)
- Load Figma skill guidance before calling `use_figma`.
- Change pages with `await figma.setCurrentPageAsync(page)` — never set
  `figma.currentPage` directly. `loadAllPagesAsync` is not supported.
- Font gotchas: "Inter" uses style `Semi Bold` / `Extra Bold` (with a space).
- Bind shapes/text to variables rather than pasting resolved values.

## Image → code rule (inherited project convention)
- NEVER add `absolute` positioning to images generated from Figma MCP designs.
- Parent containers handle positioning; images flow naturally (relative/static).
- Absolute positioning from Figma breaks responsive layouts.

## Variable collections (canonical structure)
`Colour` (primitives) · `Semantic` (Light/Dark modes) · `Scale` (spacing/radius) ·
`Typography` (family/weight/size/line-height/letter-spacing). Full spec in
`docs/FIGMA-CONFIG.md`.

## Verification
- Every generated page/component: screenshot + confirm variable bindings resolve.
- Confirm contrast (WCAG AA) after any color binding change.
