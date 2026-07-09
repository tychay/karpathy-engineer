# Karpathy Engineer

Operationalizes the [Karpathy Method](https://en.wikipedia.org/wiki/Andrej_Karpathy) (Spec via interview → small agile buckets → explicit Verifier → Environment rules) as Claude Code skills.

## Status: bucket 1

Ships `grill-me` (entry/trigger) + `grilling` (interview mechanics), forked by mode (coding vs non-technical) and by output (research-discuss doc / chat / plan-mode plan).

See [STATE.md](./STATE.md) for what's built vs deferred, and `adr/` for the reasoning behind each design decision.

## Skills

- **grill-me** — interview the user relentlessly to reach shared understanding on a plan or decision before acting on it. Triggers on "grill me", "interview me", or before `/opsx:propose` for coding tasks.
- **grilling** — the actual interview mechanics grill-me hands off to; not usually invoked directly.
- **karpathy-coder** — active coding discipline enforcer for Karpathy's 4 principles (surface assumptions, keep it simple, surgical changes, verifiable goals). Ships 4 stdlib-only Python tools, a `karpathy-reviewer` sub-agent, a `/karpathy-check` slash command, and a non-blocking pre-commit hook (`hooks/karpathy-gate.sh`).

| # | Principle | Tool that checks it |
|---|---|---|
| 1 | Think Before Coding | `assumption_linter.py` |
| 2 | Simplicity First | `complexity_checker.py` |
| 3 | Surgical Changes | `diff_surgeon.py` |
| 4 | Goal-Driven Execution | `goal_verifier.py` |

Vendored from [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills/tree/main/engineering/karpathy-coder) (MIT). Principles are Karpathy's observations; tooling and enforcement patterns are Alireza Rezvani's.
