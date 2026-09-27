# LetsDoIt — Web

A task management web app built with React, TypeScript, and GraphQL. Create, organize, and track your todos with a clean dashboard and full CRUD task list.

---

## Setup Instructions

### Prerequisites

- Node.js v18+

### Install and run

```bash
npm install
npm run dev
# App starts at http://localhost:5173/
```

### Available scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Type-check and build for production      |
| `npm run preview` | Preview the production build locally     |

### GraphQL endpoint

The API endpoint is configured in `src/apollo/client.ts`. Update the `GRAPHQL_URI` value if your server runs on a different host or port.

```ts
const GRAPHQL_URI = "http://localhost:4000/";
```

> Currently the backend is deployed on Railway. If you are running the backend locally, replace the URL with the appropriate local address from the table above.

---

## Architecture Decisions

### Vite

CRA is officially deprecated. Vite starts in under 500ms, has native ESM HMR, and produces smaller production builds.

### Tailwind CSS — no UI component library

The UI is built entirely with Tailwind utility classes using a custom purple theme (`#6750A4`). Pulling in a full component library (e.g. MUI at ~300 kB) adds significant bundle weight and fights against custom styling. Plain Tailwind gives full control with zero overhead.

### ViewModel pattern — one hook per page

Each page has a co-located `useXxxViewModel` hook that owns all state and GraphQL mutations/queries. The page component is pure rendering with no logic. This keeps pages thin and makes the data layer independently testable.

```
src/pages/Dashboard/
  DashboardPage.tsx        ← renders only
  useDashboardViewModel.ts ← all state & GraphQL
```

### Apollo Client for server state

Apollo handles fetching, caching, and refetching todos. `fetchPolicy: 'cache-and-network'` keeps the UI snappy on repeat visits while always syncing fresh data in the background.

### React Router v6 with a layout route

`AppLayout` wraps the two authenticated routes (`/dashboard`, `/todos`) and renders the bottom tab bar via `<Outlet>`. Unauthenticated users are redirected to `/login`. Protected and public routes are declared separately in `App.tsx` — no custom wrapper component needed.

### localStorage for auth persistence

The logged-in user is persisted to `localStorage` as JSON under the key `@letsdoit_user`. `AuthContext` exposes `login`, `logout`, `user`, and `loading` — the same API shape used across the app so any component can read auth state without prop drilling.

### No Redux / Zustand

The only global state is the current user (`AuthContext`). Apollo manages all server-side todo state. A separate state manager would add complexity with no benefit at this scope.

---

## Time Taken

| Phase                                                                       | Time       |
| --------------------------------------------------------------------------- | ---------- |
| Project scaffold (Vite, TypeScript, Tailwind, PostCSS config)               | ~30 min    |
| Core infrastructure (Apollo client, AuthContext, types, GraphQL operations) | ~45 min    |
| Components (AppLayout, TodoItem, TodoFormDialog, DeleteConfirmDialog)       | ~1.5 hrs   |
| Pages + view models (Login, Dashboard, Todos)                               | ~2.5 hrs   |
| Debugging, TypeScript fixes, and manual testing                             | ~45 min    |
| **Total**                                                                   | **~6 hrs** |
