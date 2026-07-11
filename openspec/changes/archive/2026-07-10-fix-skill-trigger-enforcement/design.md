## Context

Skills in this plugin are invoked by the model reading a system-reminder-injected list of available skills (name + description) and deciding whether to call the Skill tool. There is no deterministic check. `grill-me`'s description already contains the exact phrase "interview me", yet a real session showed the model choosing ad hoc work instead. This has reportedly recurred.

The `caveman` plugin (installed separately, at `~/.claude/plugins/marketplaces/caveman/plugins/caveman/`) already demonstrates that a `UserPromptSubmit` hook fires on every user prompt independent of tool use, and can inject `hookSpecificOutput.additionalContext` that is visible to the model before it responds. This plugin has no hooks today (`.claude-plugin/plugin.json` has no `hooks` key).

In-force ADRs reviewed: 0001 (plugin lives in marketplace, not in a project checkout), 0002 (grill-me stays a single skill, no forking), 0003 (grill-me is context-free), 0004 (karpathy-coder vendored wholesale, not modified in place). None restrict adding a hook or frontmatter field; 0004 means karpathy-coder's own reference docs (e.g. `karpathy-gate.sh` pattern) should not be edited as part of this change — only its SKILL.md frontmatter gets the new `triggers:` field.

## Goals / Non-Goals

**Goals:**
- Deterministic detection of trigger-phrase matches for every skill in this plugin, independent of model attention/judgment.
- Confine the mechanism to this plugin (`${CLAUDE_PLUGIN_ROOT}` scoping) — no cross-plugin effects.
- Single source of truth for trigger phrases (SKILL.md frontmatter), not duplicated in a hook script.
- Keep the map generation static/precomputed — the hook does no filesystem scanning or prose parsing at prompt time.
- Detect drift between SKILL.md triggers and the generated map via a repo-level precommit check.

**Non-Goals:**
- Not changing what any skill does once invoked.
- Not building a general-purpose trigger system for other plugins (out of scope; would violate `${CLAUDE_PLUGIN_ROOT}` confinement goal above).
- Not wiring `karpathy-coder`'s `karpathy-gate.sh` pattern anywhere — that targets a consumer repo's own precommit, unrelated to this plugin's own maintenance.
- Not building a general precommit framework (husky, pre-commit-the-python-tool) — the marketplace repo has neither installed today; introducing one is out of scope for this fix.

## Decisions

**1. Trigger phrases live in a new `triggers:` YAML array in SKILL.md frontmatter, not parsed from `description` prose.**
Alternative considered: regex over the existing `description` field at hook runtime. Rejected — prose is free text and will drift from any pattern; a runtime scan is also slower and harder to reason about than a static lookup. A dedicated field is exact and lets `description` stay natural language for the model-facing skill list.

**2. A generator script produces a static `triggers.json`; the hook only reads it.**
Alternative considered: hook scans `skills/*/SKILL.md` on every prompt. Rejected per user direction — scanning at runtime is "a little odd," adds YAML-parsing cost to every single prompt in the session, and couples the hook's correctness to frontmatter parsing edge cases at the least convenient time (mid-conversation). Precomputing decouples generation-time complexity from prompt-time execution.

**3. Matching is plain substring match on lowercased prompt text, not regex/NLP.**
Trigger phrases are short literal strings (e.g. "interview me", "grill me"). Substring match is sufficient, fast, and has zero false-negative risk from regex-escaping mistakes. Risk of false positives (a trigger phrase appearing as a substring of unrelated text) is accepted — see Risks.

**4. On match, the hook emits a hard-directive `additionalContext`, not a soft nudge.**
The failure mode observed was the model *choosing* ad hoc work over the skill despite the trigger phrase being visible. A soft nudge duplicates what already exists (the skill description) and already failed. The directive text explicitly invokes the harness's own "blocking requirement" framing so it carries equivalent authority to that existing rule, rather than reading as optional guidance.

