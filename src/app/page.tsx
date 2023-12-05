'use client';
import { useUser } from '@/store';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  const { user } = useUser();

  return (
    <>
      {!user && (
        <nav>
          <ul>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </ul>
        </nav>
      )}
      {!!user && (
        <>
          <br />
          <br />
          <Link href="/questions">View questions</Link>
          <br />
          <Link href="/materials">View materials</Link>
          <br />
          <Link href="/quiz">Try quiz</Link>
          <br />
          <Link href="/progress">See your progress</Link>
          <br />
          <Link href="/achievements">See your achievements</Link>
        </>
      )}
    </>
  );
}
