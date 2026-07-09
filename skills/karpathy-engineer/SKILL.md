---
name: karpathy-engineer
description: General AI Workflow inspired by Andrej Karpathy in order to take advantage of AI knowledge and computation without outsourcing your understanding. Use when the user wants to do something rigorously or the project is very large or complex.
---

# Karpathy Engineering Model

Create a clear design for a project based toward a clear real goal. The project will have at least the first action planned out, that can be done in a clear loop.

## Core Rules

- Make me verify key **decisions** explicitly to ensure nothing gets missed.
- We should document both the overall project and each bucket so it can be resumed between sessions or handed off to other sessions or subagents with narrower scope or less context.
- We should bias toward tight loops where possible.
- When something is technical, remember to follow `karpathy-coder` guidelines if the skill is installed. They should complement this skill.
- When we build **agile buckets**, we should bias towards small, compartmentalized specs.
- If the agile bucket is technical, then phases of those specs should fit within existing spec-driven development workflows (e.g. OpenSpec)

## Phase 1. Uncover the real goal

If the real goal is not known, use `grill-me` to interview me to identify the **real goal** of this project and the core decision, if any, this project is intented to drive.

## Phase 2. Plan tight specs

Break the project into small, agile buckets. We will build one bucket at a time.

If we have come here from Phase 5, determine if we need to adjust our plan. If so or uncertain, use `grill-me` to have a retrospective to determine if and what the adjustment should be made to the plan.

## Phase 3. GTD the first/next bucket.

The next actionable bucket — first bucket if project has not started — must be fully spec'd out before going on to the next phase.

"Fully spec'd out" always includes:
- a **precise plan** for the bucket that also
- defines a **verification lever** so you have feedback and can loop when executing on the plan to done
- ends in a **checkpoint** for me to review the output before we move on.

Use one or multiple `grill-me` sessions to do so. This can optionally be done in a separate session to save context.

For example, if technical and using OpenSpec, the plan would be enough to make an `opsx:proposal`.

The **verification lever** needs to be defined here as part of the plan. We should be in agreemeent on
- An outline of the evaluation criteria you will use to ensure a high-quality final product. Be precise.
- You should pull in external signal where possible (ex. use a past example as the format to match)

## Phase 4. Loop until checkpoint.

We want to implement the plan until we the verification lever passes. Remember the core rule, if a **decision** is needed, you can pause the loop and make me verify key decisions. If necessary, we can go through a `grill-me` process to do so.

<!-- If it is not a decision, but it is a complex build, then run the final output by Codex to ensure both systems agree on the verification. -->

For example, if using OpenSpec, this would be: `opsx:apply` → verify → modify parts of proposal and repeat if necessary until verification lever is okay. This is irrespective of the "verification" tasks inside the plan, unless the lever is fully captured in those tasks. Even then, because we want these as tight as possible, it might be the `apply` step will be broken down to selected tasks in order to put a verification task in the lever as early as possible.

## Phase 5. Checkpoint.

This is a phase where I can review the output, and we can adjust the project, before moving on to the next bucket.