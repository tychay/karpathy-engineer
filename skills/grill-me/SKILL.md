---
description: Interview the user relentlessly to reach shared understanding on a plan, design, or decision before any implementation or action begins. Use whenever the user says "grill me," "interview me," "let's spec this out," "make sure we agree before you build this," or wants to think through a plan before building it. Prefer running this BEFORE /opsx:propose for coding tasks, to front-load clarification and cut down the back-and-forth that otherwise happens during propose's own drafting stage. Also use for non-technical decisions (e.g. "help me figure out X") — this is not code-only. Do not use for simple one-shot requests with no real design branches.
---

# grill-me

Entry point. All interview mechanics live in the `grilling` skill — this skill's job is to resolve the two forks before handing off, and to close the loop after.

## 1. Resolve the mode fork

Determine **coding** vs **non-technical**:
- Coding: there's a codebase/repo in scope, or the ask is clearly a build/implementation task.
- Non-technical: no codebase to explore — a decision, a plan, a course of action with no code artifact.

Infer from context. Ask directly only if genuinely ambiguous.

## 2. Resolve the output fork

Determine where the session's record should land:
- **research-discuss** — a live, growing doc (delegate to the `research-discuss` skill's format).
- **chat** — pure conversation; only the final resolved-decisions summary gets written to a file.
- **plan** — already in plan mode; the plan file itself is the artifact.

Infer from context (e.g. already in plan mode → `plan`; user explicitly asked for a research-discuss doc → `research-discuss`). Ask only if ambiguous and none of the above apply — default to `chat`.

## 3. Hand off

Invoke `grilling` with `mode` and `output` set. Do not duplicate its interview logic here.

## 4. Close the loop

Once `grilling` reports shared understanding reached:
- **Coding mode**: summarize the agreed decisions in chat, then suggest `/opsx:propose <name>` as the next step.
- **Non-technical mode**: summarize the agreed decisions in chat, and note where the findings were saved (session file path, research-discuss doc path, or "in this plan").

Never enact the plan or start implementation yourself — that's the user's call, made explicitly, not implied by finishing the interview.
