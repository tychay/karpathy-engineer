#!/usr/bin/env node
// karpathy-engineer — generator for triggers.json
// Reads triggers: arrays from skills/*/SKILL.md frontmatter and writes a
// static, flat { phrase: skillId } map. Run manually (or via precommit) after
// editing any SKILL.md's triggers: field; never scans at hook/prompt time.

const fs = require('fs');
const path = require('path');

const PLUGIN_ROOT = path.join(__dirname, '..', '..');
const SKILLS_DIR = path.join(PLUGIN_ROOT, 'skills');
const OUTPUT_PATH = path.join(PLUGIN_ROOT, 'triggers.json');

function readFrontmatter(skillMdPath) {
  const text = fs.readFileSync(skillMdPath, 'utf8');
  const match = /^---\n([\s\S]*?)\n---/.exec(text);
  return match ? match[1] : '';
}

function extractField(frontmatter, field) {
  const match = new RegExp(`^${field}:\\s*(.+)$`, 'm').exec(frontmatter);
  return match ? match[1].trim() : null;
}

function buildTriggerMap() {
  const map = {};
  const skillDirs = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  for (const skillId of skillDirs) {
    const skillMdPath = path.join(SKILLS_DIR, skillId, 'SKILL.md');
    if (!fs.existsSync(skillMdPath)) continue;

    const frontmatter = readFrontmatter(skillMdPath);
    const triggersRaw = extractField(frontmatter, 'triggers');
    if (!triggersRaw) continue;

    let triggers;
    try {
      triggers = JSON.parse(triggersRaw);
    } catch (e) {
      throw new Error(`${skillMdPath}: triggers: field is not valid JSON array: ${triggersRaw}`);
    }

    for (const phrase of triggers) {
      map[phrase.toLowerCase()] = skillId;
    }
  }

  return map;
}

function main() {
  const map = buildTriggerMap();
  const json = JSON.stringify(map, null, 2) + '\n';

  if (process.argv.includes('--check')) {
    const current = fs.existsSync(OUTPUT_PATH) ? fs.readFileSync(OUTPUT_PATH, 'utf8') : null;
    if (current !== json) {
      console.error(`${OUTPUT_PATH} is stale relative to skills/*/SKILL.md triggers:`);
      process.exitCode = 1;
      return;
    }
    console.log(`${OUTPUT_PATH} is up to date.`);
    return;
  }

  fs.writeFileSync(OUTPUT_PATH, json);
  console.log(`Wrote ${Object.keys(map).length} trigger phrase(s) to ${OUTPUT_PATH}`);
}

if (require.main === module) {
  main();
}

module.exports = { buildTriggerMap };
