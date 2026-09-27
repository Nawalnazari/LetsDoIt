# LetsDoIt

A task management app built across three projects — a React web app, a React Native mobile app, and a shared GraphQL backend.

## Projects

| Folder | Stack | Description |
|---|---|---|
| `ReactWeb/` | React, TypeScript, Vite, Tailwind, Apollo Client | Web app |
| `RNExpo/` | React Native, Expo, Apollo Client | iOS & Android app |
| `Backend_GraphQL/` | Node.js, Apollo Server, GraphQL | Shared API server |

## Getting Started

Clone the repo once to get all three projects:

```bash
git clone https://github.com/your-username/LetsDoIt.git
cd LetsDoIt
```

Then install and run each project from its own folder:

```bash
# Terminal 1 — backend (start this first)
cd Backend_GraphQL && npm install && npm start

# Terminal 2 — web
cd ReactWeb && npm install && npm run dev

# Terminal 3 — mobile
cd RNExpo && npm install && npx expo start
```

## Project Docs

- [ReactWeb README](./ReactWeb/README.md)
