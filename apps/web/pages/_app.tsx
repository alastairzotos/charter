import "styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import CookieConsent from "react-cookie-consent";

import { AdminLayout } from "src/components/admin-layout";
import { OperatorsLayout } from "src/components/operators-layout";
import { PageWrapper } from "src/components/page-wrapper";
import { UserLayout } from "src/components/user-layout";
import { useUserState } from "src/state/users";

function Inner({ Component, pageProps, router }: AppProps) {
  const [initLocalStorage, initialised] = useUserState((s) => [
    s.initLocalStorage,
    s.initialised,
  ]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      initLocalStorage();
    }
  }, [initialised]);

  if (router.route.startsWith("/admin")) {
    return (
      <AdminLayout>{initialised && <Component {...pageProps} />}</AdminLayout>
    );
  }

  if (router.route.startsWith("/operator-admin")) {
    return (
      <OperatorsLayout>
        {initialised && <Component {...pageProps} />}
      </OperatorsLayout>
    );
  }

  return <UserLayout>{initialised && <Component {...pageProps} />}</UserLayout>;
}

function AppPage(props: AppProps) {
  return (
    <PageWrapper>
      <Inner {...props} />

      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </PageWrapper>
  );
}

export default AppPage;
