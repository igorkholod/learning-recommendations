import { User } from '@/lib/types';

export const addToUserExperience = async (
  userId: string,
  experience: number,
): Promise<User> => {
  return await (
    await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ addExperience: experience }),
    })
  ).json();
};

export const addToUserCurrency = async (
  userId: string,
  currency: number,
): Promise<User> => {
  return await (
    await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ addCurrency: currency }),
    })
  ).json();
};

export const takeFromUserCurrency = async (
  userId: string,
  currency: number,
): Promise<User> => {
  return await (
    await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ removeCurrency: currency }),
    })
  ).json();
};
