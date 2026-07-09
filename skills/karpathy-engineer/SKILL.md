---
name: karpathy-engineer
description: General AI Workflow inspired by Andrej Karpathy in order to take advantage of AI knowledge and computation without outsourcing your understanding. Use when the user wants to do something rigorously or the project is very large or complex.
---
# Karpathy Engineering Model

Create clear design for project toward clear real goal. Project has at least first action planned, done in clear loop.

## Core Rules

- Verify key **decisions** explicitly — nothing missed.
- Document overall project + each bucket — resumable between sessions, handoff-ready to other sessions/subagents w/ narrower scope or less context.
- Bias toward tight loops where possible.
- Technical stuff: follow `karpathy-coder` guidelines. Complement this skill.
- Building **agile buckets**: bias small, compartmentalized specs.
- Technical agile bucket: phases fit existing spec-driven dev workflows (e.g. OpenSpec).

## Phase 1. Uncover the real goal

Real goal unknown → use `grill-me` to interview and find **real goal** of project + core decision (if any) project intends to drive.

## Phase 2. Plan tight specs

Break project into small, agile buckets. Build one bucket at a time.

From Phase 5: check if plan needs adjustment. If so or unsure, use `grill-me` retrospective to determine adjustment.

## Phase 3. GTD the first/next bucket.

Next actionable bucket — first if project not started — must be fully spec'd before next phase.

"Fully spec'd out" always includes:
- **precise plan** for bucket, that also
- defines **verification lever** — feedback + loop while executing plan to done
- ends in **checkpoint** for review before moving on.

Use one or more `grill-me` sessions. Can run in separate session to save context.

Example: technical + OpenSpec → plan enough to make an `opsx:proposal`.

**Verification lever** defined here as part of plan. Agree on:
- Outline of eval criteria for high-quality final product. Be precise.
- Pull external signal where possible (ex. past example as format to match).

## Phase 4. Loop until checkpoint.

Implement plan until verification lever passes. Core rule stands — **decision** needed → pause loop, verify with me. If needed, `grill-me` process.

<!-- Not a decision but complex build → run final output by Codex, confirm both systems agree on verification. -->

Example: OpenSpec → `opsx:apply` → verify → modify proposal parts, repeat until lever okay. This irrespective of "verification" tasks inside plan, unless lever fully captured in those tasks. Even then — want tight loops — `apply` step may break down to selected tasks, putting verification task in lever as early as possible.

## Phase 5. Checkpoint.

Review output here. Adjust project before next bucket, or revisit Phase 2/3 if unsatisfied.

Offer to commit code before moving on (likely back to Phase 2). OpenSpec: archive + spec merge precede commit.