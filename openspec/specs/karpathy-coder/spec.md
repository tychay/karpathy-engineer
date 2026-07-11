### Requirement: karpathy-coder is vendored wholesale, not installed as a separate plugin
The `karpathy-coder` skill, its review agent, `/karpathy-check` command, and pre-commit hook SHALL live inside this plugin's own directory tree (`skills/karpathy-coder/`, `agents/`, `commands/`, `hooks/`), not be required as an externally installed plugin.

#### Scenario: Installing karpathy-engineer on a fresh machine
- **WHEN** a user installs the `karpathy-engineer` plugin from the marketplace
- **THEN** `karpathy-coder`'s discipline-enforcement mechanics are already present and functional, with no separate plugin install required

### Requirement: karpathy-coder complements, not replaces, karpathy-engineer's own rules
`karpathy-coder`'s complexity/assumption/diff/goal checks SHALL be applied in addition to `karpathy-engineer`'s Core Rules during technical bucket work, not as a substitute for them.

#### Scenario: A technical bucket is in Phase 4 (loop until checkpoint)
- **WHEN** code is being written or modified as part of a bucket's implementation
- **THEN** both `karpathy-engineer`'s verification-lever loop and `karpathy-coder`'s discipline checks (assumption linter, complexity checker, diff surgeon, goal verifier) apply

### Requirement: karpathy-coder's own dependencies are conditional, not hard
`karpathy-coder`'s references to `openspec` and `research-discuss` SHALL be treated as conditional integrations — used when those skills/plugins are present and relevant — not hard requirements for `karpathy-engineer` to function.

#### Scenario: karpathy-engineer is used in a project without openspec-adr or research-discuss installed
- **WHEN** neither `openspec-adr` nor `research-discuss` skills are available in the current project
- **THEN** `karpathy-engineer` and `karpathy-coder` still function, falling back to plain markdown plans/output instead of those integrations

### Requirement: karpathy-coder declares its trigger phrases in frontmatter
The `karpathy-coder` skill's SKILL.md SHALL declare a `triggers:` frontmatter array containing its known invocation phrases (e.g. "karpathy check", "review my diff", "am I overcomplicating this", "before I commit"), consumed by this plugin's trigger-map generator.

#### Scenario: A user says a declared trigger phrase
- **WHEN** a user's prompt contains one of `karpathy-coder`'s declared trigger phrases
- **THEN** the plugin's `UserPromptSubmit` hook directs the model to invoke `karpathy-coder`, independent of whether the model would have noticed the phrase in the skill's prose description
