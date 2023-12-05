'use client';
import { getUser } from '@/app/login/apiService';
import { useUser } from '@/store';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function Login() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  if (user) {
    router.push('/');
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const user = await getUser(new FormData(e.target as HTMLFormElement));
        if (!user) {
          setError('Invalid name or password');
          return;
        }

        setUser(user);
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
      <button type="submit">Login</button>
      {!!error && (
        <>
          <br /> <span style={{ color: 'red' }}>{error}</span>
        </>
      )}
    </form>
  );
}
