import './globals.css';
import type { Metadata } from 'next';
import React, { ReactNode } from 'react';
import ZustandHydration from '@/app/ZustandHydration';
import Link from 'next/link';
import NavBar from '@/app/NavBar';

export const metadata: Metadata = {
  title: 'Smart quiz',
  description: 'Smart quiz with recommendations',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ZustandHydration>
          <NavBar />
          <main>{children}</main>
        </ZustandHydration>
      </body>
    </html>
  );
}
