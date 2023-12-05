'use client';

import { create } from 'zustand';
import { User, UserWithLevel } from '@/lib/types';
import { persist } from 'zustand/middleware';
import { useState } from 'react';

type UserStore = {
  user: UserWithLevel | null;
  setUser: (user: UserWithLevel | User | null) => void;
};

const isUserWithLevel = (user: User | UserWithLevel): user is UserWithLevel => {
  return (user as UserWithLevel).level !== undefined;
};

export const useUser = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user) =>
        set((state) => {
          if (user === null || isUserWithLevel(user)) {
            return {
              ...state,
              user,
            };
          }

          return {
            ...state,
            user: {
              ...user,
              level: Math.floor(user.experience / 1000),
            },
          };
        }),
    }),
    {
      name: 'zustand-user',
      skipHydration: true,
    },
  ),
);
