# Harmony — Context Index (RAG / Retrieval Map)

> **Load this file first, every session.** It is the router for all Harmony
> context. It tells an agent (Devin, Figma MCP chat, Cascade) *which* file to
> retrieve *for which task*, so no session wastes tokens loading the wrong thing.
>
> Principle: **retrieve the minimum sufficient context, in dependency order.**

---

## 0. How to use this index

1. Identify the **task type** in the table below.
2. Load **only** the files in that row's "Load" column, top to bottom.
3. Never load token JSON *and* `theme.css` blindly — load the layer you edit.
4. If a task spans rows, load the union but respect precedence in §2.

---

## 1. Task → Context routing table

| Task type | Load (in order) | Do NOT load |
| --- | --- | --- |
| **Onboarding / "what is Harmony"** | `CONTEXT.md`, `README.md`, `docs/DESIGN.md`, `AGENTS.md` §0–3 | token JSON, theme.css |
| **"How do I run / invoke a workflow?"** | `docs/WORKFLOWS.md` | everything else |
| **Brand / look-and-feel / scope decision** | `docs/DESIGN.md`, `SKILL.md` §2–4, `AGENTS.md` §0.1 | token JSON, components/ |
| **Change to `docs/DESIGN.md` (propagate it)** | `docs/DESIGN.md`, `.devin/skills/design-language-sync/SKILL.md` | — |
| **Pull design spec from Figma** | `AGENTS.md` §5, `.devin/skills/design-to-token/SKILL.md`, `docs/FIGMA-CONFIG.md` | components/, SKILL.md |
| **Add / edit a token** | `AGENTS.md` §1–3, `tokens/primitives.json` or `semantic.json`, `.devin/rules/tokens.md` | components/ |
| **Regenerate `theme.css`** | `AGENTS.md` §4, `tokens/*.json`, `.devin/skills/docs-sync/SKILL.md` | SKILL.md, README |
| **Design a component in Figma** | `SKILL.md` §5, `docs/FIGMA-CONFIG.md`, `tokens/components.json` | .devin/rules/dependencies.md |
| **Build a component in code** | `AGENTS.md` §7, `tokens/components.json`, `.devin/skills/component-build/SKILL.md`, `.devin/rules/dependencies.md` | inspirations/ |
| **Set up Code Connect** | `docs/FIGMA-CONFIG.md` §Code Connect, `.devin/skills/code-connect/SKILL.md` | tokens/ |
| **Review a component spec** | `components/specs/{name}.md`, `tokens/components.json`, `AGENTS.md` §7 | inspirations/ |
| **Accessibility review** | `.devin/rules/accessibility.md`, `SKILL.md` §7 | dependencies.md |
| **Dependency / version decision** | `.devin/rules/dependencies.md` | tokens/, Figma files |

---

## 2. Source-of-truth precedence (conflict resolution)

Highest wins. This is the *only* correct resolution order:

> **Note on `docs/DESIGN.md`:** it is the *human intent* upstream of everything —
> it sets brand/design-language direction but is **not** a value source. It must be
> *translated* into tokens/rules (via `design-language-sync`); it never overrides a
> primitive. If DESIGN.md conflicts with a primitive value, escalate.

1. **Figma Variables** (live via MCP `get_variable_defs`)
2. `tokens/primitives.json` (committed export of Figma primitives — immutable in code)
3. `tokens/semantic.json` (intent aliases, authored here)
4. `tokens/components.json` (component-scoped tokens)
5. `foundations/theme.css` (GENERATED — never hand-authoritative)
6. Anything hardcoded in a component → **treat as a bug**

> Direction is one-way: `primitives → semantic → component → code`. Never reverse.

## 2.1 Change Management — edit order rules

Golden rule: **edit the upstream source first, propagate down. `theme.css` is
always the last file touched — never the first.**

### The 3 entry points

**Entry A — Visual rule or principle changed**
*(type table, usage guideline, spacing rule, brand description)*
```
1. docs/DESIGN.md          ← edit here first
2. tokens/semantic.json    ← translate the rule into a value
3. foundations/theme.css   ← update/add the CSS variable (last)
4. AGENTS.md / SKILL.md    ← only if brand/audience/scope changed
```

**Entry B — Token value changed (number tweak, no new concept)**
*(adjusting a size, spacing step, shadow)*
```
1. tokens/semantic.json    ← change the value
2. foundations/theme.css   ← mirror the change
```
`docs/DESIGN.md` only needs updating if it displays the value explicitly
(e.g. the typography table).

