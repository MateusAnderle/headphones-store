import { ApolloClient, InMemoryCache } from '@apollo/client';
import { baseUrl } from '../../utils/baseUrl';

export const client = new ApolloClient({
  uri: `${baseUrl}/graphql`,
  cache: new InMemoryCache(),
});
