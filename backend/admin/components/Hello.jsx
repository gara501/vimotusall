import React from 'react';

const Hello = () => (
  <div className="flex flex-col p-8 bg-theme-blue-light w-full" data-testid="hello">
    <h1 className="text-4xl mb-2 font-bold">Hola!, Usuario</h1>
    <p className="text-md" data-testid="hello-text">
      Esta es la información disponible
    </p>
  </div>
);

export default Hello;
