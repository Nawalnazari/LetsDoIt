# LetsDoIt — React Native App

A to-do list mobile app built with React Native + Expo, backed by a Node.js GraphQL server.

---

## Setup Instructions

### Prerequisites

- Node.js v18+
- Expo Go app installed on your iOS or Android device (for physical device testing)

### 1. Start the Backend

The app requires the GraphQL backend to be running first.

```bash
cd ../Backend_GraphQL
npm install
npm run dev
```

Server starts at `http://localhost:4000/`.

### 2. Install App Dependencies

```bash
cd RNExpo
npm install
```

### 3. Configure the GraphQL Endpoint

Open `src/apollo/client.ts` and set the correct URL for your target platform:

| Platform | URL |
|---|---|
| Android Emulator | `http://10.0.2.2:4000/` |
| iOS Simulator | `http://localhost:4000/` |
| Physical Device | `http://<your-machine-LAN-IP>:4000/` |

### 4. Run the App

```bash
npm start
```

Then from the Expo developer tools:

| Platform | How to launch |
|---|---|
| Android Emulator | Press `a` |
| iOS Simulator | Press `i` |
| Physical Device | Scan the QR code with Expo Go |

---

## Architecture Decisions

### MVVM Pattern
Each screen is split into two files — a UI file and a viewmodel hook. The screen file contains only JSX and styling. All state, GraphQL calls, and business logic live in the `use<Screen>ViewModel` hook. This keeps screens readable and makes logic independently testable.

```
screens/
├── LoginScreen/
│   ├── LoginScreen.tsx       ← UI only
│   └── useLoginViewModel.ts  ← state, mutations, submit logic
├── HomeScreen/
│   ├── HomeScreen.tsx
│   └── useHomeViewModel.ts
└── TodoScreen/
    ├── TodoScreen.tsx
    └── useTodoViewModel.ts
```

### Component Extraction
Large UI blocks are broken into small, single-purpose components in `src/components/`. Components are stateless where possible — they receive props and render UI, nothing more. Shared components like `TodoFormDialog` are reused across multiple screens to avoid duplication.

### Auth State via Context + AsyncStorage
`AuthContext` holds the logged-in user object in React state, making it available to any screen via `useAuth()` without prop drilling. AsyncStorage acts as the persistence layer — the user object is written to disk on login and read back on app launch, so the session survives app restarts. There are no JWT tokens; the backend returns the user object directly on login/signup.

### Navigation as a State Mirror
There is no `navigation.navigate()` call after login. Instead, `RootNavigator` renders either the login stack or the main tab bar based on whether `user` in AuthContext is null or not. When `setUser()` fires after a successful login, React re-renders the navigator automatically, which produces the redirect.

### Apollo Client for GraphQL
All queries and mutations are defined in a single file (`src/graphql/operations.ts`) and imported wherever needed. This avoids duplicated query strings and makes schema changes easy to track down. Apollo's `cache-and-network` fetch policy is used so screens show cached data instantly while refreshing in the background.

### React Native Paper for UI
Material Design 3 component library chosen for its comprehensive set of production-ready components (dialogs, FAB, chips, progress bar, segmented buttons) that would otherwise require significant custom work to build.

---

## Time Taken

| Task | Time |
|---|---|
| Project setup and dependency configuration | ~30 min |
| GraphQL client setup and operations | ~20 min |
| Auth flow (Context, AsyncStorage, navigation gate) | ~30 min |
| Login / Sign Up screen | ~30 min |
| Home dashboard screen | ~45 min |
| To-Do list screen (CRUD, filters, dialogs) | ~1 hr |
| MVVM refactor + component extraction | ~1 hr |
| Bug fixes (hitSlop, AsyncStorage version, Android emulator URL) | ~30 min |
| **Total** | **~5 hrs** |
