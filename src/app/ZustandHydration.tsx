'use client';
import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { useUser } from '@/store';

function ZustandHydration({ children }: PropsWithChildren): ReactNode {
  useEffect(() => {
    useUser.persist.rehydrate();
  }, []);

  return children;
}
export default ZustandHydration;
