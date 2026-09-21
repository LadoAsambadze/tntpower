// gettext-style i18n tooling. Georgian copy is never retyped: it is read from the source files.
//
//   node .claude/i18n-extract.mjs            list Georgian strings -> .claude/i18n-source.json
//   node .claude/i18n-extract.mjs --apply    also wrap in-component literals with tr("...")
//   node .claude/i18n-extract.mjs --merge    .claude/en-values.json (id -> English) -> src/i18n/messages/*.json
import ts from "typescript";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const GEO = /[Ⴀ-ჿ]/;
const APPLY = process.argv.includes("--apply");
const MERGE = process.argv.includes("--merge");
const SOURCE = ".claude/i18n-source.json";
const VALUES = ".claude/en-values.json";

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name).replaceAll("\\", "/");
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = walk("src").filter((f) => /\.(ts|tsx)$/.test(f) && !f.startsWith("src/i18n/"));

/** text -> { id, files:Set, client:boolean }. Ids are stable: known texts keep the id from the last run. */
const strings = new Map();
const moduleLevel = [];
const templates = [];
const knownIds = new Map();
try {
  for (const s of JSON.parse(readFileSync(SOURCE, "utf8"))) knownIds.set(s.text, s.id);
} catch {
  /* first run */
}
let nextId = Math.max(0, ...knownIds.values()) + 1;

/** plain .ts files whose in-function literals should also be wrapped */
const EXTRA_TRANSFORM = ["src/actions/contact.ts", "src/lib/jsonld.ts"];

const lineOf = (sf, pos) => sf.getLineAndCharacterOfPosition(pos).line + 1;
const insideFunction = (node) => {
  for (let p = node.parent; p; p = p.parent) if (ts.isFunctionLike(p)) return true;
  return false;
};
const alreadyWrapped = (node) =>
  ts.isCallExpression(node.parent) && node.parent.expression.getText() === "tr";

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const sf = ts.createSourceFile(
    file,
    src,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  // site.ts (nav labels, disclaimer) is rendered by Client Components too
  // ...and so is the Logo, which the client Header renders
  const CLIENT_SHARED = ["src/data/site.ts", "src/components/layout/Logo.tsx"];
  const isClient = /^\s*["']use client["']/.test(src) || CLIENT_SHARED.includes(file);
  const canTransform = file.endsWith(".tsx") || EXTRA_TRANSFORM.includes(file);
  const edits = [];

  const add = (text) => {
    if (!strings.has(text)) {
      strings.set(text, { id: knownIds.get(text) ?? nextId++, files: new Set(), client: false });
    }
    const entry = strings.get(text);
    entry.files.add(file);
    if (isClient) entry.client = true;
  };

  const visit = (node) => {
    if (ts.isJsxText(node)) {
      const raw = src.slice(node.pos, node.end);
      const norm = raw
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean)
        .join(" ");
      if (GEO.test(norm)) {
        add(norm);
        const lead = raw.match(/^\s*/)[0];
        const trail = raw.match(/\s*$/)[0];
        edits.push({ start: node.pos, end: node.end, text: `${lead}{tr(${JSON.stringify(norm)})}${trail}` });
      }
    } else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      if (GEO.test(node.text)) {
        add(node.text);
        if (alreadyWrapped(node)) {
          // idempotent: nothing to do
        } else if (ts.isJsxAttribute(node.parent)) {
          edits.push({ start: node.getStart(sf), end: node.end, text: `{tr(${JSON.stringify(node.text)})}` });
        } else if (canTransform && insideFunction(node)) {
          edits.push({ start: node.getStart(sf), end: node.end, text: `tr(${JSON.stringify(node.text)})` });
        } else {
          moduleLevel.push(`${file}:${lineOf(sf, node.getStart(sf))}`);
        }
      }
    } else if (ts.isTemplateExpression(node) && GEO.test(node.getText(sf))) {
      // `${alt} — text` : wrap each Georgian literal span -> `${alt}${tr(" — text")}`
      const spans = [node.head, ...node.templateSpans.map((s) => s.literal)];
      if (canTransform && insideFunction(node)) {
        for (const span of spans) {
          if (!GEO.test(span.text)) continue;
          add(span.text);
          // literal text sits between the delimiters: ` or } on the left, ${ or ` on the right
          const start = span.getStart(sf) + 1;
          const end = span.end - (ts.isTemplateTail(span) ? 1 : 2);
          edits.push({ start, end, text: "${tr(" + JSON.stringify(span.text) + ")}" });
        }
      } else {
        templates.push(`${file}:${lineOf(sf, node.getStart(sf))}`);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);

  if (APPLY && canTransform && edits.length) {
    let out = src;
    for (const e of edits.sort((a, b) => b.start - a.start)) {
      out = out.slice(0, e.start) + e.text + out.slice(e.end);
    }
    for (let attempt = 1; ; attempt++) {
      try {
        writeFileSync(file, out);
        break;
      } catch (error) {
        if (attempt >= 8) throw error;
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 300);
      }
    }
    console.log(`transformed ${file} (${edits.length})`);
  }
}

const list = [...strings]
  .map(([text, v]) => ({ id: v.id, text, client: v.client, files: [...v.files] }))
  .sort((a, b) => a.id - b.id);

if (MERGE) {
  const values = JSON.parse(readFileSync(VALUES, "utf8"));
  const all = {};
  const client = {};
  const missing = [];
  for (const s of list) {
    const en = values[String(s.id)];
    if (!en) {
      missing.push(s.id);
      continue;
    }
    all[s.text] = en;
    if (s.client) client[s.text] = en;
  }
  mkdirSync("src/i18n/messages", { recursive: true });
  writeFileSync("src/i18n/messages/en.json", JSON.stringify(all, null, 2) + "\n");
  writeFileSync("src/i18n/messages/en.client.json", JSON.stringify(client, null, 2) + "\n");
  console.log(`en.json: ${Object.keys(all).length} strings, en.client.json: ${Object.keys(client).length}`);
  console.log(`missing English for ids: ${missing.join(", ") || "none"}`);
} else {
  writeFileSync(SOURCE, JSON.stringify(list, null, 1) + "\n");
  console.log(`${list.length} unique Georgian strings -> ${SOURCE}`);
  console.log(`\nMODULE-LEVEL literals (translate at the render site with tr(value)):`);
  console.log([...new Set(moduleLevel.map((m) => m.split(":")[0]))].map((f) => "  " + f).join("\n"));
  console.log(`\nTEMPLATE literals with substitutions (handle by hand):`);
  templates.forEach((t) => console.log("  " + t));
}
