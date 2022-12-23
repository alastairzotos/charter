import '../styles/globals.css'
import * as React from 'react';
import type { AppProps } from 'next/app'
import { AdminLayout } from '../src/components/admin-layout';
import { useUserState } from '../src/state/user';
import { UserLayout } from '../src/components/user-layout';

function AppPage({ Component, pageProps, router }: AppProps) {
  const [initLocalStorage, initialised] = useUserState(s => [s.initLocalStorage, s.initialised]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      initLocalStorage();
    }
  }, [initialised]);
  
  if (router.route.startsWith('/admin')) {
    return (
      <AdminLayout>
        {initialised && <Component {...pageProps} />}
      </AdminLayout>
    )
  }

  return (
    <UserLayout>
      {initialised && <Component {...pageProps} />}
    </UserLayout>
  )
}

export default AppPage;
