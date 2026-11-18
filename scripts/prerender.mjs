// Renders the app to static HTML after `vite build`, then inlines the
// stylesheet so the first paint needs a single request (the document).
// Run automatically as part of `npm run build`.
import { readFile, writeFile, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const { render } = await import(
  pathToFileURL(join(ssrDir, "entry-server.js")).href
);
const html = render();

const indexPath = join(distDir, "index.html");
let document = await readFile(indexPath, "utf8");

const rootMarker = '<div id="root"></div>';
if (!document.includes(rootMarker)) {
  throw new Error(`Cannot find ${rootMarker} in dist/index.html`);
}
document = document.replace(rootMarker, `<div id="root">${html}</div>`);

// Inline the single stylesheet to remove a render-blocking round trip.
const assets = await readdir(join(distDir, "assets"));
const cssFiles = assets.filter((file) => file.endsWith(".css"));
for (const file of cssFiles) {
  const href = `/assets/${file}`;
  const linkTag = new RegExp(
    `<link[^>]*rel="stylesheet"[^>]*href="${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`,
  );
  if (!linkTag.test(document)) continue;

  const css = await readFile(join(distDir, "assets", file), "utf8");
  document = document.replace(linkTag, `<style>${css}</style>`);
  await rm(join(distDir, "assets", file), { force: true });
}

// Preload the self-hosted fonts discovered in the inlined stylesheet. Without
// this the font download only starts during the first style/layout pass, so on
// slow connections the swap lands after first paint and shifts the hero.
const fontUrls = [
  ...new Set(
    [...document.matchAll(/url\((["']?)([^)"']*\.woff2)\1\)/g)].map(
      (match) => match[2],
    ),
  ),
];
if (fontUrls.length) {
  const preloads = fontUrls
    .map(
      (href) =>
        `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin>`,
    )
    .join("");
  document = document.replace("</head>", `${preloads}</head>`);
}

await writeFile(indexPath, document);
await rm(ssrDir, { recursive: true, force: true });

console.log(
  `prerender: injected ${(html.length / 1024).toFixed(1)} kB of HTML, inlined ${cssFiles.length} stylesheet(s)`,
);
