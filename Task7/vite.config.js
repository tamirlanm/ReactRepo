import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function buildServiceWorker() {
  return {
    name: "build-service-worker",
    apply: "build",

    async writeBundle({ dir }) {
      const assets = await readdir(`${dir}/assets`);
      const files = [
        "index.html",
        "manifest.json",
        "icon-192.png",
        "icon-512.png",
        "hero.svg",
        "offline/index.html",
        ...assets.map((name) => `assets/${name}`),
      ].sort((a, b) => a.localeCompare(b, "en"));

      const workerPath = fileURLToPath(
        new URL("./pwa/worker.js", import.meta.url)
      );
      const worker = await readFile(workerPath, "utf8");
      const hash = createHash("sha256").update(worker);

      const contents = await Promise.all(
        files.map(async (path) => ({
          path,
          content: await readFile(`${dir}/${path}`),
        }))
      );

      for (const { path, content } of contents) {
        hash.update(path).update(content);
      }

      const version = hash.digest("hex").slice(0, 16);
      await writeFile(
        `${dir}/sw.js`,
        `const BUILD = "${version}";\nconst SHELL_FILES = ${JSON.stringify(files)};\n${worker}`
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), buildServiceWorker()],
  base: "/ReactRepo/Task7/",
});