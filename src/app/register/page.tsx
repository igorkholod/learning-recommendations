'use client';
import { createUser } from '@/app/register/apiService';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/store';

export default function Register() {
  const { user } = useUser();
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  if (user) {
    router.push('/');
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const result = await createUser(
          new FormData(e.target as HTMLFormElement),
        );

        if (result === 'USER_EXISTS') {
          setError('User already exists');
          return;
        }

        router.push('/');
      }}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" required={true} />
      </div>
      <br />
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" required={true} />
      </div>
      <button type="submit">Register</button>
      {!!error && (
        <>
          <br /> <span style={{ color: 'red' }}>{error}</span>
        </>
      )}
    </form>
  );
}
