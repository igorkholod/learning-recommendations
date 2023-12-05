export async function getUser(formData: FormData) {
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;

  if (!name || !password) {
    return null;
  }

  const params = new URLSearchParams({ name, password });

  const response = await fetch(`/api/users?${params}`);
  if (response.status === 404) {
    return null;
  }
  return await response.json();
}
