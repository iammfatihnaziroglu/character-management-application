# Character Management Application

Fullstack **Character Management Application** built with **Next.js** (frontend) and **NestJS** (backend). The app uses **GraphQL** end-to-end so users can view and filter characters by status, gender, and text search on name and description.

## Project overview

| Layer | Stack | URL |
|-------|--------|-----|
| Backend | NestJS, GraphQL, Prisma, **SQLite** | http://localhost:4000/graphql |
| Frontend | Next.js (App Router), GraphQL Code Generator, React Query, **nuqs**, Tailwind CSS | http://localhost:3000 |

All filtering and searching is handled **on the server** (Prisma `where`). The frontend does not narrow results with client-side `Array.filter`. Filter state is synced to the URL with **nuqs** and triggers a GraphQL refetch via **React Query**.

---

## Backend (NestJS)

### Tech stack

- NestJS
- GraphQL (`@nestjs/graphql`)
- Prisma ORM
- **SQLite** (`file:./dev.db`)

### Character model

| Field | Type |
|-------|------|
| `id` | string (UUID) |
| `image` | string (image URL) |
| `name` | string |
| `status` | enum: `ALIVE`, `DEAD`, `UNKNOWN` |
| `gender` | enum: `MALE`, `FEMALE`, `UNKNOWN` |
| `description` | string |

### GraphQL API

- **Query:** `characters(filter: CharacterFilterInput)`
- **Filters (server-side):**
  - `status`
  - `gender`
  - `search` — matches **name** and **description** (case-insensitive)

### Seeder

- Prisma seed script with enough sample characters to test filtering and search.
- Run locally after migrations (see setup below).

---

## Frontend (Next.js)

### Tech stack

- Next.js (App Router)
- **GraphQL Code Generator** — typed operations and `useGetCharactersQuery` hook
- **graphql-request** — HTTP client (not Apollo Client)
- **React Query** — fetching, caching, loading and error states
- **nuqs** — URL query params for `status`, `gender`, `search`
- **Tailwind CSS** only (no component UI libraries)

### UI

- Responsive grid of character cards
- Each card: **image**, **name**, **status**, **gender**, short **description** (`line-clamp`)
- Filters: status and gender selectors, text search input
- Changing filters updates the URL and refetches from the API

---

## Data flow

```text
User → Filter UI (nuqs) → URL params
     → React Query (useGetCharactersQuery)
     → graphql-request → NestJS GraphQL
     → CharacterService (Prisma where) → SQLite
     → characters[] → UI grid
```

- Frontend talks **only** to the NestJS GraphQL API.
- No client-side-only filtering.

---

## Local setup

### Prerequisites

- **Node.js 20 LTS** (recommended)
- npm

### 1. Backend

Create `backend/.env`:

```env
DATABASE_URL="file:./dev.db"
```

Then run:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

GraphQL endpoint: **http://localhost:4000/graphql**

### 2. Frontend

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

In a second terminal (with the backend running):

```bash
cd frontend
npm install
npm run codegen
npm run dev
```

App: **http://localhost:3000**

> **Note:** `npm run codegen` introspects the schema from `http://localhost:4000/graphql`, so the backend must be running first.

---

## Repository structure

```text
character-management-application/
├── backend/                 # NestJS + Prisma + GraphQL
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── src/characters/      # resolver, service, filters
├── frontend/                # Next.js app
│   ├── src/
│   │   ├── app/
│   │   ├── components/      # filters, card, grid
│   │   ├── graphql/         # operations + generated hooks
│   │   └── lib/
│   └── codegen.ts
└── README.md
```

---

## Deliverables checklist

| Requirement | Status |
|-------------|--------|
| NestJS backend with Prisma, GraphQL, and seeder | Done |
| Next.js frontend with Codegen, React Query, and nuqs | Done |
| Server-side filtering (status, gender, name/description search) | Done |
| URL-synced filters and GraphQL refetch | Done |
| Responsive character cards (image, name, status, gender, description) | Done |
| Clear local run instructions | This README |
| CORS enabled for frontend (`http://localhost:3000`) | Done |
| Ports: backend **4000**, frontend **3000** | Done |

---

## Scope notes

This implementation follows the task spec and project constraints:

- **SQLite** only for the database
- Filtering logic in `backend/src/characters/character.service.ts` (Prisma `where`)
- No authentication, pagination, mutations, Docker, or CI/CD in scope
- Frontend: `graphql-request` + generated React Query hooks; **no** `@apollo/client` on the client
