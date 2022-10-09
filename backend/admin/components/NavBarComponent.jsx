import React, { useState } from 'react';

import { useUser } from '@auth0/nextjs-auth0';
import Logo from './Logo';
import { Navbar, Button, Dropdown } from 'flowbite-react';

import PageLink from './PageLink';
import AnchorLink from './AnchorLink';
import { userAgent } from 'next/server';

const NavBarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  console.log('USER', user);

  return (
    <Navbar fluid={true} rounded={true} className="border-b-8 border-grey-800">
      <Navbar.Brand href="https://flowbite.com/">
        <Logo width="180px" height="80px" />
      </Navbar.Brand>
      {!isLoading && !user && (
        <div className="flex md:order-2">
          <Button>
            <AnchorLink href="/api/auth/login" tabIndex={0} testId="navbar-login-desktop">
              Log in
            </AnchorLink>
          </Button>
          <Navbar.Toggle />
        </div>
      )}
      {user && (
        <div className="flex md:order-2">
          <Dropdown label="Perfil">
            <Dropdown.Header>
              <span className="block text-sm">{user.name}</span>
            </Dropdown.Header>
            <Dropdown.Item>
              {' '}
              <PageLink href="/profile" icon="user" testId="navbar-profile-desktop">
                Profile
              </PageLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <AnchorLink href="/api/auth/logout" icon="power-off" testId="navbar-logout-desktop">
                Log out
              </AnchorLink>
            </Dropdown.Item>
          </Dropdown>
        </div>
      )}
      <Navbar.Collapse>
        {user && (
          <>
            <Navbar.Link href="/clients">
              <span className="self-center whitespace-nowrap text-lg">Clientes</span>
            </Navbar.Link>
            <Navbar.Link href="/exercises">
              <span className="self-center whitespace-nowrap text-lg">Ejercicios</span>
            </Navbar.Link>
            <Navbar.Link href="/routines">
              <span className="self-center whitespace-nowrap text-lg">Rutinas</span>
            </Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBarComponent;
