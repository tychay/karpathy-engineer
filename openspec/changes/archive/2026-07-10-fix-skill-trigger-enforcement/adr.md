# ADR Review Manifest

## ADR Review Completed

- Date: 2026-07-10
- Reviewer: Claude (opsx:propose)
- Change: fix-skill-trigger-enforcement

## In-Force ADR Context Reviewed

- adr/0001-plugin-lives-in-marketplace-not-project.md - confirms plugin (and its hooks/scripts) lives in the marketplace repo, consistent with adding the new hook here rather than in a project checkout.
- adr/0002-grill-me-single-skill-no-fork.md - the new `triggers:` frontmatter is additive to grill-me's single SKILL.md; does not require or introduce a fork.
- adr/0003-grill-me-is-context-free.md - trigger enforcement lives in the plugin/hook layer, not inside grill-me itself; preserves grill-me's context-free boundary.
- adr/0004-karpathy-coder-vendored-wholesale.md - confirms karpathy-coder is vendored and owned by this plugin, but also that its documented `karpathy-gate.sh` precommit pattern targets a *consumer* repo's own precommit, not this repo's; this change intentionally does not reuse or wire that pattern (see design.md Decision 5).

## Repository-Level ADRs Created

- adr/0005-deterministic-hook-based-skill-trigger-enforcement.md - establishes hook-based, frontmatter-driven, deterministic skill-trigger matching (scoped to this plugin) as the durable mechanism replacing reliance on model judgment alone.

## Notes

Confirmed during design review that `karpathy-coder`'s spec (`openspec/specs/karpathy-coder/spec.md`) states its pre-commit hook "SHALL live inside this plugin's own directory tree ... `hooks/`" but no such file exists in the vendored tree today — a pre-existing spec/implementation drift, unrelated to this change and out of scope to fix here. Flagged to the user separately.
