// One-off: turn each page's static `metadata` object into a localised `generateMetadata`.
// Line-based on purpose, so the Georgian copy inside the object is moved as-is, never retyped.
import { readFileSync, writeFileSync } from "node:fs";

const pages = {
  "src/app/[lang]/layout.tsx": "/",
  "src/app/[lang]/about/page.tsx": "/about",
  "src/app/[lang]/contact/page.tsx": "/contact",
  "src/app/[lang]/pricing/page.tsx": "/pricing",
  "src/app/[lang]/services/page.tsx": "/services",
};

for (const [file, path] of Object.entries(pages)) {
  const lines = readFileSync(file, "utf8").split("\n");
  const start = lines.findIndex((l) => l.startsWith("export const metadata: Metadata = {"));
  if (start === -1) {
    console.log(`skip ${file} (already converted)`);
    continue;
  }
  const end = lines.findIndex((l, i) => i > start && /^};\s*$/.test(l));

  const body = lines
    .slice(start + 1, end)
    .filter((l) => !/^\s*alternates:/.test(l))
    .map((l) =>
      ("  " + l)
        .replaceAll("${site.cityIn}", "${tr(site.cityIn)}")
        .replaceAll("${priceDisclaimer}", "${tr(priceDisclaimer)}")
        .replaceAll("${site.slogan}", "${tr(site.slogan)}")
        .replace(/^(\s*)description: site\.description,/, "$1description: tr(site.description),"),
    );

  const header = [
    "export async function generateMetadata({",
    "  params,",
    "}: {",
    "  params: Promise<{ lang: string }>;",
    "}): Promise<Metadata> {",
    "  const { tr, locale } = getI18nFor((await params).lang);",
    "  return {",
  ];
  const footer = [`    alternates: alternatesFor(locale, "${path}"),`, "  };", "}"];

  lines.splice(start, end - start + 1, ...header, ...body, ...footer);

  let out = lines.join("\n");
  if (out.includes('import { getI18n } from "@/i18n/server";')) {
    out = out.replace('import { getI18n } from "@/i18n/server";', 'import { getI18n, getI18nFor } from "@/i18n/server";');
  } else {
    out = out.replace(/(import type \{ Metadata[^\n]*\n)/, '$1import { getI18nFor } from "@/i18n/server";\n');
  }
  out = out.replace(/(import type \{ Metadata[^\n]*\n)/, '$1import { alternatesFor } from "@/i18n/seo";\n');
  writeFileSync(file, out);
  console.log(`converted ${file}`);
}
