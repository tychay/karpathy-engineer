# 0005. Skill triggers are enforced by a deterministic UserPromptSubmit hook, not model judgment alone

- Status: accepted
- Date: 2026-07-10

## Context

Skill invocation in this plugin has relied entirely on the model reading a system-reminder-injected list of skill names and prose descriptions, then deciding on its own to call the Skill tool when a user's phrasing matches a documented trigger. This failed in a confirmed, reproducible way: `grill-me`'s description literally contains the phrase "interview me," and a session where the user said exactly that still did not invoke `grill-me` — the assistant did ad hoc research and used AskUserQuestion instead. The user reported this recurring.

A grill-me interview session (2026-07-10, saved at the user's vault under `coding-projects/karpathy-engineer/buckets/2026-07-10-grill-me-fix-skill-trigger-hook.md`) established that Claude Code's `UserPromptSubmit` hook mechanism fires on every user prompt independent of tool calls — demonstrated live via the separately-installed `caveman` plugin's own `UserPromptSubmit` hook, which injects a per-turn reminder regardless of whether any tool is used that turn. This refuted the initial assumption that a hook couldn't apply here because "no tool is involved."

## Decision

Enforce skill-trigger matching deterministically via a `UserPromptSubmit` hook registered in this plugin's own `.claude-plugin/plugin.json`, scoped to `${CLAUDE_PLUGIN_ROOT}` (this plugin only). The hook substring-matches the incoming prompt against a static, generated `triggers.json` map and, on match, injects a hard-directive `additionalContext` requiring the model to invoke the matched skill before any other response.

Trigger phrases are declared in a new structured `triggers:` frontmatter field on each SKILL.md (source of truth), not parsed from the prose `description` field at runtime. A generator script builds `triggers.json` from that frontmatter; a new marketplace-repo-local `githooks/pre-commit` script keeps the generated map in sync with source, failing the commit if stale.

This establishes a durable pattern for this plugin: any future skill added here that wants reliable phrase-based invocation must declare `triggers:` frontmatter, and the enforcement layer (not the model's judgment) is what guarantees invocation.

## Consequences

- Positive: closes the specific, reproduced failure mode (trigger phrase present in description, skill still not invoked) with a mechanism that doesn't depend on model attention.
- Positive: single source of truth (`triggers:` frontmatter) prevents the hook's phrase list from drifting from what's documented, enforced by a precommit check.
- Positive: confined to this plugin via `${CLAUDE_PLUGIN_ROOT}` — no effect on, or dependency on, any other installed plugin's skills or hooks.
- Negative: adds a new generated-file/precommit-hook maintenance burden to this plugin — every new skill with trigger phrases must remember to declare `triggers:` and regenerate `triggers.json`, backstopped by (but not eliminated by) the precommit check.
- Negative: the marketplace repo previously had no precommit hook at all; this introduces `core.hooksPath`-based git hooks as infrastructure for the first time, requiring one-time manual setup per clone (no auto-install in this change).
- Negative: substring matching accepts some false-positive risk (a trigger phrase appearing incidentally inside unrelated text) in exchange for simplicity and zero regex-authoring risk.

*Source: grill-me interview session, 2026-07-10, following recurring user-reported failure of the "interview me" trigger for `grill-me`.*
