# 0003. Grilling session storage is centralized in the vault, not per-project

- Status: accepted
- Date: 2026-07-08

## Context

`openspec/changes/` lives inside the repo being changed — that's the natural model to copy for grilling session state. But the user explicitly rejected it: grilling artifacts are personal-workflow-only, with no use outside that workflow, regardless of which project or topic prompted the session. Scattering them into whatever repo happened to be open at the time would make them hard to find and give them no home when the topic isn't a code project at all (e.g. the Android retro-handheld runbook).

Grilling output is also, by content, Terry's own thinking — his answers plus an AI synthesis of the exchange — which per root `CLAUDE.md`'s vault policy belongs in `tychay-ai-vault/myself/` (personal writing/ideas), not `mystuff/` (external reference material) and not scattered into arbitrary project directories.

## Decision

All grilling sessions, regardless of mode or topic, are stored centrally at `tychay-ai-vault/myself/grilling/`, one file per session, plus an `INDEX.md` for human browsing. AI-synthesized content is blockquoted per ADR-0013 (root vault convention).

## Consequences

- Positive: one place to look for any past grilling session, independent of which project prompted it.
- Positive: correctly classified under the vault's existing personal-writing/AI-blockquote convention.
- Negative: does not mirror `openspec/changes/`'s co-location-with-the-work model — acceptable since grilling long precedes and outlives any single change.

*Source: user decision during bucket-1 planning, 2026-07-08.*
