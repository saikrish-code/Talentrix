# Talentrix

Enterprise-grade AI recruitment platform for hiring teams and candidates to streamline sourcing, resume parsing, semantic vector matching, and structured interview pipelines.

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](package.json)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-green.svg)](package.json)
[![Turborepo](https://img.shields.io/badge/monorepo-turborepo-ef4444.svg)](https://turbo.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey.svg)](#license)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

High-volume recruitment often suffers from manual resume screening bottlenecks, inconsistent evaluation criteria, and fragmented scheduling workflows. Talentrix addresses these challenges by integrating an end-to-end recruitment pipeline with AI-assisted resume parsing, vector-based semantic candidate matching, and collaborative scorecard evaluations. The platform keeps hiring decisions strictly human-in-the-loop, providing explainable scoring transparency drawers rather than opaque automated rejections.

---

## Features

- **Semantic AI Shortlisting**: Encodes job descriptions and candidate resumes into vector embeddings via PostgreSQL `pgvector`, ranking applicants by cosine similarity alongside plain-language LLM fit breakdowns.
- **Side-by-Side Resume Parsing**: Extracts structured profile data (work history, skills, education) while displaying the original PDF document preview in-app.
- **7-Stage Kanban Pipeline**: Track candidates across `Applied`, `AI Screened`, `Shortlisted`, `Interview`, `Offer`, `Hired`, and `Rejected` states with multi-candidate bulk actions and visual flags for candidates idle over 5 days.
- **Structured Interview Kits & Scorecards**: Generates competency-based questions, standardized 1–5 scorecards, and multi-interviewer panel summaries with divergence detection.
- **Candidate Self-Scheduling**: Interviewer calendar availability matching with public tokenized self-scheduling links (`/interviews/schedule/[token]`).
- **Executive Analytics & AI Insights**: Tracks time-to-hire, diversity indices, funnel drop-offs, recruiter workloads, and automated weekly natural-language trend summaries.
- **Pluggable AI Provider Layer**: Model-agnostic orchestration supporting OpenAI, Anthropic Claude, Google Gemini, Azure OpenAI, and local Ollama instances.
- **Role-Based Access Control (RBAC)**: Dedicated views and permissions for `ADMIN`, `HR_MANAGER`, `RECRUITER`, `HIRING_MANAGER`, `INTERVIEWER`, and `CANDIDATE`.
- **Public Career Portal**: Public job board and application portal with direct resume upload triggers (`/careers`, `/careers/[id]/apply`).

---

## Tech Stack

| Layer                       | Technologies                                                                                                      |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Monorepo Tooling**        | [Turborepo](https://turbo.build/), npm Workspaces                                                                 |
| **Frontend (`apps/web`)**   | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui primitives, SWR, NextAuth.js, Lucide Icons |
| **Backend (`apps/api`)**    | NestJS 10, Express, TypeScript, Passport.js (JWT & Local), Swagger/OpenAPI, Helmet, Throttler                     |
| **Database & Vector Store** | PostgreSQL with `pgvector` extension, Prisma ORM 5.22                                                             |
| **Document Storage**        | S3-compatible object storage (`@aws-sdk/client-s3`, presigned URLs)                                               |
| **AI / LLM Orchestration**  | OpenAI API, Anthropic Claude, Google Gemini, Azure OpenAI, Ollama                                                 |
| **Code Quality & Testing**  | TypeScript 5.6, Jest, ts-jest, ESLint, Prettier                                                                   |

---

## Architecture

Talentrix is structured as a monorepo separating web clients, API services, and shared libraries:

```mermaid
graph TD
    Client[Web Browser / Candidate / Recruiter] --> Web[apps/web - Next.js 14 App Router :3000]
    Web -->|HTTP / REST API| API[apps/api - NestJS REST Service :4000/api]

    API --> DB[(PostgreSQL + pgvector)]
    API --> S3[(S3-Compatible Storage)]
    API --> LLM[AI Layer: OpenAI / Anthropic / Gemini / Ollama]

    Web -.-> SharedTypes[packages/shared-types]
    API -.-> SharedTypes
    Web -.-> UI[packages/ui Design System]
```

---

## Prerequisites

Before running the project, ensure the following dependencies are installed on your machine:

- **Node.js**: `>= 20.0.0`
- **npm**: `>= 10.0.0` (tested with `10.9.2`)
- **PostgreSQL**: `>= 15.0` with the `pgvector` extension installed
- **Docker** _(optional, recommended for local PostgreSQL + pgvector setup)_

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/saikrish-code/Talentrix.git
cd Talentrix
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Database (Docker option)

If you do not have a local PostgreSQL instance with `pgvector`, start one using Docker:

```bash
docker run -d --name talentrix-postgres -e POSTGRES_USER=talentrix_user -e POSTGRES_PASSWORD=changeme -e POSTGRES_DB=talentrix -p 5432:5432 pgvector/pgvector:pg16
```

### 4. Configure Environment Variables

Create your local `.env` file from the provided template:

```bash
cp .env.example .env
```

Open `.env` and verify your `DATABASE_URL`, `NEXTAUTH_SECRET`, and AI provider credentials.

### 5. Run Database Migrations & Generate Prisma Client

```bash
npm run db:generate
npm run db:migrate
```

---

## Environment Variables

Configure the following variables in the root `.env` file:

| Variable                 | Description                                                                             | Default / Example Value                                                       |
| :----------------------- | :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `NODE_ENV`               | Application environment mode                                                            | `development`                                                                 |
| `POSTGRES_HOST`          | Database host                                                                           | `localhost`                                                                   |
| `POSTGRES_PORT`          | Database port                                                                           | `5432`                                                                        |
| `POSTGRES_DB`            | Database name                                                                           | `talentrix`                                                                   |
| `POSTGRES_USER`          | Database user                                                                           | `talentrix_user`                                                              |
| `POSTGRES_PASSWORD`      | Database password                                                                       | `changeme`                                                                    |
| `DATABASE_URL`           | Prisma PostgreSQL connection string                                                     | `postgresql://talentrix_user:changeme@localhost:5432/talentrix?schema=public` |
| `NEXTAUTH_URL`           | Canonical URL for NextAuth authentication                                               | `http://localhost:3000`                                                       |
| `NEXTAUTH_SECRET`        | Secret key used to encrypt NextAuth JWT tokens                                          | Run `openssl rand -base64 32`                                                 |
| `API_PORT`               | Port for NestJS backend API                                                             | `4000`                                                                        |
| `API_BASE_URL`           | Base URL of the API server                                                              | `http://localhost:4000`                                                       |
| `CORS_ORIGIN`            | Allowed client origin for CORS                                                          | `http://localhost:3000`                                                       |
| `JWT_SECRET`             | Secret key for backend API JWT auth                                                     | Run `openssl rand -base64 32`                                                 |
| `JWT_EXPIRES_IN`         | Access token lifespan                                                                   | `1d`                                                                          |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token lifespan                                                                  | `7d`                                                                          |
| `TALENTRIX_AI_PROVIDER`  | Active LLM provider (`openai` \| `anthropic` \| `google` \| `azure_openai` \| `ollama`) | `openai`                                                                      |
| `OPENAI_API_KEY`         | OpenAI API key (required if provider is `openai`)                                       | `sk-...`                                                                      |
| `OPENAI_MODEL`           | Chat completion model                                                                   | `gpt-4o`                                                                      |
| `OPENAI_EMBEDDING_MODEL` | Embedding model for pgvector similarity                                                 | `text-embedding-3-large`                                                      |
| `ANTHROPIC_API_KEY`      | Anthropic API key (required if provider is `anthropic`)                                 | `sk-ant-...`                                                                  |
| `GOOGLE_AI_API_KEY`      | Gemini API key (required if provider is `google`)                                       | `AIza...`                                                                     |
| `OLLAMA_BASE_URL`        | Base URL for local Ollama instance                                                      | `http://localhost:11434`                                                      |
| `S3_ENDPOINT`            | Endpoint for S3-compatible document storage                                             | `https://s3.amazonaws.com`                                                    |
| `S3_REGION`              | AWS / S3 region                                                                         | `ap-south-1`                                                                  |
| `S3_BUCKET`              | S3 bucket name for resumes and attachments                                              | `talentrix-documents`                                                         |
| `S3_ACCESS_KEY_ID`       | S3 access key ID                                                                        | `AKIA...`                                                                     |
| `S3_SECRET_ACCESS_KEY`   | S3 secret access key                                                                    | `secret...`                                                                   |

---

## Usage

### Start All Services Locally

Start the Next.js frontend and NestJS backend concurrently:

```bash
npm run dev
```

Once running, access the services:

- **Web Application**: [http://localhost:3000](http://localhost:3000)
- **REST API Endpoint**: [http://localhost:4000/api](http://localhost:4000/api)
- **Swagger API Documentation**: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

### Application Entry Points

- **Dashboard**: `http://localhost:3000/dashboard`
- **Requisitions**: `http://localhost:3000/jobs`
- **Kanban Pipeline**: `http://localhost:3000/recruitments`
- **Candidate Profiles**: `http://localhost:3000/candidates`
- **Interviews Calendar**: `http://localhost:3000/interviews`
- **Analytics**: `http://localhost:3000/analytics`
- **Design System Showcase**: `http://localhost:3000/design-system`
- **Public Career Portal**: `http://localhost:3000/careers`

---

## Available Scripts

Scripts can be executed from the repository root:

| Command                | Description                                                                 |
| :--------------------- | :-------------------------------------------------------------------------- |
| `npm run dev`          | Starts all applications in development mode with Turborepo caching disabled |
| `npm run build`        | Builds all packages and compiles Next.js and NestJS production artifacts    |
| `npm run lint`         | Runs ESLint across all workspaces and packages                              |
| `npm run typecheck`    | Validates TypeScript types across all projects (`tsc --noEmit`)             |
| `npm run test`         | Executes unit and integration tests across apps                             |
| `npm run format`       | Formats all code files using Prettier                                       |
| `npm run format:check` | Checks code formatting against Prettier rules without writing changes       |
| `npm run clean`        | Cleans build caches, `.next`, `dist`, and removes root `node_modules`       |
| `npm run db:generate`  | Generates the Prisma client based on `schema.prisma`                        |
| `npm run db:migrate`   | Runs database migrations in development mode                                |
| `npm run db:studio`    | Launches Prisma Studio GUI for exploring database records                   |

---

## API Reference

The backend exposes a versioned REST API at `/api/v1/*`. Interactive documentation and schema definitions are available via the Swagger UI at `http://localhost:4000/api/docs`.

### Key Endpoints

| Method  | Endpoint                             | Description                                                             | Auth Required |
| :------ | :----------------------------------- | :---------------------------------------------------------------------- | :------------ |
| `POST`  | `/api/v1/auth/login`                 | Authenticate user credentials and return JWT                            | No            |
| `GET`   | `/api/v1/auth/me`                    | Fetch currently authenticated user session                              | Bearer JWT    |
| `GET`   | `/api/v1/jobs`                       | Retrieve internal job requisitions (supports status/department filters) | Bearer JWT    |
| `GET`   | `/api/v1/jobs/public`                | Retrieve public active job listings                                     | No            |
| `GET`   | `/api/v1/jobs/:id/shortlist`         | Get candidate shortlist ranked by pgvector cosine similarity + LLM      | Bearer JWT    |
| `GET`   | `/api/v1/candidates`                 | List candidate profiles with parsed resume data                         | Bearer JWT    |
| `POST`  | `/api/v1/candidates/apply`           | Submit a public candidate application with resume data                  | No            |
| `GET`   | `/api/v1/applications`               | Query recruitment pipeline applications by job ID                       | Bearer JWT    |
| `PATCH` | `/api/v1/applications/:id/stage`     | Advance or update applicant pipeline status                             | Bearer JWT    |
| `POST`  | `/api/v1/applications/bulk-stage`    | Bulk update applicant stages                                            | Bearer JWT    |
| `GET`   | `/api/v1/interviews/calendar/events` | Retrieve scheduled interview events                                     | Bearer JWT    |
| `POST`  | `/api/v1/interviews/schedule`        | Schedule an interview slot with panel matching                          | Bearer JWT    |
| `GET`   | `/api/v1/analytics/summary`          | Retrieve recruitment metrics (time-to-hire, funnel conversion)          | Bearer JWT    |
| `POST`  | `/api/v1/ai/resume/parse`            | Parse raw resume text into structured candidate JSON                    | Bearer JWT    |
| `GET`   | `/api/v1/health`                     | Service liveness probe                                                  | No            |
| `GET`   | `/api/v1/health/ready`               | Service readiness probe                                                 | No            |

---

## Testing

The project uses [Jest](https://jestjs.io/) and `ts-jest` for automated testing.

Run all tests from the repository root:

```bash
npm run test
```

To run backend tests directly with watcher or coverage reports:

```bash
cd apps/api
npm run test:watch
npm run test:cov
npm run test:e2e
```

---

## Project Structure

```
talentrix/
├── apps/
│   ├── api/                   # NestJS REST backend service
│   │   ├── prisma/            # Prisma schema (PostgreSQL + pgvector)
│   │   └── src/
│   │       ├── ai-services/   # Model-agnostic LLM orchestration (OpenAI, Anthropic, Gemini, Ollama)
│   │       ├── analytics/     # Recruitment metrics and AI trend generation
│   │       ├── applications/  # Application state machine & stage management
│   │       ├── auth/          # JWT auth strategies, guards, and decorators
│   │       ├── candidates/    # Candidate profile management and resume intake
│   │       ├── health/        # Liveness and readiness endpoints
│   │       ├── interviews/    # Interview kits, scorecards, and scheduling
│   │       ├── jobs/          # Requisitions and pgvector candidate shortlisting
│   │       └── storage/       # S3-compatible document storage service
│   └── web/                   # Next.js 14 App Router frontend
│       └── src/
│           ├── app/           # Routes (Dashboard, Jobs, Candidates, Kanban, Analytics, Careers)
│           ├── components/    # Page-specific components and layout elements
│           └── lib/           # Auth options, API client, and utility functions
├── packages/
│   ├── shared-types/          # Shared TypeScript interfaces, DTOs, and recruitment enums
│   └── ui/                    # Reusable shadcn/ui React components
├── .env.example               # Template for environment configuration
├── package.json               # Root monorepo scripts & dependencies
├── tsconfig.base.json         # Base TypeScript configuration
└── turbo.json                 # Turborepo task pipeline configuration
```

---

## Deployment

<!-- TODO: Define production deployment target and infrastructure configuration (e.g., AWS ECS, Vercel, or Kubernetes Helm charts). -->

To build the project for a production environment:

```bash
npm run build
```

Run production instances:

```bash
# Frontend
cd apps/web && npm run start

# Backend
cd apps/api && npm run start
```

---

## Contributing

<!-- TODO: Create a formal CONTRIBUTING.md detailing pull request workflows, branch naming conventions, and code review criteria. -->

To contribute code:

1. Create a feature branch (`git checkout -b feature/your-feature-name`).
2. Implement your changes adhering to existing code conventions.
3. Validate code quality before opening a pull request:
   ```bash
   npm run lint
   npm run typecheck
   npm run format:check
   npm run test
   ```
4. Commit your changes and submit a pull request.

---

## License

<!-- TODO: Specify license type (e.g. MIT, Apache 2.0, or Proprietary). Currently marked private in package.json. -->

This repository is private and proprietary. All rights reserved.
