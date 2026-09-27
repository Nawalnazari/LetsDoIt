import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const GRAPHQL_URI = 'http://localhost:4000/';
const GRAPHQL_URI = "https://letsdoit-production-1a5e.up.railway.app/";

const httpLink = new HttpLink({ uri: GRAPHQL_URI });

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
