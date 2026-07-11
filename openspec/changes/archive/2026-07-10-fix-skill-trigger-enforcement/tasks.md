## 1. Frontmatter — declare triggers on each skill

- [x] 1.1 Add `triggers:` array to `skills/grill-me/SKILL.md` frontmatter: `["grill me", "stress-test this", "challenge my plan", "interview me"]` (extract exact phrases already named in its `description`)
- [x] 1.2 Add `triggers:` array to `skills/karpathy-coder/SKILL.md` frontmatter: `["karpathy check", "review my diff", "check complexity", "am I overcomplicating this", "before I commit"]`
- [x] 1.3 Add `triggers:` array to `skills/karpathy-engineer/SKILL.md` frontmatter (review current description/usage for its own trigger phrasing; add an empty array if none are documented yet)

## 2. Generator — build triggers.json from frontmatter

- [x] 2.1 Decide and document the `triggers.json` schema (flat `{phrase: skillId}` vs grouped `{skillId: [phrases]}`) per design.md Open Questions — flat is recommended for O(1) hook-time lookup
- [x] 2.2 Write generator script (e.g. `src/hooks/build-triggers.js`, mirroring caveman plugin's `src/hooks/` layout) that reads `skills/*/SKILL.md` frontmatter in this plugin and writes `triggers.json` at the plugin root
- [x] 2.3 Run the generator once and commit the initial `triggers.json`

## 3. Hook — deterministic match and directive

- [x] 3.1 Write `UserPromptSubmit` hook script (e.g. `src/hooks/skill-trigger-match.js`) that reads `triggers.json`, lowercases and substring-matches the prompt, and on match writes `hookSpecificOutput.additionalContext` with a hard directive naming the matched skill ID and stating invocation via the Skill tool is mandatory before any other response
- [x] 3.2 Wrap the hook body in try/catch with silent fail (mirror `caveman-mode-tracker.js` pattern) so a missing/malformed `triggers.json` never blocks prompt submission
- [x] 3.3 Register the hook in `.claude-plugin/plugin.json` under `hooks.UserPromptSubmit`, command referencing `${CLAUDE_PLUGIN_ROOT}/src/hooks/skill-trigger-match.js`

## 4. Precommit — keep triggers.json in sync

- [x] 4.1 Decide precommit failure mode per design.md Open Questions (recommended: hard-fail with instructions to re-run the generator, not silent auto-regenerate-and-restage)
- [x] 4.2 **Deviation from plan** (confirmed with user during apply): the marketplace root (`<marketplace-root>/`) has no `.git` — the actual git repo root is this plugin's own directory (`plugins/karpathy-engineer/`). Created `githooks/pre-commit` there instead (repo-relative, no `plugins/karpathy-engineer/` path prefix); it regenerates `triggers.json` in-memory via `--check` and fails the commit if it differs from any staged `skills/*/SKILL.md`.
- [x] 4.3 Documented the one-time `git config core.hooksPath githooks` setup step in this plugin's own `README.md` (Development section) rather than the marketplace root, consistent with 4.2's actual repo boundary.

## 5. Verification

- [x] 5.1 Manually test: start a session, say "interview me", confirm the hook's `additionalContext` appears in the transcript and `grill-me` is invoked before any ad hoc response — confirmed live by user after session reload.
- [x] 5.2 Manually test: say "karpathy check", confirm `karpathy-coder`'s equivalent trigger fires the same way — confirmed live by user after session reload.
- [x] 5.3 Manually test: edit a `triggers:` array without regenerating `triggers.json`, attempt a commit, confirm the precommit hook blocks it — verified: added a phrase to `grill-me`'s `triggers:`, ran `githooks/pre-commit`, confirmed exit code 1 with the stale-file message; reverted the test edit afterward.
- [x] 5.4 Manually test: a prompt with no trigger phrase produces no additional context (no false-positive firing on ordinary conversation) — verified via direct script invocation with "what is the weather like today": no output.
