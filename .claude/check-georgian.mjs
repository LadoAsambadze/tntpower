// Verifies Georgian copy was not corrupted while refactoring.
// 1) flags any Armenian / Cyrillic / Greek characters in src/
// 2) compares Georgian word tokens in the working tree against a known-good git ref
// usage: node .claude/check-georgian.mjs [ref=HEAD]
import { execSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ref = process.argv[2] ?? "HEAD";
const GEO = /[Ⴀ-ჿᲐ-Ჿ]+/g;
const FOREIGN = /[Ͱ-ϿЀ-ԯ԰-֏]/;

const git = (cmd) => execSync(`git ${cmd}`, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

const good = new Set();
for (const file of git(`ls-tree -r ${ref} --name-only src`).split("\n").filter(Boolean)) {
  for (const tok of git(`show "${ref}:${file}"`).match(GEO) ?? []) good.add(tok);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const present = new Set();
const foreign = [];
const fresh = new Map();
for (const file of walk("src").filter((f) => /\.(ts|tsx|css)$/.test(f))) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (FOREIGN.test(line)) foreign.push(`${file}:${i + 1}  ${line.trim().slice(0, 90)}`);
      for (const tok of line.match(GEO) ?? []) {
        present.add(tok);
        if (!good.has(tok)) fresh.set(tok, `${file}:${i + 1}`);
      }
    });
}

const lost = [...good].filter((t) => !present.has(t));
console.log(`known-good tokens: ${good.size}, present: ${present.size}`);
console.log(`\nFOREIGN-SCRIPT LINES (${foreign.length}):`);
foreign.slice(0, 40).forEach((l) => console.log("  " + l));
console.log(`\nNEW GEORGIAN TOKENS not in ${ref} (${fresh.size}):`);
[...fresh].slice(0, 80).forEach(([t, where]) => console.log(`  ${t}   ${where}`));
console.log(`\nLOST TOKENS (in ${ref}, missing now) (${lost.length}):`);
console.log("  " + lost.slice(0, 120).join(" "));
process.exit(foreign.length ? 1 : 0);