**5. `triggers.json` is a committed, generated file; a new `githooks/pre-commit` at the marketplace repo root regenerates and checks it's in sync, failing the commit if stale.**
Alternative considered: reuse `karpathy-coder`'s documented precommit pattern. Rejected — confirmed that pattern (`karpathy-gate.sh`) was never actually vendored into this repo and targets a different repo's use case entirely (per ADR 0004, karpathy-coder is vendored wholesale/unmodified; its docs describe what a *consumer* should wire in their own repo). This is new, marketplace-repo-local infrastructure, using git's native `core.hooksPath` (no new dependency) rather than introducing husky or the Python `pre-commit` framework, since neither exists in this repo today (Non-Goal above).
Open question on exact failure mode (block vs. auto-fix) below.

**6. Hook and generator scripts live under this plugin's own `src/hooks/` (or a new `hooks/`), not shared with `karpathy-coder`'s vendored scripts.**
Mirrors the `caveman` plugin's own layout (`src/hooks/caveman-mode-tracker.js`) and keeps ADR 0004's "vendored wholesale, unmodified" boundary intact — nothing added inside `skills/karpathy-coder/`.

## Risks / Trade-offs

- **False positives**: a trigger phrase substring-matches an unrelated prompt (e.g. "grill me" appearing inside a longer unrelated sentence) → directive fires for a skill the user didn't want. Mitigation: keep trigger phrases specific/multi-word (already true — "interview me", not "interview"); user can ignore/override the directive same as any other context.
- **False positives from untrusted/quoted content**: the match runs on the raw prompt text, so a trigger phrase embedded in pasted third-party content — a fetched web page, a tool result, a quoted transcript — fires the directive even though no human typed it with that intent. Confirmed live during implementation: a background task-notification quoting "interview me" from an agent's own report tripped the grill-me trigger mid-session. Distinct from the unrelated-sentence case above because the phrase isn't even the user's own words. Mitigation: same as above (user can ignore/override); no stronger mitigation planned for v1 — noted here so a future revision knows the failure mode is real, not hypothetical.
- **Drift between frontmatter and generated map**: someone edits `triggers:` and forgets to regenerate before committing. Mitigation: precommit hook fails the commit if `triggers.json` is stale relative to any staged SKILL.md.
- **One-time `core.hooksPath` setup is manual per clone**: if never run, precommit silently never fires (git falls back to default `.git/hooks/`, which has no `pre-commit` installed). Mitigation: document setup step prominently (README or repo CLAUDE.md); accepted as a known gap for v1 rather than auto-installing hooks on first `openspec`/`git` invocation, which is out of scope here.
- **Hook script failure (e.g. malformed `triggers.json`) could throw or silently no-op every prompt.** Mitigation: mirror `caveman-mode-tracker.js`'s pattern of wrapping in try/catch with silent fail on error — a broken hook must never block the user's ability to submit a prompt, it should just fail to enhance it.

## Migration Plan

1. Add `triggers:` field to all 3 SKILL.md files (additive, no removal of existing `description` trigger-phrase mentions — keeps human-facing description accurate too).
2. Add generator script; run once manually to produce initial `triggers.json`; commit both.
3. Add hook registration to `.claude-plugin/plugin.json`; verify manually with a session that says "interview me" and confirm the `additionalContext` appears and grill-me fires.
4. Add `githooks/pre-commit` + document `core.hooksPath` setup.
5. No rollback complexity: hook is purely additive context injection; removing the `hooks` key from `plugin.json` fully reverts behavior with no data migration.

## Open Questions

- Exact `triggers.json` schema: flat `{phrase: skillId}` vs. grouped `{skillId: [phrases]}`. Leaning flat for O(1) lookup on match, but grouped is easier to regenerate diffed. Resolve during implementation (tasks step), not a design blocker.
- Precommit failure mode: hard-fail-and-tell-user-to-run-generator vs. auto-regenerate-and-restage. Leaning hard-fail for v1 (simpler, more visible, avoids silently rewriting staged content) — confirm during tasks.
- Exact wording of the hard-directive `additionalContext` string — draft during implementation, not a design-level decision.
