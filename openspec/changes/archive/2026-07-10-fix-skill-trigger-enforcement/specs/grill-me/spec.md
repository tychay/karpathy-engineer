## ADDED Requirements

### Requirement: grill-me declares its trigger phrases in frontmatter
The `grill-me` skill's SKILL.md SHALL declare a `triggers:` frontmatter array containing its known invocation phrases (e.g. "grill me", "stress-test this", "challenge my plan", "interview me"), consumed by this plugin's trigger-map generator.

#### Scenario: A user says a declared trigger phrase
- **WHEN** a user's prompt contains one of `grill-me`'s declared trigger phrases
- **THEN** the plugin's `UserPromptSubmit` hook directs the model to invoke `grill-me`, independent of whether the model would have noticed the phrase in the skill's prose description
