import React, { useState } from 'react';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Highlight from '../../components/Highlight';

export default function Edit({ props }) {
  const [state, setState] = useState({ isLoading: false, response: undefined, error: undefined });
  console.log(props?.id);

  const { isLoading, response, error } = state;
  return (
    <div className="container-xl mx-auto mx-8" data-testid="external">
      <h1 className="text-2xl font-bold mb-4 uppercase" data-testid="external-title"></h1>
    </div>
  );
}
