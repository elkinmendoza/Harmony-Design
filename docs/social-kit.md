# Harmony Case Study — Social Media Kit

Ready-to-post companion content for the case study blog post.

---

## LinkedIn Post

```
I spent the last month building Harmony — a Figma-driven design system where variables flow one way: Figma → primitives → semantic tokens → generated CSS → React, Vue, and React Native components.

The hardest part wasn't the UI or the tokens. It was building a context system for an AI agent (Devin) that could read Figma variables via MCP, check them against committed tokens, and generate the right CSS — without me pasting screenshots or hex values.

Three things I didn't expect to learn:

→ Context routing matters more than prompts. I wrote a CONTEXT.md file that tells the agent exactly which files to load for each task. That one file made every session 10x more useful.

→ Token naming is a contract, not a label. When my docs showed example variable names that didn't match the generated output, the agent wrote code that referenced variables that didn't exist. The docs were the bug.

→ AI is great at propagation, bad at intent. The agent updated 38 file references across 12 files in minutes. It could not decide whether to call them "workflows" or "skills." That's still my job.

The repo is open and the full case study is linked below — covering the architecture, the Figma MCP workflow, dependency conflicts, oversized assets, and what I'd do differently.

If you're building design systems, working with design tokens, or experimenting with agentic AI in your workflow — I'd love your perspective.

🔗 [Link to blog post]
🔗 github.com/elkinmendoza/Harmony-Design

#DesignSystem #FigmaTokens #DesignTokens #DesignOps #AgenticAI #DesignToCode #React #ReactNative #VueJS #TailwindCSS
```

---

## Dribbble / Cosmos Caption

Use `harmony-hero-central-dominance.png` or the token flow diagram as the shot.

```
Harmony — a Figma-first design system with one-way token flow, AI-assisted context routing, and cross-framework output for React, Vue, and React Native.

Built on Tailwind v4 with semantic tokens generated from Figma variables. No hardcoded values. No manual CSS. One source of truth.

Full case study → [link in bio]
Open repo → github.com/elkinmendoza/Harmony-Design

#DesignSystem #DesignTokens #Figma #TailwindCSS #React #ReactNative #DesignOps
```

---

## Bluesky / X Thread (3 posts)

### Post 1
```
Most Figma files die in handoff. I tried the opposite: make Figma the single source of truth for tokens, generated CSS, and component code.

Built Harmony — a design system where variables flow one way only: Figma → primitives → semantic → generated Tailwind v4 → React / Vue / React Native.

🧵 Three things I learned →
```

### Post 2
```
1/ Context routing > prompts. I used an AI agent (Devin) as a teammate. It only worked because I wrote CONTEXT.md — a retrieval router that tells the agent which files to load per task. Without it, the agent drowned in 40 files and hallucinated.

2/ Token naming is a contract. My docs showed --text-l-regular-size. The generated CSS said --text-xl-size. The agent wrote code referencing variables that didn't exist. Lesson: every example in your docs must be a real, working name.
```

### Post 3
```
3/ AI is excellent at propagation, bad at intent. It updated 38 references in 12 files in minutes. It couldn't decide whether to call them "workflows" or "skills." That's still the human job.

Repo is open: github.com/elkinmendoza/Harmony-Design
Full case study: [link]

What would you want to see covered? Feedback welcome.
```

---

## SEO Metadata (for your blog page)

```
Title: How I Built a Figma-Driven Design System With an AI Teammate
Description: A case study on building Harmony — a token-first design system with Figma MCP, Devin, Tailwind v4, and cross-framework output for React, Vue, and React Native.
Keywords: design system, Figma tokens, design tokens, Figma MCP, agentic AI, Tailwind v4, React, React Native, Vue, design-to-code, component library
OG Image: harmony-hero-central-dominance.png (1440 x 810)
```
