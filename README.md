# Karpathy Engineer

> "You can outsource your thinking, but you can't outsource your understanding."
> — Andrej Karpathy

Let's operationalize that as a Claude-code plugin!

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

## Installation

### From a plugin marketplace

```bash
claude plugin marketplace add tychay/karpathy-engineer
claude plugin install karpathy-engineer
```

### From a local directory

```bash
claude plugin install --source directory --path /path/to/karpathy-engineer
```

### From GitHub

```bash
git clone https://github.com/tychay/karpathy-engineer.git
claude plugin install --source directory --path ./karpathy-engineer
```

After install, reload Claude Code (Cmd-Shift-P → "Developer: Reload Window" in VS Code).
