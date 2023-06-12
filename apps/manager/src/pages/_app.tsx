import "styles/globals.css";
import * as Sentry from "@sentry/react";
import type { AppProps } from "next/app";
import * as React from "react";
import CookieConsent from "react-cookie-consent";

import { BaseLayout } from "components/_core/base-layout";
import { PageWrapper } from "components/_core/page-wrapper";
import { useUserState } from "state/users";
import { getEnv } from "util/env";

if (getEnv().sentryDsn) {
  Sentry.init({
    dsn: getEnv().sentryDsn,
    integrations: [new Sentry.Replay()],
    // Performance Monitoring
    // tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

function Inner({ Component, pageProps }: AppProps) {
  const [initLocalStorage, initialised, user, refreshToken] = useUserState(
    (s) => [s.initLocalStorage, s.initialised, s.loggedInUser, s.refreshToken]
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      initLocalStorage();
    }
  }, []);

  React.useEffect(() => {
    if (initialised && !!user) {
      refreshToken();
    }
  }, [initialised]);

  if (!initialised) {
    return null;
  }

  return (
    <BaseLayout role={user?.role || "user"}>
      <Component {...pageProps} />
    </BaseLayout>
  );
}

function AppPage(props: AppProps) {
  return (
    <PageWrapper>
      <Inner {...props} />

      <div style={{ zIndex: 99999 }}>
        <CookieConsent>
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </div>
    </PageWrapper>
  );
}

export default AppPage;
