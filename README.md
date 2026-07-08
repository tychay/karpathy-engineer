# Karpathy Engineer

Operationalizes the [Karpathy Method](https://en.wikipedia.org/wiki/Andrej_Karpathy) (Spec via interview → small agile buckets → explicit Verifier → Environment rules) as Claude Code skills.

## Status: bucket 1

Ships `grill-me` (entry/trigger) + `grilling` (interview mechanics), forked by mode (coding vs non-technical) and by output (research-discuss doc / chat / plan-mode plan).

See [STATE.md](./STATE.md) for what's built vs deferred, and `adr/` for the reasoning behind each design decision.

## Skills

- **grill-me** — interview the user relentlessly to reach shared understanding on a plan or decision before acting on it. Triggers on "grill me", "interview me", or before `/opsx:propose` for coding tasks.
- **grilling** — the actual interview mechanics grill-me hands off to; not usually invoked directly.
