import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Table, Badge } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import ClientBox from '../../components/ClientBox';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Highlight from '../../components/Highlight';
import { useRouter } from 'next/router';
import { GET_TOKEN } from '../api/data';
import { useEffect } from 'react';

export default function Clients() {
  const { data: session, status } = useSession();
  const [state, setState] = useState({ isLoading: false, response: undefined, error: undefined });

  const [mutateFunction, { data, loading, error: getTokenError }] = useMutation(GET_TOKEN);

  useEffect(() => {
    mutateFunction({ variables: { username: 'gandres.ramirez@gmail.com', password: '123456' } });
    console.log('DATA', data);
  }, [mutateFunction]);

  const clients = [
    {
      id: 'c0b06709-54a5-4836-b6f6-27c90814459a',
      firstName: 'andres',
      lastName: 'ramirez',
      active: true,
      gender: 1,
      birthdate: '1981-03-24',
      createdAt: '1981-03-24',
      cellphone: '3156200033'
    },
    {
      id: 'd05c4b1e-6dc0-4628-aecb-e5268a64d51a',
      firstName: 'Camilo',
      lastName: 'ramirez',
      active: true,
      gender: 1,
      birthdate: '1981-03-24',
      createdAt: '1981-03-24',
      cellphone: '3156200033'
    },
    {
      id: 'f7d2ae85-aa0f-45f5-ade8-ff63c1a34f49',
      firstName: 'Felipe',
      lastName: 'ramirez',
      active: true,
      gender: 1,
      birthdate: '1981-03-24',
      createdAt: '1981-03-24',
      cellphone: '3156200033'
    }
  ];

  const router = useRouter();
  const callApi = async () => {
    setState(previous => ({ ...previous, isLoading: true }));

    try {
      const response = await fetch('/api/shows');
      const data = await response.json();

      setState(previous => ({ ...previous, response: data, error: undefined }));
    } catch (error) {
      setState(previous => ({ ...previous, response: undefined, error }));
    } finally {
      setState(previous => ({ ...previous, isLoading: false }));
    }
  };

  const handle = (event, fn) => {
    event.preventDefault();
    fn();
  };

  const view = id => {
    router.push(`clients/${id}`);
  };

  const edit = id => {
    router.push(`clients/${id}/edit`);
  };

  const { isLoading, response, error } = state;

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }

  return (
    <>
      <header className="bg-white shadow mb-2">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight uppercase text-gray-900">Clientes</h1>
        </div>
      </header>
      <div
        className="container-xl mx-auto mx-8 grid gap-4 grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4"
        data-testid="external">
        {clients?.map(client => (
          <ClientBox fullName={`${client.firstName} ${client.lastName}`} id={client.id} />
        ))}
      </div>
      <div className="result-block-container">
        {isLoading && <Loading />}
        {(error || response) && (
          <div className="result-block" data-testid="external-result">
            <h6 className="muted">Result</h6>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {response && <Highlight>{JSON.stringify(response, null, 2)}</Highlight>}
          </div>
        )}
      </div>
    </>
  );
}
