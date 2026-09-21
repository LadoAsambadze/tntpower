// Smoke test for the two language versions of a running server.
// usage: node .claude/check-i18n-live.mjs http://localhost:3055
const base = process.argv[2] ?? "http://localhost:3055";
const GEO = /[Ⴀ-ჿ]+(?:[ —-]+[Ⴀ-ჿ]+)*/g;

const pages = ["/", "/services", "/services/electrical", "/services/waste-removal", "/pricing", "/about", "/contact"];

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");

const get = (path, opts) => fetch(base + path, { redirect: "manual", ...opts });

let failed = false;
for (const path of pages) {
  const ka = await get(path);
  const en = await get(path === "/" ? "/en" : `/en${path}`);
  const kaHtml = await ka.text();
  const enHtml = await en.text();
  const title = (h) => (h.match(/<title>(.*?)<\/title>/) ?? [])[1];
  const lang = (h) => (h.match(/<html[^>]*\blang="([^"]+)"/) ?? [])[1];
  const leftovers = [...new Set(strip(enHtml).match(GEO) ?? [])];
  const hreflang = (enHtml.match(/hrefLang="[^"]+"|hreflang="[^"]+"/g) ?? []).length;

  console.log(`\n${path}`);
  console.log(`  ka ${ka.status} lang=${lang(kaHtml)}  ${title(kaHtml)}`);
  console.log(`  en ${en.status} lang=${lang(enHtml)}  ${title(enHtml)}   hreflang tags: ${hreflang}`);
  console.log(`  Georgian left on the English page: ${leftovers.length}${leftovers.length ? "  -> " + leftovers.slice(0, 8).join(" | ") : ""}`);
  if (ka.status !== 200 || en.status !== 200 || lang(kaHtml) !== "ka" || lang(enHtml) !== "en" || leftovers.length) failed = true;
}

const redirect = await get("/ka/services");
console.log(`\n/ka/services -> ${redirect.status} ${redirect.headers.get("location")}`);
const missing = await get("/en/nope");
console.log(`/en/nope -> ${missing.status}`);
const sitemap = await (await get("/sitemap.xml")).text();
console.log(`sitemap urls: ${(sitemap.match(/<loc>/g) ?? []).length}, /en urls: ${(sitemap.match(/<loc>[^<]*\/en/g) ?? []).length}`);

console.log(failed ? "\nFAILED" : "\nOK");
process.exit(failed ? 1 : 0);
