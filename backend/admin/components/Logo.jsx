import React from 'react';
import Image from 'next/image'
import VimotusLogo from '../public/vimotus.png'

const Logo = ({ width, height }) => (
  <Image src={VimotusLogo} alt="Vimotus" width={width} height={height}  />
);

export default Logo;