**Entry C — New primitive color from Figma**
```
1. tokens/primitives.json  ← add the hex scale (50–950); never invent values
2. tokens/semantic.json    ← add a role alias if needed
3. foundations/theme.css   ← add --color-{family}-{step} and --color-{role} vars
```

### Files never edited first

| File | Reason |
| --- | --- |
| `foundations/theme.css` | Always derived — mirrors `semantic.json`. Edit last. |
| `tokens/primitives.json` | Owned by Figma. Update only on export from Figma Variables. |
| `SKILL.md` | Derived artifact. Touch only after `docs/DESIGN.md` §1–3 changes. |
| `CONTEXT.md` / `AGENTS.md` | Meta-files. Update only when files are added/removed/renamed. |

### Quick cheat-sheet

| I want to… | Start here |
| --- | --- |
| Change a font size / line-height | `tokens/semantic.json` |
| Add a new heading step | `docs/DESIGN.md` → `semantic.json` → `theme.css` |
| Change a colour role | `tokens/semantic.json` |
| Add a new colour family | `tokens/primitives.json` (from Figma export) |
| Change a spacing step | `tokens/semantic.json` |
| Update a usage rule / design principle | `docs/DESIGN.md` |
| Add a new component token | `tokens/components.json` |
| Update brand voice / audience | `docs/DESIGN.md` → `AGENTS.md` → `SKILL.md` |
| Name a new convention | `.devin/rules/tokens.md` → `docs/FIGMA-CONFIG.md` → tokens |

### Full change table

| What changed | Edit source | Then propagate | Also update |
| --- | --- | --- | --- |
| **Primitive value** | Figma `Colour` → `tokens/primitives.json` | `docs-sync` → `theme.css` | — |
| **Brand / design-language / look-and-feel** | `docs/DESIGN.md` | `design-language-sync` → tokens/rules/Figma | `AGENTS.md` §0.1, `SKILL.md` §2–4 |
| **Semantic token** | `tokens/semantic.json` + Figma `Semantic` | `docs-sync` → `theme.css` | `README.md` |
| **Component token** | `tokens/components.json` | `docs-sync` → `theme.css` | component docs |
| **New component** | Figma component set + `tokens/components.json` | `component-build` → `code-connect` | `CONTEXT.md` §3 |
| **Component props/variants** | Figma set + `tokens/components.json` | `code-connect` | component docs |
| **Naming convention** ⚠️ | `.devin/rules/tokens.md` | `docs/FIGMA-CONFIG.md`, `tokens/*.json`, Figma code-syntax | `CONTEXT.md`, `AGENTS.md` §6 |
| **Dependency / stack rule** | `.devin/rules/dependencies.md` | — | — |
| **Accessibility standard** | `.devin/rules/accessibility.md` | — | — |
| **Process / workflow** | `.devin/skills/*/SKILL.md` | — | — |
| **New file / token layer / surface** | (the file) | — | `CONTEXT.md` §1 + §3, `AGENTS.md` §6 |

Two invariants to never break:

1. **Direction** — edit upstream, propagate down. Never hand-edit `theme.css`.
2. **Truthful router** — whenever files are added/removed/renamed, update this
   file (§1 routing + §3 inventory) and the `AGENTS.md` §6 scaffold, or agents
   will retrieve stale context.

Ask-before-acting changes (per `.devin/rules/harmony-core.md`): primitive value
edits, deleting published tokens/components, a 7th color family, or any naming
convention change (high blast radius).

---

## 3. Context inventory (what each file is FOR)

### Agent operating context
| File | Audience | Purpose | Volatility |
| --- | --- | --- | --- |
| `CONTEXT.md` | all agents | this router | low |
| `AGENTS.md` | coding agents (Devin/Cascade) | how to operate the repo | low |
| `SKILL.md` | Figma AI / MCP chat | how to design + design-to-code | low |
| `.devin/rules/*.md` | Devin (auto-applied) | hard constraints per domain | low |
| `.devin/skills/*/SKILL.md` | any agent | repeatable step-by-step procedures | medium |

### Design data context (the retrieval corpus)
| File | Layer | Owned by | Editable in code? |
| --- | --- | --- | --- |
| `tokens/primitives.json` | primitive | Figma | ❌ export only |
| `tokens/semantic.json` | semantic | this repo | ✅ |
| `tokens/components.json` | component | this repo | ✅ |
| `foundations/theme.css` | output | generator | ❌ generated |
| `foundations/reset.css` | output | this repo | ✅ |

