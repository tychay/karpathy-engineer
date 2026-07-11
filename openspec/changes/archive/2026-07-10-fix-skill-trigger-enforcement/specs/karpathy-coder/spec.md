## ADDED Requirements

### Requirement: karpathy-coder declares its trigger phrases in frontmatter
The `karpathy-coder` skill's SKILL.md SHALL declare a `triggers:` frontmatter array containing its known invocation phrases (e.g. "karpathy check", "review my diff", "am I overcomplicating this", "before I commit"), consumed by this plugin's trigger-map generator.

#### Scenario: A user says a declared trigger phrase
- **WHEN** a user's prompt contains one of `karpathy-coder`'s declared trigger phrases
- **THEN** the plugin's `UserPromptSubmit` hook directs the model to invoke `karpathy-coder`, independent of whether the model would have noticed the phrase in the skill's prose description
