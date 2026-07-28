# Harmony — Accessibility Rule

> Applies to every component and page. Accessibility is part of Definition of Done.

## Contrast
- Minimum WCAG **AA**; target **AAA** for body text where feasible.
- Verify semantic color pairs (content-on-background) in both light and dark.
- Re-check after any semantic color token change.

## Interaction
- Visible, distinct focus state on every interactive element (never `outline: none`
  without a replacement).
- Touch targets ≥ **44×44pt** (mobile web + React Native).
- Full keyboard operability; logical tab order; visible focus traversal.

## Semantics & state
- Never convey state with color alone — pair with icon and/or text.
- Ship all states: `default`, `hover`, `focus`, `active`, `disabled`, `loading`,
  `error` (where relevant).
- Correct roles/labels; images need alt; icon-only controls need accessible names.

## Motion & media
- Respect `prefers-reduced-motion`; provide a static fallback (e.g. video → poster).
- Media components ship captions + accessible poster/alt.

## Documentation
- Each component description states a11y guidance (labels, focus, keyboard).
