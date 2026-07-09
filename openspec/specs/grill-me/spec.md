### Requirement: grill-me is a single, unforked skill
The `grill-me` skill SHALL be implemented as one skill file with no mode axis (coding vs non-technical) and no output-mode branching in its own control flow. It SHALL NOT be split into a separate entry/mechanics pair unless a concrete failure case in real use demonstrates the split is needed.

#### Scenario: User invokes grill-me for any topic
- **WHEN** a user or calling skill invokes `grill-me` regardless of whether the topic is a coding task or a non-technical decision
- **THEN** the same skill file and question mechanics run, with phrasing generic enough to fit either case

### Requirement: grill-me is context-free
The `grill-me` skill SHALL NOT persist session records by default, and SHALL NOT hardcode a suggestion to invoke any specific downstream skill (e.g. `/opsx:propose`). Persistence and next-step chaining are the responsibility of whatever skill or workflow invoked `grill-me`.

#### Scenario: A coding-oriented caller wants to chain into opsx:propose
- **WHEN** `karpathy-engineer` (or any other orchestrating skill) calls `grill-me` as part of a coding-goal workflow
- **THEN** the orchestrating skill, not `grill-me` itself, decides to suggest or invoke `/opsx:propose` afterward

#### Scenario: A caller wants the session persisted
- **WHEN** a workflow needs a durable record of the grilling exchange
- **THEN** the calling context handles persistence (e.g. a research-discuss document, a plan file) as its own step; `grill-me` does not write to a dedicated session-storage location on its own

### Requirement: grill-me offers delivery options at session end
When a grilling session concludes, `grill-me` SHALL determine, per its own "When To Stop" logic, whether the result is delivered as: nothing beyond the chat reply, a plain markdown file, or a `research-discuss`-formatted document — and SHALL ask the user which they want when not already implied by context (e.g. active plan mode).

#### Scenario: Session ends outside of plan mode with no prior context
- **WHEN** a grilling session reaches a stopping condition and the calling context has not already specified where output goes
- **THEN** `grill-me` asks the user whether they want no artifact, a markdown file, or a research-discuss record, rather than assuming
