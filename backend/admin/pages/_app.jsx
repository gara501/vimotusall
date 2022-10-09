import React from 'react';
import { ApolloProvider, client } from '../services/apollo/client';
import { SessionProvider } from 'next-auth/react';

import Layout from '../components/Layout';

import '@fortawesome/fontawesome-svg-core/styles.css';
import initFontAwesome from '../utils/initFontAwesome';
import '../styles/globals.css';

initFontAwesome();

export default function App({ Component, session, ...pageProps }) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ApolloProvider>
  );
}
