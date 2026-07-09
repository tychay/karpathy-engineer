# Karpathy Engineer

> "You can outsource your thinking, but you can't outsource your understanding."
> — Andrej Karpathy

Let's operationalize that as a Claude-code plugin!

## Before / After

**grill-me** — *real, from the session that wrote this README:*
> Before: three questions fired in one batch, assumptions filled in, moved on.
> After: caught mid-conversation — forced back to one question at a time, the drift corrected before it compounded over ten more turns.

**karpathy-check** — *illustrative:*
> Before: a one-line bug fix ships with a new helper class, a "just in case" try/except, and an unrelated rename.
> After: `/karpathy-check` flags the diff noise ratio; the commit shrinks back to the actual fix.

**karpathy-engineer** — *illustrative:*
> Before: "set up my retro-gaming handhelds" sits as a vague backlog line with no clear definition of done.
> After: grilled into a real goal, first bucket spec'd (plan + verification lever + checkpoint) with a real deliverable that moves the needle, rest deferred to backlog instead of pretend-finished.

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
