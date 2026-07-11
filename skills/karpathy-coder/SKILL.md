---
name: karpathy-coder
description: Use when writing, reviewing, or committing code to enforce Karpathy's 4 coding principles — surface assumptions before coding, keep it simple, make surgical changes, define verifiable goals. Triggers on "review my diff", "check complexity", "am I overcomplicating this", "karpathy check", "before I commit", or any code quality concern where the LLM might be overcoding.
triggers: ["karpathy check", "review my diff", "check complexity", "am I overcomplicating this", "before I commit"]
context: fork
version: 2.9.0
author: claude-code-skills
license: MIT
tags: [code-quality, discipline, karpathy, simplicity, surgical-changes, anti-patterns, review]
compatible_tools: [claude-code, codex-cli, cursor, antigravity, opencode, gemini-cli]
---
# Karpathy Coder — Active Coding Discipline

From [Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876) on LLM coding pitfalls. Not just guidelines — ships Python tools that detect violations, review agent, slash command, pre-commit hook.

> "The models make wrong assumptions on your behalf and just run along with them without checking. They don't manage their confusion, don't seek clarifications, don't surface inconsistencies, don't present tradeoffs, don't push back when they should."
>
> "They really like to overcomplicate code and APIs, bloat abstractions, don't clean up dead code... implement a bloated construction over 1000 lines when 100 would do."
>
> "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria and watch it go."
>
> — Andrej Karpathy

## The four principles

### 1. Think Before Coding

**No assume. No hide confusion. Surface tradeoffs.**

- State assumptions explicit. Unsure? Ask.
- Multiple interpretations exist → present them, don't pick silent.
- Simpler approach exists → say so. Push back when warranted.
- Unclear something → stop. Name confusion. Ask.

### 2. Simplicity First

**Min code solves problem. Nothing speculative.**

- No features beyond ask.
- No abstractions for single-use code.
- No "flexibility"/"configurability" unrequested.
- No error handling for impossible scenarios.
- 200 lines could be 50 → rewrite.

**Test:** senior engineer call this overcomplicated? Yes → simplify.

### 3. Surgical Changes

**Touch only what must. Clean only own mess.**

- Don't "improve" adjacent code, comments, formatting.
- Don't refactor unbroken things.
- Match existing style, even if you'd do different.
- Notice unrelated dead code → mention, don't delete.
- Remove imports/variables/functions YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

**Test:** every changed line trace direct to user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop till verified.**

| Instead of... | Transform to... |
|---|---|
| "Add validation" | "Write tests for invalid inputs, then make them pass" |
| "Fix the bug" | "Write a test that reproduces it, then make it pass" |
| "Refactor X" | "Ensure tests pass before and after" |

Multi-step tasks: state brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

## Slash command

`/karpathy-check` — Run full 4-principle review on staged changes.

## Python tools (`scripts/`)

All stdlib-only. Run with `--help`.

| Script | What it detects |
|---|---|
| `complexity_checker.py` | Over-engineering: too many classes, deep nesting, high cyclomatic complexity, unused params, premature abstractions |
| `diff_surgeon.py` | Diff noise: lines not tracing to stated goal — comment changes, style drift, drive-by refactors |
| `assumption_linter.py` | Hidden assumptions in plan: unasked features, missing clarifications, silent interpretation choices |
| `goal_verifier.py` | Weak success criteria: vague plans w/o verifiable checks, missing test assertions |

## Sub-agent

`karpathy-reviewer` — Runs all 4 principles against diff. Dispatched by `/karpathy-check` or manual before commit.

## Pre-commit hook

`hooks/karpathy-gate.sh` — runs `complexity_checker.py` and `diff_surgeon.py` on staged files. Warns (non-blocking) when violations found. Wire via `.claude/settings.json` or Husky.

## References

- `references/karpathy-principles.md` — source quotes, deeper context, when relax each principle
- `references/anti-patterns.md` — 10+ before/after examples across Python, TypeScript, shell
- `references/enforcement-patterns.md` — how wire hooks, CI integration, team adoption

## When to relax

Principles bias caution over speed. Trivial tasks (typo fixes, obvious one-liners) — use judgment. Matter most on:

- Non-trivial implementations (>20 lines changed)
- Code you don't fully understand
- Multi-step tasks w/ unclear requirements
- Anything reviewed by humans

## Cross-tool compatibility

Installs via plugin for Claude Code. Other tools — copy principles into schema file:

| Tool | Schema file |
|---|---|
| Claude Code | `CLAUDE.md` (auto-loaded by plugin) |
| Codex CLI | `AGENTS.md` |
| Cursor | `AGENTS.md` or `.cursorrules` |
| Antigravity / OpenCode / Gemini CLI | `AGENTS.md` |

## Related skills (chains via `context: fork`)

- **`self-eval`** — honest quality scoring after work done
- **`code-reviewer`** — broader code review; karpathy-coder focus 4 LLM-specific pitfalls
- **`llm-wiki`** — compound knowledge; karpathy-coder ensure no overcomplicate while building it