import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_URI = 'http://localhost:4000/';

const httpLink = new HttpLink({ uri: GRAPHQL_URI });

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
