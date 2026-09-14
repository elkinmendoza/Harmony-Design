# How Understanding Agentic AI and Context Helped Me Build Better UI designs and component Specifications

![Harmony Design System](../assets/presentations/harmony-hero-central-dominance.png)

In the past, i have worked with primitives, semantic tokens, and Figma specifications across multiple projects. The vocabulary isn't unfamiliar to me , the process of separating raw values from design intent, maintaining a one-way token flow, writing component specs that can be used across various frameworks. I've done this before.

What I hadn't done before was whipping up an **agentic context system** around it.

With **Harmony** ( an open-source design system inspired by my Portfolio Template), I wanted to observe the occurrence at which I stop treating an AI agent as a chat assistant and start treating it as part of your front-end architecture, giving it structured context about the reason it exist, scope, personality, color usage, visual principles, typography,your Figma specifications and other important details so it can handle the translation while I focus on brand identity, design patterns, and the decisions that actually shape the product.

These are the valuable lessons I learned:

---

## The foundation (what I already had)

The token architecture wasn't the experiment — it was purely the baseline. Primitives hold the raw Figma values: `brand.500` is the orange, `neutral.50` is the warm cream. Semantic tokens express intent: `background.primary`, `content.onBrand`, `status.negative`. Component tokens scope decisions to specific UI elements. Generated CSS bridges it all into Tailwind v4.

```
Figma → primitives → semantic → component tokens → generated CSS → code
```

One direction. Never reversed. I've used this pattern before. The question was: could an AI agent operate side by side with it, and free up the time I was still spending on the repetitive translation between Figma and code?

---

## Handing the translation to an AI agent

I started using **Devin** — an AI coding agent — with the **Figma MCP**, which lets it pull variables directly from my Figma file. No screenshots. No copy-pasting hex codes into messages. The agent reads the actual Figma variables, checks them against committed tokens, and generates the CSS.

But an AI agent is not a magical translator. It's more like a very fast, ultra-intelligent workaholic colleague. If the instructions are vague, it does exactly the wrong thing very quickly.

The first sessions were chaos. I'd ask it to update a token, and it would load 40 files, get overwhelmed, and invent variable names. I'd ask it to build a component, and it would reference documentation examples that didn't match the actual generated output.

The fix wasn't better prompts. It was better **front-end architecture**.

I wrote a file called `CONTEXT.md`, which is a retrieval router. For each type of task, it tells the agent exactly which files to load and which to ignore. Pulling a Figma spec? Load the design-to-token skill and the Figma workflow rules. Adding a semantic token? Load the token files and naming conventions. Building a component? Load the component skill and the component tokens. Nothing else.

That one file — a routing table for context — turned unpredictable sessions into reliable ones. I spent more time writing it than writing any prompt. It was the best investment in the entire project because it meant I could trust the agent with the translation work and focus on the design work.

---

## Two things that broke

**My folder names broke the agent.** I'd organised procedures under `.devin/workflows/`. The platform convention changed to `.devin/skills/`. Thirty-eight references across twelve files pointed nowhere. The agent didn't complain — it just silently failed. A human would have figured it out. The agent needed every path to be exact. It taught me that in a token-driven system, naming isn't a label — it's a contract between the Figma spec and the generated code.

**My documentation lied.** Example token names in my docs showed `--text-l-regular-size`. The pipeline actually generated `--text-xl-size`. The agent treated the docs as the specification and wrote code against names that didn't exist. The generated CSS was fine. The docs were the bug. In a system built on communication between Figma and code, your documentation *is* the specification — not a summary of it.


## What I got back

Harmony now has six colour families on a 50-to-950 scale, semantic tokens for light and dark mode, and a generated Tailwind v4 `@theme` file. The monorepo delivers to **Next.js 15** for web and **Expo 53 + React Native** for mobile — same exact token source, different runtimes. Sixteen component specifications describe props, states, and variants in a framework-agnostic manner.

But the real outcome isn't the deliverables. It's what occurred to my time.

I stopped spending days on the mechanical translation between Figma and CSS. The work of pulling variables, generating theme files, propagating changes across files now, the agent handles all of it. What I spend my time on instead is what actually makes the UI better: defining the brand identity, the design patterns, the editorial voice, the typography hierarchy, the visual hierarchy, designing illustration graphics, and creating the Figma specs that the entire pipeline flows from.

I let The AI handles propagation so i can focus on intent and creativity. And the front-end architecture — the primitives, the semantics, the context routing — is the communication layer that makes that handoff work.

---

## What I'd pass on

**Learn the vocabulary.** Primitives and semantics aren't developer terms. They're design concepts expressed in a language code can comprehend. Understanding them didn't make me any more technical — it made my design decisions more precise and easier to communicate with the AI and other team members.

**Architect the context before you prompt.** A retrieval router, a naming convention, a typography system, Accessibility rules, a one-way token flow, the constraints, and so on. These aren't configuration overhead. They're the front-end architecture that lets the AI agent do useful work instead of guessing.

**AI doesn't replace your design thinking.** It replaced the hours I spent typing `#ff9500`. It didn't replace the decision to make that orange the brand anchor. The intent — the brand identity, the patterns, the specifications — is still yours.

---

## Conclusion

Building Harmony confirmed something I'd suspected but never tested at this scale: the real leverage in UI development isn't writing more code (or less code, for that matter, which was something that i personally struggle with until now) — it's writing better context. The primitives, the semantics, the Figma specifications, the retrieval router — these aren't just files in a repo. They're the architecture that lets a human and an AI agent collaborate seamlessly on the same system without stepping on each other.

This project also increased my appetite for what comes next in my own learning. Agentic context engineering is just one step. I deeply want to dive more into AI and machine learning — not to become a data scientist or maybe yeah why not? at this magnitude the world of building Digital Products is boundless, with the objective to connect it with my years of software development experience. How can data analysis inform design decisions? How can machine learning improve the way we detect token drift or accessibility regressions? How can these disciplines feed back into the kind of front-end architecture I've been building? I don't have the answers yet, but I'm actively pursuing them.

If you want to explore the system yourself, the **[Harmony Design System is available as a Figma community file](https://www.figma.com/community/file/XXXXXXXXXXXX)**. You can inspect the variables, the component sets, and the current templates — including the agency template that Harmony was built to power. It's the same file the AI agent reads from via MCP, so what you see in Figma is exactly what flows into code.

The repo is open: **[github.com/elkinmendoza/Harmony-Design](https://github.com/elkinmendoza/Harmony-Design)**

---

## What's next

Harmony is in progress. The foundation is live. Next: building the full template cases from Figma into production React and React Native, with Code Connect mapping every Figma component to its code source.


If you work with, Design systems, design tokens, Figma MCP, or agentic workflows — or if you're thinking about how to make Figma specifications and front-end code actually talk to each other — please get in touch.

---

*EM Mendoza — Designed in Figma. Built with Devin. Shipped with Tailwind v4, Next.js, and Expo.*
