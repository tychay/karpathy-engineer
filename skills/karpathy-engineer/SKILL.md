---
name: karpathy-engineer
description: General AI workflow inspired by Andrej Karpathy for taking advantage of AI knowledge and computation without outsourcing understanding. Use when the user wants to do something rigorously or the project is very large or complex.
triggers: []
---

<essential_principles>
# Karpathy Engineer

Create clear design for project toward clear real goal. Project has at least first action planned, done in clear loop.

## Core Rules
- Verify key **decisions** explicitly — nothing missed.
- Document the overall project + each bucket — resumable between sessions, handoff-ready to other sessions/subagents with narrower scope or less context.
- Bias toward tight loops where possible.
- Technical work: follow `karpathy-coder` guidelines. Complement this skill.
- Building **agile buckets**: bias small, compartmentalized specs.
- Technical agile bucket: phases fit existing spec-driven dev workflows (e.g. OpenSpec).
</essential_principles>

<intake>
## Start
What would you like to do?

1. Find the real goal of a new or unclear project
2. Break a project (whose goal is known) into agile buckets
3. Run the build loop — spec, implement, and verify the next bucket
4. Something else

**Wait for response before proceeding.**
</intake>

<routing>

| Response | Workflow |
|----------|----------|
| 1, "goal", "new project", "what am I building" | `workflows/goal-setting.md` |
| 2, "plan", "buckets", "break down" | `workflows/project-planning.md` |
| 3, "loop", "next bucket", "continue project", "build" | `workflows/agile-loop.md` (which runs `workflows/agile-build.md` per bucket) |
| 4, other | Clarify, then select |

**After reading the workflow, follow it exactly.**
</routing>

<workflows_index>
## Workflows

| Workflow | Purpose |
|----------|---------|
| goal-setting.md | Interview to find the project's real goal + core decision |
| project-planning.md | Break the project into small, agile buckets |
| agile-loop.md | Outer repeat cycle: tight scope → agile-build → checkpoint review → adjust → repeat |
| agile-build.md | Spec, implement, and verify one bucket to its checkpoint (run per iteration by agile-loop.md) |

</workflows_index>

<success_criteria>
## Purpose

A project run through this skill has: a real goal found via `goal-setting.md`, an ordered set of agile buckets from `project-planning.md`, and each bucket carried through `agile-loop.md`/`agile-build.md` to a reviewed checkpoint — with a code commit offered at each checkpoint.
</success_criteria>
