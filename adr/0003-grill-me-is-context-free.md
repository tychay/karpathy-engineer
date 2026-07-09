# 0003. grill-me is context-free; destination-specific behavior belongs to the caller

- Status: accepted
- Date: 2026-07-09

## Context

Earlier planning (superseded, see deleted 0003/0004/0005) had grill-me itself own two destination-specific concerns: where a session's record persists (a centralized vault folder with per-session files and an index) and what happens next for coding tasks (a hardcoded suggestion to run `/opsx:propose`). Neither shipped.

The reason generalizes beyond either specific feature: workflow-as-function design is best served by small, discrete, chainable steps. Persistence and next-step suggestions are not properties of "having a conversation to clarify a decision" — they're properties of *why* the conversation is happening, which is supplied by whatever invoked grill-me, not by grill-me itself. `karpathy-engineer` (the orchestrator skill) is the actual owner of goal/destination context: it already calls both `grill-me` and `opsx:propose` in sequence during its own phases, and it is free to persist or chain its buckets however its own workflow needs.

## Decision

`grill-me` stays context-free: it does not persist sessions by default, and it does not hardcode suggestions for specific next skills (e.g. `/opsx:propose`). Any orchestrating skill or workflow that needs persistence or a specific next step supplies that itself, using grill-me as a plain interview primitive.

## Consequences

- Positive: grill-me composes into any workflow without carrying assumptions about that workflow's shape.
- Positive: matches how `karpathy-engineer` already uses it — orchestration-owned chaining, not skill-owned chaining.
- Negative: a caller that wants persistence or chaining has to build it itself each time; there's no shared default. Acceptable — no evidence yet that a shared default is worth the coupling.

*Source: user decision during the doc/reality surgery grilling session, 2026-07-09.*
