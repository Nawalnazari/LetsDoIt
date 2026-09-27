export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    todos: [Todo!]!
  }

  type Todo {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
    user: User!
  }

  input CreateTodoInput {
    title: String!
    description: String
  }

  input UpdateTodoInput {
    title: String
    description: String
    completed: Boolean
  }

  type Query {
    user(id: ID!): User
    todos(userId: ID!, completed: Boolean): [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!

    createTodo(userId: ID!, input: CreateTodoInput!): Todo!
    updateTodo(id: ID!, input: UpdateTodoInput!): Todo!
    toggleTodo(id: ID!): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;
