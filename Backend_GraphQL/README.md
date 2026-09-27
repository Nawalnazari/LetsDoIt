# LetsDoIt – GraphQL Backend (mock)

A Node.js + GraphQL API for the LetsDoIt todo app. It handles user signup and login, plus create/read/update/delete (CRUD) for todo items. Data is kept in a local JSON file that acts as a mock database.

---

## Setup Instructions

### Prerequisites

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm run dev     # development: auto-restarts on changes in src/
# or
npm start       # plain run
```

The server starts at **http://localhost:4000**. Open that URL in a browser to use Apollo Sandbox, where you can write and run queries.

To use a different port:

```bash
PORT=5000 npm start
```

### Test accounts

| Name       | Email              | Password      | User id |
| ---------- | ------------------ | ------------- | ------- |
| John Doe   | `john@example.com` | `password123` | `1`     |
| Jane Smith | `jane@example.com` | `password123` | `2`     |

### Resetting data

All changes are saved to `db.json`. To go back to the original data, restore the file, for example with `git checkout db.json`, or edit it by hand.

### Example queries

```graphql
# Auth
mutation {
  login(email: "john@example.com", password: "password123") {
    id
    name
    email
  }
}
mutation {
  signup(name: "Alice", email: "alice@example.com", password: "secret") {
    id
    name
  }
}

# Read
query {
  todos(userId: "1", completed: false) {
    id
    title
    description
    completed
  }
}
query {
  todo(id: "1") {
    id
    title
  }
}
query {
  user(id: "1") {
    name
    todos {
      title
    }
  }
}

# Create / update / delete
mutation {
  createTodo(
    userId: "1"
    input: { title: "New task", description: "optional" }
  ) {
    id
    title
  }
}
mutation {
  updateTodo(id: "1", input: { title: "Updated", completed: true }) {
    id
    title
    completed
  }
}
mutation {
  toggleTodo(id: "1") {
    id
    completed
  }
}
mutation {
  deleteTodo(id: "1") {
    id
  }
}
```

---

## Architecture Decisions

### Project structure

```
db.json            mock database (users, todos)
src/index.js       server bootstrap
src/schema.js      GraphQL type definitions
src/resolvers.js   queries & mutations
src/db.js          read/write db.json
```

### Decisions

- **Apollo Server 4 (standalone).** It is the most widely used GraphQL server for Node.js. `startStandaloneServer` runs without Express and includes Apollo Sandbox for testing queries, so setup is minimal.
- **JSON file as the database (`db.json`).** It's a mockup, so there's no need for a real database. Every request reads the file, and every mutation writes it back. Data survives restarts, and you can inspect or edit it directly.
- **Simple login, no tokens.** `login` checks the email and password against `db.json` and returns the user. There are no sessions or JWTs. The client keeps the returned user `id` and passes it as `userId` to the todo operations. Passwords are stored in plain text, which is acceptable for mock data only.
- **Passwords never returned.** The `User` GraphQL type has no `password` field. Resolvers also remove it with `publicUser()` as an extra safeguard.
- **Relations resolved on demand.** `User.todos` and `Todo.user` are field resolvers. Clients can ask for nested data, like a user with their todos, without extra API endpoints.
- **Consistent errors.** Failures throw a `GraphQLError` with a `code`: `BAD_USER_INPUT` for invalid input and `NOT_FOUND` for missing items. The frontend can handle errors by checking the code.
- **Referential check on create.** `createTodo` checks that the `userId` exists, so no todo can point to a missing user.
- **Auto-increment string ids.** New ids are `max(existing id) + 1`, which mimics a relational database and keeps ids readable.
- **nodemon watches `src/` only.** Writes to `db.json` don't trigger a server restart during development.

---

## Time Taken

**Total: ~2 working days (about 16 hours)**

| Day   | Task                                                                                     | Time    |
| ----- | ---------------------------------------------------------------------------------------- | ------- |
| Day 1 | GraphQL groundwork: learning schemas, resolvers, queries vs. mutations, Apollo Server     | 3h      |
| Day 1 | Requirements review & GraphQL schema design (types, queries, mutations)                   | 1.5h    |
| Day 1 | Project setup (Node.js, Apollo Server, nodemon, ES modules)                               | 1h      |
| Day 1 | Mock database layer (`db.json` read/write, id generation, seed data)                      | 1h      |
| Day 1 | Signup & login resolvers                                                                  | 1.5h    |
| Day 2 | Todo CRUD resolvers (create, read, update, toggle, delete)                                | 2h      |
| Day 2 | Relations (`User.todos`, `Todo.user`), input validation & error handling                  | 2h      |
| Day 2 | Manual testing in Apollo Sandbox & bug fixes                                              | 2h      |
| Day 2 | Refactor: simplified auth (removed tokens) to fit the mock scope                          | 0.5h    |
| Day 2 | Documentation (README)                                                                    | 1.5h    |
|       | **Total**                                                                                 | **16h** |
