import React from 'react';
import Image from 'next/image';
import VimotusLogo from '../public/vmlogo.png';

const LogoShort = ({ width, height }) => <Image src={VimotusLogo} alt="Vimotus" width={width} height={height} />;

export default LogoShort;
