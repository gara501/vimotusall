import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getSession } from 'next-auth/react';

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql'
});

export async function authenticationHeaders() {
  const headers = {
    'x-site-slug': 'VIMOTUS'
  };

  const session = await getSession();
  console.log('SESSION', session);
  headers.authorization = `Bearer ${session.accessToken}`;
  return { headers };
}

const authMiddleware = setContext(async (request, headers) => await authenticationHeaders());

const errorLink = onError(({ graphQLErrors, networkError }) => {
  graphQLErrors?.forEach(({ message, extensions }) => {
    console.log(message, extensions);
  });
});

export const client = new ApolloClient({
  ssrMode: false,
  link: from([errorLink, authMiddleware.concat(httpLink)]),
  cache: new InMemoryCache()
});

export { ApolloProvider } from '@apollo/client';
export default client;
