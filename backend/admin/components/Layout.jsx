import React from 'react';
import Head from 'next/head';

import NavBarComponent from './NavBarComponent';
import NavBarTwo from './NavBarTwo';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400&family=Raleway:wght@200;500;900&display=swap"
        rel="stylesheet"
      />
      <title>Vimotus Admin</title>
    </Head>
    <main id="app" className="flex flex-col h-screen w-screen" data-testid="layout">
      <NavBarTwo />
      <div className="flex-1 bg-theme-bg-light">{children}</div>
      <Footer />
    </main>
  </>
);

export default Layout;
