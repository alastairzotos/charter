import "styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import CookieConsent from "react-cookie-consent";
import { PageWrapper } from "ui";

import { BaseLayout } from "components/_core/base-layout";
import { AdminLayout } from "components/admin/_core/admin-layout";
import { OperatorsLayout } from "components/operator/_core/operators-layout";
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

  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
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
