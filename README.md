# cirq

A modern monorepo built with:

- Next.js (App Router)
- tRPC
- Turbopack
- pnpm Workspaces
- Devcontainer
- Custom auth logic (pluggable)

---

## Project Structure

```
cirq/
├── apps/
│   └── web/            # Next.js app with App Router
├── packages/
│   └── api/            # Shared tRPC router
├── .devcontainer/      # Devcontainer setup
├── package.json        # Root scripts and workspace config
├── turbo.json          # Turborepo pipeline
├── pnpm-workspace.yaml # Defines workspace packages
```

---

## Getting Started

### 1. Prerequisites

- Node.js 20+
- pnpm (corepack enable && corepack prepare pnpm@latest --activate)
- Docker (for devcontainer support)

### 2. Setup

```
git clone https://your-repo-url/cirq.git
cd cirq
pnpm install
```

### 3. Devcontainer (VS Code Recommended)

To use the full dev environment:

1. Open the folder in VS Code
2. Run: F1 → Dev Containers: Reopen in Container

This installs all dependencies and tools in a Docker-based environment.

### 4. Development

```
pnpm dev
```

This starts the web app with Turbopack via:

```
cd apps/web
pnpm next dev
```

---

## Authentication

Custom authentication logic is implemented using a placeholder in:

```
apps/web/app/api/auth/login/route.ts
```

Replace the fakeValidateUser function with logic to authenticate against your legacy database.

---

## tRPC API

The shared API is located in:

```
packages/api/src/router.ts
```

To add a new endpoint:

```ts
hello: t.procedure.input(z.string()).query(({ input }) => `Hello, ${input}`)
```

Consumed client-side using:

```ts
const { data } = trpc.hello.useQuery('World')
```

---

## Middleware

Authentication is enforced via middleware in:

```
apps/web/middleware.ts
```

Requests without a valid JWT will be redirected to /login.

---

## Common Commands

| Command      | Description                  |
| ------------ | ---------------------------- |
| pnpm install | Install dependencies         |
| pnpm dev     | Run the dev server via turbo |
| pnpm build   | Build all packages           |

---

## Testing

Testing setup will be added using:

- Vitest for unit tests
- Playwright or Cypress for E2E

---
