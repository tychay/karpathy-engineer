## ADDED Requirements

### Requirement: karpathy-engineer declares its trigger phrases in frontmatter
The `karpathy-engineer` skill's SKILL.md SHALL declare a `triggers:` frontmatter array containing its known invocation phrases, consumed by this plugin's trigger-map generator.

#### Scenario: A user says a declared trigger phrase
- **WHEN** a user's prompt contains one of `karpathy-engineer`'s declared trigger phrases
- **THEN** the plugin's `UserPromptSubmit` hook directs the model to invoke `karpathy-engineer`, independent of whether the model would have noticed the phrase in the skill's prose description
