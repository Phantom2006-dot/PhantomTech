# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **AI**: Replit AI Integrations (OpenAI-compatible proxy, no API key needed)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### PHANTOM (`artifacts/phantom`)
- Dark cosmic brand website with 10 original sections + 6 technology sections
- Singularity Mode toggle (∞ button, bottom-right) — slows all animations to 60% speed
- **Physics AI** page at `/physics-ai` — chat with an AI physics expert
- Navbar links to Physics AI

### API Server (`artifacts/api-server`)
- Express 5 REST API at `/api`
- Physics AI chat routes at `/api/openai/conversations/**` (SSE streaming)
- DB schema: `conversations`, `messages` tables

## Physics AI Feature

- Chat interface with conversation history persisted to PostgreSQL
- Streaming responses via Server-Sent Events (SSE)
- System prompt specializes the AI in physics (classical, quantum, relativity, cosmology, etc.)
- Example questions on the welcome screen
- Collapsible sidebar for conversation history

## Libraries

- `lib/integrations-openai-ai-server` — OpenAI SDK client wrapper
- `lib/integrations-openai-ai-react` — React hooks for voice/audio (future use)
- `lib/db` — Drizzle ORM schema and client
- `lib/api-spec` — OpenAPI spec + Orval codegen config
- `lib/api-zod` — Generated Zod validation schemas
- `lib/api-client-react` — Generated React Query hooks
