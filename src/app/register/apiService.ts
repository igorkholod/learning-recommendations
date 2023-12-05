import { getUser } from '@/app/login/apiService';

export async function createUser(formData: FormData) {
  const user = await getUser(formData);
  if (user) {
    return 'USER_EXISTS';
  }
  const name = formData.get('name');
  const password = formData.get('password');

  await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ name, password }),
  });

  return 'SUCCESS';
}
