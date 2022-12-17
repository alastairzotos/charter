import '../styles/globals.css'
import * as React from 'react';
import type { AppProps } from 'next/app'
import { Layout } from '../src/components/layout';
import { useUserState } from '../src/state/user';

function AppPage({ Component, pageProps }: AppProps) {
  const initLocalStorage = useUserState(s => s.initLocalStorage);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      initLocalStorage();
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default AppPage;
