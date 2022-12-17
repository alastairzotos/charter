import '../styles/globals.css'
import * as React from 'react';
import type { AppProps } from 'next/app'
import { Layout } from '../src/components/layout';
import { useUserState } from '../src/state/user';

function AppPage({ Component, pageProps }: AppProps) {
  const [initLocalStorage, initialised] = useUserState(s => [s.initLocalStorage, s.initialised]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      initLocalStorage();
    }
  }, [initialised]);

  return (
    <Layout>
      {initialised && <Component {...pageProps} />}
    </Layout>
  )
}

export default AppPage;
