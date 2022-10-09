import React from 'react';
import { UserProvider, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Hero from '../components/Hero';
import Hello from '../components/Hello';
import { setContext } from '@apollo/client/link/context';

export default function Index() {
  //const { user, isLoading } = useUser();
  const user = { name: 'andres' };

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  return (
    <>
      {!user && <Hero />}
      {user && (
        <div className="flex flex-col justify-center items-center w-screen">
          <div className="max-w-screen-2xl w-screen px-4 2xl:px-0">
            <Hello />
          </div>
        </div>
      )}
    </>
  );
}
