// One-off wiring after `i18n-extract.mjs --apply`:
//  - internal href literals -> href("/path") so links keep the current language
//  - every top-level function that uses tr()/href() gets them from getI18n() (server) or useI18n() (client)
// Never touches Georgian text.
import ts from "typescript";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SKIP = ["src/components/layout/Logo.tsx", "src/app/[lang]/layout.tsx"];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name).replaceAll("\\", "/");
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

for (const file of [...walk("src/components"), ...walk("src/app")].filter((f) => f.endsWith(".tsx"))) {
  if (SKIP.includes(file)) continue;
  let src = readFileSync(file, "utf8");
  const before = src;

  src = src
    .replace(/\bhref="(\/[^"]*)"/g, 'href={href("$1")}')
    .replace(/\bhref=\{(`\/[^`]*`)\}/g, "href={href($1)}");

  const isClient = /^\s*["']use client["']/.test(src);
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const inserts = [];

  for (const stmt of sf.statements) {
    if (!ts.isFunctionDeclaration(stmt) || !stmt.body) continue;
    const body = src.slice(stmt.body.pos, stmt.body.end);
    const needs = [/\btr\(/.test(body) && "tr", /\bhref\(/.test(body) && "href"].filter(Boolean);
    if (!needs.length || /=\s*(await getI18n|useI18n)\(\)/.test(body)) continue;

    const open = stmt.body.getStart(sf) + 1; // right after "{"
    const call = isClient ? "useI18n()" : "await getI18n()";
    inserts.push({ pos: open, text: `\n  const { ${needs.join(", ")} } = ${call};` });

    const isAsync = stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword);
    if (!isClient && !isAsync) {
      const fnKeyword = src.indexOf("function", stmt.getStart(sf));
      inserts.push({ pos: fnKeyword, text: "async " });
    }
  }

  if (inserts.length) {
    for (const ins of inserts.sort((a, b) => b.pos - a.pos)) {
      src = src.slice(0, ins.pos) + ins.text + src.slice(ins.pos);
    }
    const importLine = isClient
      ? 'import { useI18n } from "@/i18n/client";'
      : 'import { getI18n } from "@/i18n/server";';
    if (!new RegExp(isClient ? "\\buseI18n\\b.*@/i18n/client" : "\\bgetI18n\\b.*@/i18n/server").test(src)) {
      const imports = [...src.matchAll(/^import .*?;\s*$/gms)];
      const last = imports.at(-1);
      const at = last ? last.index + last[0].length : 0;
      src = src.slice(0, at) + (src[at - 1] === "\n" ? "" : "\n") + importLine + "\n" + src.slice(at);
    }
  }

  if (src !== before) {
    // Windows: a watcher (dev server / editor) can hold the file for a moment — retry
    for (let attempt = 1; ; attempt++) {
      try {
        writeFileSync(file, src);
        break;
      } catch (error) {
        if (attempt >= 8) throw error;
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 300);
      }
    }
    console.log(`wired ${file}${isClient ? " (client)" : ""}`);
  }
}
