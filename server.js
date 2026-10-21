// Server statis tanpa dependensi, untuk panel Pterodactyl (Node.js egg).
// Menyajikan folder "dist" hasil `npm run build` lewat HTTP.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const base = fileURLToPath(new URL(".", import.meta.url));
const root = join(base, "dist");

// Jika "dist" belum ada, build otomatis saat server dinyalakan.
if (!existsSync(join(root, "index.html"))) {
  const vite = join(base, "node_modules", "vite", "bin", "vite.js");
  if (!existsSync(vite)) {
    console.log("Memasang dependensi (termasuk vite)...");
    spawnSync("npm", ["install", "--include=dev"], { stdio: "inherit", cwd: base });
  }
  console.log("Membangun aplikasi...");
  spawnSync(process.execPath, [vite, "build"], { stdio: "inherit", cwd: base });
  if (!existsSync(join(root, "index.html"))) console.error("Build gagal: dist/index.html tidak ditemukan. Cek log di atas.");
}
const port = Number(process.env.SERVER_PORT || process.env.PORT || 3286);

const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".ico": "image/x-icon", ".json": "application/json",
  ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8",
};

http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = normalize(join(root, pathname));
    if (!file.startsWith(root)) { res.writeHead(403).end("Forbidden"); return; }
    let info = await stat(file).catch(() => null);
    if (info?.isDirectory()) { file = join(file, "index.html"); info = await stat(file).catch(() => null); }
    if (!info) file = join(root, "index.html"); // fallback SPA
    const data = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Cache-Control": file.includes("/assets/") ? "public, max-age=31536000, immutable" : "no-cache",
    });
    res.end(data);
  } catch (e) {
    console.error(e);
    res.writeHead(500).end("Server error: " + e.message);
  }
}).listen(port, "0.0.0.0", () => console.log("Zestansoft App berjalan di port " + port));