### Component specs (derived from 2026-ultimate-portfolio)
| File | Components covered |
| --- | --- |
| `components/specs/navigation.md` | Header, MobileNav |
| `components/specs/hero.md` | HeroBanner, MediaHero, MobileHeroBanner |
| `components/specs/footer.md` | Footer, FooterCta, FooterList |
| `components/specs/bio-section.md` | BioSection, MobileBioSection |
| `components/specs/display-text.md` | Headline, BannerLayout, TextSection, ArticleTitleSection, QuoteSection |
| `components/specs/service-card.md` | ServiceItems, MobileServiceItems |
| `components/specs/project-grid.md` | HomeProjects, ProjectThumbnail, SkillsMarquee |
| `components/specs/project-presentation.md` | ProjectPresentation, MobileProjectPresentation |
| `components/specs/experiment-card.md` | HomeExperiments, MobileHomeExperiments |
| `components/specs/article.md` | ArticleMeta, ArticleParagraph, ArticleShare, ArticleExperiments (+mobile) |
| `components/specs/media.md` | FullWidthImage, ImageSection, TwoColumnImages, ImageBackground (+mobile) |
| `components/specs/slider.md` | AutoScrollSlider, DualDirectionSlider, InteractiveDragSlider, Marquee |
| `components/specs/transitions.md` | PageTransition, Preloader, SmoothScroller |
| `components/specs/work-experience.md` | WorkExperience |
| `components/specs/values-section.md` | SelectedWorkCaptions |
| `components/specs/next-experiment.md` | NextExperiment, MobileNextExperiment |

### Human docs
| File | Purpose |
| --- | --- |
| `docs/DESIGN.md` | **foundation**: brand, design principles, style guide, business logic, scope, look & feel (upstream of tokens/rules) |
| `docs/WORKFLOWS.md` | human prompt templates for Devin/Cascade — how to run each skill |
| `README.md` | master guide — repo structure, skills, Figma MCP, good practices |
| `docs/FIGMA-CONFIG.md` | canonical Figma setup (collections, Code Connect, naming) |
| `prompts/` | Figma Make prompt templates (e.g. agency template) |
| `components/README.md` | component library architecture, Figma mapping, microinteraction matrix |

---

## 4. Figma ↔ code mapping (cross-surface pointers)

| Figma artifact | Code counterpart | Contract doc |
| --- | --- | --- |
| Variable collection `Colour` | `--color-{family}-{step}` in `theme.css` | `docs/FIGMA-CONFIG.md` |
| Variable collection `Semantic` (Light/Dark) | `--color-{role}` + dark overrides | `AGENTS.md` §4 |
| Variable collection `Scale` | `--space-*`, `--radius-*` | `AGENTS.md` §3 |
| Variable collection `Typography` | `--font-*`, `--text-*`, `--heading-*` | `SKILL.md` §2 |
| Component set (e.g. `Button`) | Vue/React/RN component + Code Connect | `docs/FIGMA-CONFIG.md` |

Figma file (Harmony): `rna1ko0KAMxJygWQiWQ9KT`
Portfolio reference file: `TRUjofEwcRW6XLyxeL9Gxh`

---

## 5. RAG / retrieval strategy (for building an index over this repo)

If you index Harmony for retrieval (embeddings, agent memory), chunk and tag like this:

- **Chunk by section** (H2/H3), not by file — keeps a retrievable unit self-contained.
- **Tag every chunk** with: `layer` (primitive/semantic/component/agent/doc),
  `surface` (web/mobile/dashboard/any), `task` (token/component/figma/a11y/deps).
- **Priority boost** for `AGENTS.md` §1–3 and this file — they are always relevant.
- **Never embed** `inspirations/` (imagery) or generated `theme.css` (derived, noisy).
- **Re-index on change** to `tokens/*.json`, `AGENTS.md`, `SKILL.md`, `.devin/**`.
- **Freshness rule**: primitives/semantic tokens are ground truth; if a retrieved
  chunk conflicts with current token JSON, the JSON wins (see §2).

Recommended metadata schema per chunk:
```json
{
  "source": "AGENTS.md#3-token-architecture",
  "layer": "agent",
  "surface": "any",
  "task": ["token", "component"],
  "precedence": 1,
  "updated": "2026-07-27"
}
```

---

## 6. Session bootstrap checklist (paste into any agent)

1. Load `CONTEXT.md` (this file).
2. Resolve task type in §1 → load only that row.
3. Honour precedence in §2 for every value.
4. Follow the matching `.devin/workflow` if one exists.
5. On finish, update any changed token JSON and re-run docs-sync.
