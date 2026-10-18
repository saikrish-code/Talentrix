# Talentrix — Enterprise AI Recruitment Platform

Talentrix is a modern, enterprise-grade AI-powered recruitment platform designed to streamline hiring pipelines, candidate sourcing, resume parsing, semantic matching via vector embeddings, and collaborative interview evaluation.

---

## Architecture & Monorepo Structure

Talentrix is built as an npm/Turborepo monorepo consisting of the following packages and applications:

```
talentrix/
├── apps/
│   ├── web/              # Next.js 14 (App Router) frontend application
│   └── api/              # NestJS REST API backend service
├── packages/
│   ├── shared-types/     # Shared TypeScript types, DTOs, and enums
│   └── ui/               # Shared React UI component library (shadcn/ui + Tailwind)
├── .env.example          # Environment variables template
├── turbo.json            # Turborepo task pipeline configuration
└── package.json          # Root monorepo configuration & scripts
```

---

## Tech Stack

- **Frontend (`apps/web`)**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui components, NextAuth.js.
- **Backend (`apps/api`)**: Node.js, NestJS, TypeScript, Prisma ORM, Passport.js (JWT/Local), Swagger/OpenAPI documentation.
- **Database & Vector Store**: PostgreSQL with Prisma ORM and `pgvector` extension for high-performance resume/JD semantic embeddings and similarity matching.
- **File Storage**: S3-compatible object storage for resumes, cover letters, and candidate documents.
- **AI Layer (`ai-services`)**: Model-agnostic LLM orchestration layer supporting OpenAI, Anthropic Claude, Google Gemini, Azure OpenAI, and local Ollama models.

---

## Getting Started

### 1. Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL (with `pgvector` extension enabled)

### 2. Environment Setup
Copy `.env.example` to `.env` in the root directory and configure your database credentials, API keys, and storage settings:
```bash
cp .env.example .env
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Migration
Generate Prisma client and run database migrations:
```bash
npm run db:generate
npm run db:migrate
```

### 5. Running Development Servers
Start all monorepo applications in development mode using Turborepo:
```bash
npm run dev
```

- **Web App**: `http://localhost:3000`
- **API Server**: `http://localhost:4000/api`
- **Swagger Docs**: `http://localhost:4000/api/docs`

---

## Available Scripts

- `npm run dev` — Start all apps in development mode
- `npm run build` — Build all apps and packages
- `npm run lint` — Lint all packages and apps
- `npm run typecheck` — Run TypeScript type checking across monorepo
- `npm run test` — Run unit and integration tests
- `npm run format` — Format codebase with Prettier
- `npm run db:generate` — Generate Prisma client
- `npm run db:migrate` — Run database migrations
- `npm run db:studio` — Open Prisma Studio database GUI
