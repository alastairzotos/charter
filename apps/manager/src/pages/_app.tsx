import "styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import CookieConsent from "react-cookie-consent";
import { PageWrapper } from "ui";

import { BaseLayout } from "components/_core/base-layout";
import { AdminLayout } from "components/admin/_core/admin-layout";
import { OperatorsLayout } from "components/operator/_core/operators-layout";
import { SuperAdminLayout } from "components/super-admin/_core/super-admin-layout";
import { useUserState } from "state/users";

function Inner({ Component, pageProps }: AppProps) {
  const [initLocalStorage, initialised, user] = useUserState((s) => [
    s.initLocalStorage,
    s.initialised,
    s.loggedInUser,
  ]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      initLocalStorage();
    }
  }, [initialised]);

  if (!user || user.role === "user") {
    return (
      <BaseLayout noPaper>
        <Component {...pageProps} />
      </BaseLayout>
    );
  }

  if (user.role === "admin") {
    return (
      <AdminLayout>{initialised && <Component {...pageProps} />}</AdminLayout>
    );
  }

  if (user.role === "operator") {
    return (
      <OperatorsLayout>
        {initialised && <Component {...pageProps} />}
      </OperatorsLayout>
    );
  }

  if (user.role === "super-admin") {
    return (
      <SuperAdminLayout>
        {initialised && <Component {...pageProps} />}
      </SuperAdminLayout>
    );
  }

  return null;
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
