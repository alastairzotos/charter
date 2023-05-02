import "styles/globals.css";
import * as Sentry from "@sentry/react";
import type { AppProps } from "next/app";
import * as React from "react";
import CookieConsent from "react-cookie-consent";
import { PageWrapper } from "ui";

import { BaseLayout } from "components/_core/base-layout";
import { AdminLayout } from "components/admin/_core/admin-layout";
import { OperatorsLayout } from "components/operator/_core/operators-layout";
import { SuperAdminLayout } from "components/super-admin/_core/super-admin-layout";
import { useUserState } from "state/users";

Sentry.init({
  dsn: "https://e15694bdecb94fa2976c406a44d57dc0@o1111034.ingest.sentry.io/4505113375670272",
  integrations: [new Sentry.Replay()],
  // Performance Monitoring
  // tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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
