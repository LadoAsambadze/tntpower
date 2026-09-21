// Full-page / section screenshot + DOM measurement via Chrome DevTools Protocol.
// usage: node shot.mjs <url> <width> <height> <out.png> [evalExpression]
// env:   CLIP_Y / CLIP_H — fixed clip; CLIP_TEXT — clip the <section> whose h1/h2 contains this text
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const [url, w, h, out, expr] = process.argv.slice(2);
const width = Number(w);
const height = Number(h);
const port = 9333 + Math.floor(Math.random() * 500);
const chrome = spawn(
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${process.cwd()}/chrome-profile-${port}`,
    `--window-size=${width},${height}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getTarget() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`);
      const list = await res.json();
      const page = list.find((t) => t.type === "page");
      if (page) return page;
    } catch {}
    await sleep(200);
  }
  throw new Error("chrome did not start");
}

const target = await getTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const mid = ++id;
    pending.set(mid, resolve);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value;
};

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 700,
});
await send("Page.navigate", { url });
await sleep(6000); // dev server compile + fonts + images

// მთელი გვერდი გადავსქროლოთ, რომ lazy-სურათები ჩაიტვირთოს, და დავბრუნდეთ თავში
const total = await evaluate("document.documentElement.scrollHeight");
// ნელა — ჰორიზონტალურ ლენტებში (nested scroller) lazy-სურათები მხოლოდ რეალურ ხილვადობისას იტვირთება
for (let y = 0; y < total; y += 600) {
  await evaluate(`window.scrollTo(0, ${y})`);
  await sleep(400);
}
await evaluate("window.scrollTo(0, 0)");
// სქროლ-ანიმაციით დამალული ბლოკები სქრინშოტისთვის ხილული გავხადოთ
await evaluate("document.querySelectorAll('.reveal').forEach((e) => e.classList.remove('reveal-pending')); 'ok'");
await sleep(1500);

if (expr) {
  console.log(JSON.stringify(await evaluate(expr), null, 2));
}

let clipY = process.env.CLIP_Y ? Number(process.env.CLIP_Y) : null;
let clipH = process.env.CLIP_H ? Number(process.env.CLIP_H) : height;
if (process.env.CLIP_TEXT) {
  const box = await evaluate(`(() => {
    const t = ${JSON.stringify(process.env.CLIP_TEXT)};
    const h = [...document.querySelectorAll("h1, h2")].find((e) => e.textContent.includes(t));
    if (!h) return null;
    const r = h.closest("section").getBoundingClientRect();
    return { top: Math.round(r.top + window.scrollY), height: Math.round(r.height) };
  })()`);
  if (!box) throw new Error(`section not found: ${process.env.CLIP_TEXT}`);
  clipY = box.top;
  clipH = box.height;
  console.log(`clip ${JSON.stringify(box)}`);
}

const { result } = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: true,
  ...(clipY !== null ? { clip: { x: 0, y: clipY, width, height: clipH, scale: 1 } } : {}),
});
writeFileSync(out, Buffer.from(result.data, "base64"));
console.log(`wrote ${out}`);
ws.close();
chrome.kill();
process.exit(0);
