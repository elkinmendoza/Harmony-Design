# Harmony — Token Rule

> Applies to any task touching `tokens/*.json` or `foundations/theme.css`.

## Layers & ownership
| Layer | File | Owner | Editable in code |
| --- | --- | --- | --- |
| Primitive | `tokens/primitives.json` | Figma | ❌ export only |
| Semantic | `tokens/semantic.json` | this repo | ✅ |
| Component | `tokens/components.json` | this repo | ✅ |
| Output | `foundations/theme.css` | generator | ❌ generated |

## Naming contract (must match code generation)
| Kind | Pattern | Example |
| --- | --- | --- |
| Color | `--color-{name}` | `--color-content-primary` |
| Spacing | `--space-{name}` | `--space-md` |
| Radius | `--radius-{name}` | `--radius-lg` |
| Shadow | `--shadow-{name}` | `--shadow-card` |
| Font family | `--font-{name}` | `--font-display` |
| Text size | `--text-{variant}-size` | `--text-l-regular-size` |
| Line height | `--text-{variant}-line-height` | `--text-l-regular-line-height` |
| Letter spacing | `--text-{variant}-letter-spacing` | `--text-l-regular-letter-spacing` |
| Heading | `--heading-{variant}-{prop}` | `--heading-9xl-bold-size` |
| Component | `--{component}-{property}` | `--button-primary-bg` |

## Rules
- Primitives: 6 families (Brand, Neutral, Green, Red, Blue, Yellow), scale 50–950,
  `500` is the family anchor. Do not add families or alter hex in code.
- Semantic tokens alias primitives via intent (`background`, `content`, `border`,
  `feedback.{error|success|info|warning}`). Light + dark are two semantic sets.
- Component tokens alias semantic tokens only — never primitives directly.
- Adding a token → add at the correct layer, then regenerate `theme.css`
  (see `.devin/workflows/docs-sync.md`), never hand-edit `theme.css`.
- Every token must resolve to a usable Tailwind v4 utility.

## Forbidden
- Hardcoding hex/px in components.
- Component tokens pointing at primitives.
- Editing generated `theme.css` by hand.
- Reverse flow (semantic value driving a primitive).
