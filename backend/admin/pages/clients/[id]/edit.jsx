import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/ErrorMessage';
import Highlight from '../../../components/Highlight';

export default function Edit({ props }) {
  const [state, setState] = useState({ isLoading: false, response: undefined, error: undefined });
  const router = useRouter();
  console.log(router.query.id);

  const { isLoading, response, error } = state;
  return (
    <div className="container-xl mx-auto mx-8" data-testid="external">
      <h1 className="text-2xl font-bold mb-4 uppercase" data-testid="external-title">
        Editar
      </h1>
    </div>
  );
}
