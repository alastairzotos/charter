import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useUserState } from '../../state/user';

export const AdminRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const user = useUserState(s => s.loggedInUser);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user?.role !== 'admin') {
        router.push('/');
      }
    }
  }, [user?.role])

  return (
    <>
      {children}
    </>
  )
}
