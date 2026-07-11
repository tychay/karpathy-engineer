## Why

Skill invocation currently depends on the model reading trigger phrases embedded in each SKILL.md's prose `description` (surfaced via a system-reminder list) and deciding, unassisted, to call the Skill tool. This is a judgment call, not enforcement: confirmed failure case — the literal phrase "interview me" is present in `grill-me`'s description, yet the skill did not fire; the assistant did ad hoc research and used AskUserQuestion directly instead. The user reports this has recurred repeatedly. Without a deterministic check, trigger phrases are advisory only, contradicting the harness's own stated rule that a skill match is "a blocking requirement."

## What Changes

- Add a `triggers:` array field to the YAML frontmatter of each SKILL.md in this plugin (`grill-me`, `karpathy-coder`, `karpathy-engineer`) — exact phrases extracted from existing descriptions, structured instead of embedded in prose.
- Add a generator script that reads `skills/*/SKILL.md` in this plugin and builds a static `triggers.json` map (`phrase -> skillId`).
- Add a `UserPromptSubmit` hook, registered in this plugin's `.claude-plugin/plugin.json` and scoped via `${CLAUDE_PLUGIN_ROOT}` to this plugin only, that reads the static `triggers.json` (no runtime prose-scanning), substring-matches the incoming prompt, and on a match emits a hard-directive `hookSpecificOutput.additionalContext` instructing the model it MUST invoke the matched skill via the Skill tool before any other response.
- Add a new, versioned `githooks/pre-commit` script at the marketplace repo root, plus one-time documented `git config core.hooksPath githooks` setup, that regenerates/validates `triggers.json` is in sync whenever a SKILL.md changes and fails the commit if stale. This is new infrastructure for the marketplace repo itself — unrelated to and not reusing `karpathy-coder`'s documented `karpathy-gate.sh` pattern (which targets a *consumer* repo's precommit, was never vendored, and isn't wired anywhere).

## Capabilities

### New Capabilities
- `skill-trigger-enforcement`: deterministic, hook-based matching of user prompts against declared skill trigger phrases, replacing reliance on model judgment alone. Covers the `triggers:` frontmatter contract, the `triggers.json` generation step, and the `UserPromptSubmit` hook behavior.

### Modified Capabilities
- `grill-me`: SKILL.md frontmatter gains a `triggers:` field; no change to interview behavior itself.
- `karpathy-coder`: SKILL.md frontmatter gains a `triggers:` field; no change to review behavior itself.
- `karpathy-engineer`: SKILL.md frontmatter gains a `triggers:` field; no change to orchestration behavior itself.

## Impact

- Affected files: `skills/grill-me/SKILL.md`, `skills/karpathy-coder/SKILL.md`, `skills/karpathy-engineer/SKILL.md` (frontmatter only), `.claude-plugin/plugin.json` (new hook registration), new `src/hooks/` (or equivalent) generator + hook scripts within this plugin, new `triggers.json` generated artifact.
- Marketplace repo root: new `githooks/pre-commit` script, documentation of the one-time `core.hooksPath` setup.
- No change to any skill's actual behavior once invoked — this only affects *whether* the Skill tool gets called.
- Runtime dependency: Claude Code's `UserPromptSubmit` hook mechanism (proven working in-session via the `caveman` plugin's equivalent hook).
