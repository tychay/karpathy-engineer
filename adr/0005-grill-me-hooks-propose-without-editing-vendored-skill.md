# 0005. grill-me hooks into /opsx:propose without editing the vendored skill

- Status: accepted
- Date: 2026-07-08

## Context

The user wants grill-me to run as a precursor to `/opsx:propose` for coding tasks, to front-load clarification and cut down the back-and-forth that currently happens during propose's own drafting stage. The obvious way to wire that up would be to add a line to `openspec-propose`'s SKILL.md pointing back at grill-me. Checked: that file (`.claude/skills/openspec-propose/SKILL.md` wherever it resolves in a consuming project) is CLI-generated scaffold — git-tracked with `metadata.author: openspec` and a `generatedBy` version stamp, not user-authored. It gets regenerated/overwritten by the `openspec` CLI tooling, so any edit there would not survive.

## Decision

The precursor relationship is expressed entirely on grill-me's side: its trigger `description` names "before `/opsx:propose`" as a use case, and its end-of-session behavior (coding mode) explicitly suggests running `/opsx:propose <name>` once shared understanding is reached. No file belonging to the openspec-propose skill is touched.

## Consequences

- Positive: survives `openspec` CLI upgrades/regeneration of its own scaffolded skills.
- Positive: the seam is entirely within this plugin's control.
- Negative: propose itself has no awareness that a grilling session preceded it — the connection is one-directional (grill-me → propose), not enforced or visible from the propose side.

*Source: verified by reading `openspec-propose`'s SKILL.md frontmatter and git history during bucket-1 planning, 2026-07-08.*
