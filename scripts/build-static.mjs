// Static Web Export: builds a self-contained site into ./static-export
// (index.html in root, everything else in assets/, all paths relative).
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "static-export");
const client = path.join(root, "dist", "client");

execSync("npx vite build", {
  stdio: "inherit",
  env: { ...process.env, STATIC_EXPORT: "true", VITE_STATIC_EXPORT: "true" },
});

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "assets"), { recursive: true });

const rel = (s, prefix) => s.replace(/(["'`(=])\/assets\//g, `$1${prefix}`);

// assets
for (const f of fs.readdirSync(path.join(client, "assets"))) {
  const src = path.join(client, "assets", f);
  const dst = path.join(out, "assets", f);
  if (/\.js$/.test(f)) fs.writeFileSync(dst, rel(fs.readFileSync(src, "utf8"), "./assets/"));
  else if (/\.css$/.test(f)) fs.writeFileSync(dst, rel(fs.readFileSync(src, "utf8"), "./"));
  else fs.copyFileSync(src, dst);
}

// index.html
fs.writeFileSync(
  path.join(out, "index.html"),
  rel(fs.readFileSync(path.join(client, "index.html"), "utf8"), "./assets/").replace(
    /href="\/favicon\.ico"/g,
    'href="./favicon.ico"',
  ),
);

// root files
for (const f of ["favicon.ico", "og-image.png", "placeholder.svg", "robots.txt"]) {
  fs.copyFileSync(path.join(root, "public", f), path.join(out, f));
}
fs.writeFileSync(path.join(out, ".nojekyll"), "");

console.log("Static export ready in ./static-export");
