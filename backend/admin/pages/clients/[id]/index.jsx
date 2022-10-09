import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Badge } from 'flowbite-react';
import * as dayjs from 'dayjs';

import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/ErrorMessage';
import Highlight from '../../../components/Highlight';

export default function Edit({ props }) {
  const [state, setState] = useState({ isLoading: false, response: undefined, error: undefined });
  const router = useRouter();
  const now = dayjs().add(20, 'day').toDate().toLocaleDateString();

  const { isLoading, response, error } = state;
  return (
    <>
      <div className="container-xl mx-auto mx-4" data-testid="external">
        <div className="flex gap-x-10 my-8">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">Bonnie</h2>
            <Badge color="success">Cliente Activo</Badge>
            <p className="flex items-center">Plan de entrenamiento hasta: {now}</p>
          </div>
        </div>
        <Card href="#" className="flex">
          <h1 className="text-2xl font-bold mb-4 uppercase" data-testid="external-title">
            Ver
          </h1>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
          </p>
        </Card>
      </div>
    </>
  );
}
