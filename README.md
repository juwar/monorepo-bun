# TypeScript Monorepo with Bun

This is a monorepo setup using Bun and TypeScript with the following structure:

- Frontend: Vite + React
- Backend: Elysia.js

## Project Structure

```
monorepo/
├── packages/
│   ├── frontend/     # Vite + React frontend
│   └── backend/      # Elysia.js backend
├── package.json      # Root package.json with workspaces
└── tsconfig.json     # Base TypeScript configuration
```

## Features

- Workspace setup with Bun
- TypeScript configuration with project references
- Frontend using Vite and React
- Backend using Elysia.js
- API client in frontend using @elysiajs/eden
- Absolute imports between packages

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start both frontend and backend in development mode
bun dev

# Start only frontend
bun dev:frontend

# Start only backend
bun dev:backend
```

### Building

```bash
# Build both frontend and backend
bun build

# Build only frontend
bun build:frontend

# Build only backend
bun build:backend
```

## API Integration

The frontend uses `@elysiajs/eden` to connect to the backend API. See `packages/frontend/src/lib/api.ts` for implementation details.
