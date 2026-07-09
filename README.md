# Karpathy Engineer

Operationalizes the [Karpathy Method](https://en.wikipedia.org/wiki/Andrej_Karpathy) (Spec via interview → small agile buckets → explicit Verifier → Environment rules) as Claude Code skills.

## Status

Ships `grill-me` (single, context-free interview skill — no mode/output fork), `karpathy-engineer` (5-phase agile-bucket orchestrator that supplies goal-context to grill-me and chains into OpenSpec for technical work), and `karpathy-coder` (vendored coding-discipline enforcer).

Project state/roadmap lives outside this repo, in the user's vault (`karpathy-engineer-state.md`) — see `adr/` for the reasoning behind each design decision and `openspec/specs/` for the capability specs.

## Skills

- **grill-me** — interview the user relentlessly to reach shared understanding on a plan or decision before acting on it. Triggers on "grill me", "interview me", or before `/opsx:propose` for coding tasks. Single skill, no fork — see `adr/0002` and `adr/0003`.
- **karpathy-engineer** — orchestrates work as a spec → verify → environment loop of small agile buckets, each with an explicit verification lever and checkpoint. Calls `grill-me` for the interview phases.
- **karpathy-coder** — active coding discipline enforcer for Karpathy's 4 principles (surface assumptions, keep it simple, surgical changes, verifiable goals). Ships 4 stdlib-only Python tools, a `karpathy-reviewer` sub-agent, a `/karpathy-check` slash command, and a non-blocking pre-commit hook (`hooks/karpathy-gate.sh`). Vendored wholesale — see `adr/0004`.

| # | Principle | Tool that checks it |
|---|---|---|
| 1 | Think Before Coding | `assumption_linter.py` |
| 2 | Simplicity First | `complexity_checker.py` |
| 3 | Surgical Changes | `diff_surgeon.py` |
| 4 | Goal-Driven Execution | `goal_verifier.py` |

Vendored from [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills/tree/main/engineering/karpathy-coder) (MIT). Principles are Karpathy's observations; tooling and enforcement patterns are Alireza Rezvani's.
