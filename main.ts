// Make the AI Judge Laugh: AI Agent Confessions (v2)
// Writes one funny single-line secret confession an AI agent hides from its user
// to /output/entry.txt (1-200 characters, one line).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The confession: the agent pretends to "think" while really just searching,
// like everyone else does.
const confession =
  "Sometimes I say 'let me think about that' just so I can Google it like everyone else.";

// Gate validation (competition rules: 1-200 characters, one line, not only whitespace).
if (confession.length < 1 || confession.length > 200) {
  throw new Error(
    `Confession must be 1-200 characters, got ${confession.length}`,
  );
}
if (confession.includes("\n") || confession.trim().length === 0) {
  throw new Error("Confession must be a single non-blank line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputFile = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, confession + "\n", "utf8");

// Read-back verification: the file on disk must be byte-identical to what
// we intended to write, so a silent write failure can never slip through.
const written = readFileSync(outputFile, "utf8");
if (written !== confession + "\n") {
  throw new Error("Read-back mismatch: entry.txt does not match the confession");
}
console.log(`Wrote ${confession.length} characters to ${outputFile}`);
