import type { NextFunction, Request, Response } from "express";
import { ensureSchema } from "@workspace/db";

let schemaReady: Promise<void> | undefined;

/** Creates the tables once per cold start (skipped for the health check). */
export function ensureSchemaMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.path === "/healthz") return next();
  schemaReady ??= ensureSchema();
  schemaReady.then(
    () => next(),
    (err) => {
      schemaReady = undefined;
      res
        .status(503)
        .json({ error: "Database unavailable", detail: String(err?.message ?? err) });
    },
  );
}
