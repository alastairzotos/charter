import "styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import CookieConsent from "react-cookie-consent";

import { PageWrapper } from "components/lib/_core/page-wrapper";
import { AdminLayout } from "components/lib/backend/admin/_core/admin-layout";
import { OperatorsLayout } from "components/lib/backend/operator/_core/operators-layout";
import { UserLayout } from "components/lib/site/_core/user-layout";
import { useUserState } from "state/users";

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
