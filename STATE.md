# karpathy-engineer — state

Compact map for a future session to pick up without replaying full history. Update at the close of every bucket.

## Built

- **Bucket 1** (2026-07-08): `grill-me` (entry, resolves mode + output forks) + `grilling` (interview mechanics, mode/output-branched). See `skills/grill-me/SKILL.md`, `skills/grilling/SKILL.md`.

## Deferred (mapped, not built)

- **Bucket 2** — `verify` skill: explicit eval criteria captured upfront (Karpathy's "Verifier" layer).
- **Bucket 3** — second-model/Codex cross-check verification.
- **Bucket 4** — `karpathy-engineer` orchestrator: ties Spec (grill-me/grilling) + Verifier + Environment into a resumable, backtrackable agile-loop-over-openspec workflow. Needs the agile-bucket/checkpoint machinery, which must be re-sourced from the actual Karpathy interview note (`tychay-ai-vault/myself/coding-projects/my-project/ai memory systems/karpathy-interview-breakdown-video-notes.md`) — bucket 1's `/watch` clip was the grill-me skill author's own explainer, not the Karpathy interview, and had no agile-bucket/verifier content.
- **Bucket 5** — Environment-layer (CLAUDE.md/rules generation) support, if not already covered by existing plugins (aiml, osadr).

## Key decisions (see `adr/` for full reasoning)

- Plugin lives in the marketplace, not project-local — `adr/0001`.
- Two independent fork axes: mode (coding/non-technical) and output (research-discuss/chat/plan) — `adr/0002`.
- Grilling session storage is centralized at `tychay-ai-vault/myself/grilling/`, not per-invoking-project — `adr/0003`.
- One file per grilling session, not a single growing doc — `adr/0004`.
- grill-me hooks `/opsx:propose` from its own side only; `openspec-propose`'s SKILL.md is CLI-vendored, never edited — `adr/0005`.

## Open threads for next session

- Bucket 1 is unverified in live use — see the Verification section of the bucket-1 plan (`~/.claude/plans/read-karpathy-method-grill-me-thoughts-c-ticklish-raven.md`) for what to test.
- No ADR yet covers what "small agile buckets" means operationally for bucket 4 — needs the real Karpathy interview content before that bucket can be planned.
