# Using Karpathy's Method

Notes on the AI workflow method Andrej Karpathy described at AI Ascent 2026 (summarized by Austin Marchese), and how this plugin operationalizes it. Source: [Sequoia AI Ascent 2026](https://www.theaiopportunities.com/p/sequoia-ai-ascent-2026-andrej-karpathy).

Karpathy splits the workflow into three layers: **Spec**, **Verifier**, **Environment**.

## Layer 1 — The Spec

**AI's blind spot:** even the best models fail on context-dependent questions while acing quantitative ones. Karpathy's example — "I want to go to a car wash 50 meters away. Should I drive or walk?" — a model will say walk, because it's close, missing everything about *why* you'd drive a car to a car wash.

The goal is to bridge the gap between your understanding and the AI's computation — deliver understanding to the AI in a format it can use. Karpathy considers "plan mode" a start but not enough; he wants a more systemic spec-driven approach where the spec is detailed.

Three practices:

1. **Uncover the real goal.** "Create an end-of-month report" isn't a goal — the decision the report is meant to drive is. AI can't do this part for you; ask it to interview you on your actual goal before starting.
2. **Be agile, not waterfall.** Waterfall hands off the whole task and looks at the result once. Agile divides it into small chunks, each with a checkpoint: tight scope → clear checkpoint → review output → adjust → repeat.
3. **Be precise, use your brain.** Imprecision creates assumptions; the AI fills them in; the AI drifts. Being forced to verify forces you to be precise.

Prompts:
- "Interview me to identify the real goal of this project."
- "Bias toward small, compartmentalized specs."
- "Make me verify key decisions explicitly to ensure nothing is missed."

## Layer 2 — The Verifier

**Frame:** "We're not building animals, we're summoning ghosts." AIs don't share animal motivations — yelling at one has no effect (though there's anecdotal evidence profanity measurably *degrades* output). Think of it as a brilliant robot librarian: excellent when the library has a clear answer, confidently wrong when it doesn't, with no emotional lever available to correct it.

Three practices:

1. **Set evaluation criteria up front.** "Make this report look good" is not precise; "must have three sections, each ending in a recommendation" is. Define this before any task, technical or not.
2. **Use a second AI model as critic.** A second librarian with a different set of books, grading the first. Karpathy's suggestion: install a Codex plugin and cross-check complex builds against it.
3. **Pull in external signal where possible.** Have Claude verify its own deploy succeeded; for non-technical work, check output against a historical reference.

> "If Claude has a feedback loop, it will 2-3x the quality of the final result." — Boris Cherney (Claude Code creator)

Prompts:
- "Outline the evaluation criteria you will use to ensure a high-quality final product. Be precise."
- "If this turns into a complex build, run the final output by Codex to ensure both systems agree."
- "Use a past example as the format to match."

## Layer 3 — The Environment

**Frame:** Layer 1 is the blueprint on the wall, Layer 2 is the quality-check station, Layer 3 is the workshop itself — the tooling and system the other two live in. Most people rebuild the workshop from scratch every session instead of improving one over time.

Four practices:

1. **Set up a proper `CLAUDE.md`.** E.g. "Before building anything multi-step, include a verification plan" forces verification into every build. It's your world; the AI lives in it.
2. **Build your own knowledge base.** A folder system of your own data that Claude can navigate. Your data is your moat.
3. **Build a skill set.** If you do something repeatedly, turn it into a skill — a handbook that improves over time.
4. **Create rules for what the AI can and can't touch.** Rule-based guardrails, scaled by failure cost:
   - **Always do** — things the agent does on autopilot.
   - **Ask first** — anything with real consequences.
   - **Never do** — lines that can't be crossed.

   A guideline like "don't make up information" is a guide, not an enforced rule. A `PreToolUse` hook that blocks writes to a protected path enforces at the tool level instead of the prompt level — much harder to bypass.

Audit prompt: "Check my CLAUDE.md, my knowledge base, my skills, and my guardrails. For each of the top 5 gaps, name the file, the problem, and the exact fix — and flag which risky actions need a hook so I can't bypass them."

## The one thing to focus on

> "You can outsource your thinking, but you can't outsource your understanding." — Andrej Karpathy

The AI can't do your understanding for you. These three layers exist to help you build it anyway.
