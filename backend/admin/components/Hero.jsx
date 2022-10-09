import React from 'react';

import Logo from './Logo';

const Hero = () => (
  <div className="text-3xl flex flex-col items-center text-center my-16" data-testid="hero">
    <Logo testId="hero-logo" />
    <p className="lead" data-testid="hero-lead">
      Bienvenido al sitio de administración de Vimotus Routines
     
    </p>
  </div>
);

export default Hero;
