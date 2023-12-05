import { useUser } from '@/store';
import { useRouter } from 'next/navigation';

export function useGuardedRoute() {
  const { user } = useUser();

  const router = useRouter();

  if (!user) {
    router.push('/');
  }
}
