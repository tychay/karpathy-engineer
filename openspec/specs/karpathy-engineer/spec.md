### Requirement: karpathy-engineer orchestrates a 5-phase agile-bucket loop
The `karpathy-engineer` skill SHALL structure work as: (1) uncover the real goal, (2) plan tight agile-bucket specs, (3) fully spec the next bucket including a verification lever and a checkpoint, (4) loop implementation until the verification lever passes, (5) checkpoint with the user before moving to the next bucket.

#### Scenario: Starting a new project with no defined goal
- **WHEN** the real goal of a project is not yet known
- **THEN** `karpathy-engineer` invokes `grill-me` to interview the user and identify the real goal and core decision

#### Scenario: Returning to Phase 2 after a checkpoint
- **WHEN** the loop returns to planning after a Phase 5 checkpoint
- **THEN** `karpathy-engineer` determines whether the plan needs adjustment, using a `grill-me` retrospective if uncertain

### Requirement: karpathy-engineer supplies goal/destination context to grill-me
Because `grill-me` is context-free (see the `grill-me` spec), `karpathy-engineer` SHALL be the layer that decides, based on the current bucket's goal, whether to chain into `/opsx:propose`, how to persist bucket state, and what "done" means for that bucket. These decisions SHALL NOT be pushed down into `grill-me` itself.

#### Scenario: A technical bucket needs an OpenSpec proposal
- **WHEN** a fully spec'd bucket is technical and uses OpenSpec
- **THEN** `karpathy-engineer`, not `grill-me`, initiates `opsx:propose` as part of Phase 3/4, because the coding goal — not a grill-me mode flag — determines that chaining

### Requirement: Every bucket defines a verification lever
A bucket is not considered fully spec'd until it has an explicit verification lever (evaluation criteria) and a checkpoint for user review, in addition to the implementation plan itself.

#### Scenario: A bucket's plan lacks explicit success criteria
- **WHEN** `karpathy-engineer` reaches Phase 3 for a bucket and no verification lever has been defined
- **THEN** it is not considered fully spec'd, and `karpathy-engineer` must define the lever (with the user, via `grill-me` if needed) before proceeding to Phase 4

### Requirement: Technical buckets follow karpathy-coder discipline
When a bucket involves writing or modifying code, `karpathy-engineer` SHALL apply `karpathy-coder`'s guidelines (assumption surfacing, complexity limits, surgical diffs, verifiable goals) as a complement to its own phases, if `karpathy-coder` is installed.

#### Scenario: Implementing a technical bucket
- **WHEN** Phase 4 involves writing code
- **THEN** the loop follows `karpathy-coder`'s discipline in addition to `karpathy-engineer`'s own verification lever

### Requirement: karpathy-engineer declares its trigger phrases in frontmatter
The `karpathy-engineer` skill's SKILL.md SHALL declare a `triggers:` frontmatter array containing its known invocation phrases, consumed by this plugin's trigger-map generator.

#### Scenario: A user says a declared trigger phrase
- **WHEN** a user's prompt contains one of `karpathy-engineer`'s declared trigger phrases
- **THEN** the plugin's `UserPromptSubmit` hook directs the model to invoke `karpathy-engineer`, independent of whether the model would have noticed the phrase in the skill's prose description
