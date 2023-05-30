import "styles/globals.css";
import * as Sentry from "@sentry/react";
import type { AppProps } from "next/app";
import * as React from "react";
import CookieConsent from "react-cookie-consent";

import { PageWrapper } from "components/_core/page-wrapper";
import { UserLayout } from "components/_core/user-layout";
import { getEnv } from "util/env";

if (getEnv().sentryDsn) {
  Sentry.init({
    dsn: getEnv().sentryDsn,
    integrations: [new Sentry.Replay()],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

function Inner({ Component, pageProps }: AppProps) {
  return (
    <UserLayout>
      <Component {...pageProps} />
    </UserLayout>
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
