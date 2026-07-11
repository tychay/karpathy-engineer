# skill-trigger-enforcement

## Purpose

Ensure this plugin's skills are invoked deterministically when a user's prompt contains one of their known trigger phrases, instead of relying on the model to notice the phrase in a skill's prose `description`. A generated `triggers.json` (built from each SKILL.md's `triggers:` frontmatter) is the single runtime source of truth, read by a `UserPromptSubmit` hook that is scoped to this plugin only. (TBD: expand with fuller background if this capability grows beyond the initial enforcement mechanism.)

## Requirements

### Requirement: Skills declare trigger phrases in structured frontmatter
Each SKILL.md in this plugin SHALL declare a `triggers:` array field in its YAML frontmatter, listing exact phrases (not patterns) that indicate the skill should be invoked. This field SHALL be the single source of truth for trigger phrases; the human-facing `description` field MAY still mention example phrases in prose but SHALL NOT be parsed programmatically.

#### Scenario: A new skill is added to this plugin
- **WHEN** a new SKILL.md is added under `skills/` in this plugin
- **THEN** it SHALL include a `triggers:` frontmatter array (which may be empty if the skill has no natural-language trigger phrases) for the generator to pick up

### Requirement: A generated trigger map is the runtime source of truth
A generator script SHALL read every `skills/*/SKILL.md` in this plugin and produce a `triggers.json` file mapping each trigger phrase to its owning skill ID. The `UserPromptSubmit` hook SHALL read only this generated file at prompt time and SHALL NOT parse SKILL.md files or scan the filesystem during a live session.

#### Scenario: Generator is run after editing a SKILL.md's triggers
- **WHEN** a `triggers:` array in any SKILL.md changes and the generator script is run
- **THEN** `triggers.json` is rewritten to reflect the current union of all skills' trigger phrases in this plugin

#### Scenario: Hook runs mid-session
- **WHEN** the `UserPromptSubmit` hook fires for a new user prompt
- **THEN** it reads the existing `triggers.json` from disk without re-parsing any SKILL.md frontmatter

### Requirement: Hook deterministically matches trigger phrases and directs invocation
The `UserPromptSubmit` hook SHALL substring-match the lowercased incoming prompt against every phrase in `triggers.json`. On any match, it SHALL emit `hookSpecificOutput.additionalContext` containing a directive that the matched skill MUST be invoked via the Skill tool before any other response, framed with equivalent authority to the harness's own blocking-skill-match rule.

#### Scenario: Prompt contains a declared trigger phrase
- **WHEN** a user prompt contains a substring that exactly matches a phrase in `triggers.json` (case-insensitive)
- **THEN** the hook's `additionalContext` names the matched skill and states invocation is mandatory, not a suggestion

#### Scenario: Prompt contains no trigger phrase
- **WHEN** a user prompt matches no phrase in `triggers.json`
- **THEN** the hook emits no additional context and does not affect the prompt

### Requirement: Hook is scoped to this plugin only
The hook SHALL be registered in this plugin's own `.claude-plugin/plugin.json` and SHALL reference only files under `${CLAUDE_PLUGIN_ROOT}`. It SHALL NOT read or match against trigger phrases belonging to any other installed plugin.

#### Scenario: Another installed plugin defines its own trigger phrases
- **WHEN** a different plugin (e.g. `caveman`) has skills with their own trigger phrases
- **THEN** this plugin's hook does not match against or reference those phrases, and vice versa

### Requirement: Hook fails silently on error
If `triggers.json` is missing, malformed, or the hook script throws for any reason, the hook SHALL fail without blocking prompt submission and SHALL emit no additional context for that turn.

#### Scenario: triggers.json is missing or corrupted
- **WHEN** the hook attempts to read `triggers.json` and the read or parse fails
- **THEN** the user's prompt is still submitted normally, with no crash and no additional context injected

### Requirement: Trigger map staleness is checked before commit
A `githooks/pre-commit` script at this plugin's own repository root SHALL detect when a staged SKILL.md in this plugin has a `triggers:` field that differs from the committed `triggers.json`, and SHALL fail the commit until the generator is re-run.

#### Scenario: A SKILL.md's triggers are edited but the generator was not re-run
- **WHEN** a commit is attempted with a staged SKILL.md whose `triggers:` field is out of sync with `triggers.json`
- **THEN** the commit is rejected with a message instructing the user to run the generator script
