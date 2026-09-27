import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Use your machine's LAN IP when testing on a physical device, e.g. http://192.168.x.x:4000/
// Android emulator uses 10.0.2.2 to reach the host machine.
// iOS simulator can use localhost. Physical devices need the host's LAN IP.
const GRAPHQL_URI = "http://10.0.2.2:4000/";

const httpLink = new HttpLink({ uri: GRAPHQL_URI });

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
