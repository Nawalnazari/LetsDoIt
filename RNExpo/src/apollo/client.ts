import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Android emulator uses 10.0.2.2 to reach the host machine.
// iOS simulator can use localhost.
// const GRAPHQL_URI = "http://10.0.2.2:4000/";
const GRAPHQL_URI = "https://letsdoit-production-1a5e.up.railway.app/";

const httpLink = new HttpLink({ uri: GRAPHQL_URI });

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
