'use client';
import * as React from 'react';
import Link from 'next/link';
import { useUser } from '@/store';

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { user, setUser } = useUser();

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/">Go home</Link>
        <div>
          {user && (
            <span>
              Logged in as {user.name} ({user.level}lvl). {user.currency}{' '}
              currency{' '}
            </span>
          )}
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
