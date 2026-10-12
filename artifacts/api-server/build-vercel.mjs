import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const dir = path.dirname(fileURLToPath(import.meta.url));

// Single self-contained CommonJS bundle used by the Vercel serverless function in /api/index.js
await build({
  entryPoints: [path.resolve(dir, "src/vercel-entry.ts")],
  outfile: path.resolve(dir, "vercel-dist/index.cjs"),
  platform: "node",
  target: "node20",
  format: "cjs",
  bundle: true,
  minify: false,
  sourcemap: false,
  external: ["pg-native"],
  logLevel: "info",
});
