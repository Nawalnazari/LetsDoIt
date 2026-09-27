import { GraphQLError } from "graphql";
import { readDb, writeDb, nextId } from "./db.js";

function fail(message, code) {
  throw new GraphQLError(message, { extensions: { code } });
}

function publicUser(user) {
  const { password, ...rest } = user;
  return rest;
}

function findUser(db, id) {
  const user = db.users.find((u) => u.id === id);
  if (!user) fail(`User ${id} not found`, "NOT_FOUND");
  return user;
}

function findTodo(db, id) {
  const todo = db.todos.find((t) => t.id === id);
  if (!todo) fail(`Todo ${id} not found`, "NOT_FOUND");
  return todo;
}

export const resolvers = {
  Query: {
    user: (_, { id }) => {
      const user = readDb().users.find((u) => u.id === id);
      return user ? publicUser(user) : null;
    },

    todos: (_, { userId, completed }) =>
      readDb().todos.filter(
        (t) =>
          t.userId === userId &&
          (completed === undefined ||
            completed === null ||
            t.completed === completed),
      ),

    todo: (_, { id }) => readDb().todos.find((t) => t.id === id) || null,
  },

  Mutation: {
    signup: (_, { name, email, password }) => {
      const db = readDb();
      const normalizedEmail = email.trim().toLowerCase();
      if (!name.trim() || !normalizedEmail || !password) {
        fail("Name, email and password are required", "BAD_USER_INPUT");
      }
      if (db.users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
        fail("Email is already registered", "BAD_USER_INPUT");
      }

      const user = {
        id: nextId(db.users),
        name: name.trim(),
        email: normalizedEmail,
        password,
        createdAt: new Date().toISOString(),
      };
      db.users.push(user);
      writeDb(db);
      return publicUser(user);
    },

    login: (_, { email, password }) => {
      const normalizedEmail = email.trim().toLowerCase();
      const user = readDb().users.find(
        (u) =>
          u.email.toLowerCase() === normalizedEmail && u.password === password,
      );
      if (!user) fail("Invalid email or password", "BAD_USER_INPUT");
      return publicUser(user);
    },

    createTodo: (_, { userId, input }) => {
      if (!input.title.trim()) fail("Title is required", "BAD_USER_INPUT");

      const db = readDb();
      findUser(db, userId);
      const now = new Date().toISOString();
      const todo = {
        id: nextId(db.todos),
        userId,
        title: input.title.trim(),
        description: input.description ?? "",
        completed: false,
        createdAt: now,
        updatedAt: now,
      };
      db.todos.push(todo);
      writeDb(db);
      return todo;
    },

    updateTodo: (_, { id, input }) => {
      const db = readDb();
      const todo = findTodo(db, id);

      if (input.title !== undefined && input.title !== null) {
        if (!input.title.trim())
          fail("Title cannot be empty", "BAD_USER_INPUT");
        todo.title = input.title.trim();
      }
      if (input.description !== undefined)
        todo.description = input.description ?? "";
      if (input.completed !== undefined && input.completed !== null)
        todo.completed = input.completed;
      todo.updatedAt = new Date().toISOString();

      writeDb(db);
      return todo;
    },

    toggleTodo: (_, { id }) => {
      const db = readDb();
      const todo = findTodo(db, id);
      todo.completed = !todo.completed;
      todo.updatedAt = new Date().toISOString();
      writeDb(db);
      return todo;
    },

    deleteTodo: (_, { id }) => {
      const db = readDb();
      const todo = findTodo(db, id);
      db.todos = db.todos.filter((t) => t !== todo);
      writeDb(db);
      return todo;
    },
  },

  User: {
    todos: (parent) => readDb().todos.filter((t) => t.userId === parent.id),
  },

  Todo: {
    user: (parent) =>
      publicUser(readDb().users.find((u) => u.id === parent.userId)),
  },
};
