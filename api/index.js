// Vercel serverless entry: wraps the Express API bundled by `pnpm vercel-build`.
const mod = require("../artifacts/api-server/vercel-dist/index.cjs");
module.exports = mod.default ?? mod;
