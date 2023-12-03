import "styles/globals.css";
import { Typography } from "@mui/material";
import * as Sentry from "@sentry/react";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import { StatusSwitch } from "ui";

import { BaseLayout } from "components/_core/base-layout";
import { PageWrapper } from "components/_core/page-wrapper";
import { ConfigurationProvider } from "contexts/configuration";
import { useGetConfiguration } from "state/configuration";
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
  const [getConfigurationStatus, getConfiguration, configuration] =
    useGetConfiguration((s) => [s.status, s.request, s.value]);

  const [initLocalStorage, initialised, user, refreshToken] = useUserState(
    (s) => [s.initLocalStorage, s.initialised, s.loggedInUser, s.refreshToken]
  );

  useEffect(() => {
    getConfiguration();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initLocalStorage();
    }
  }, []);

  useEffect(() => {
    if (initialised && !!user) {
      refreshToken();
    }
  }, [initialised]);

  if (!initialised || !configuration) {
    return null;
  }

  return (
    <StatusSwitch
      status={getConfigurationStatus}
      error={
        <Typography>There was an error loading the configuration</Typography>
      }
    >
      <ConfigurationProvider value={configuration!}>
        <BaseLayout role={user?.role || "user"}>
          <Component {...pageProps} />
        </BaseLayout>
      </ConfigurationProvider>
    </StatusSwitch>
  );
}

function AppPage(props: AppProps) {
  return (
    <PageWrapper>
      <Inner {...props} />

      <CookieConsent style={{ zIndex: 999999 }}>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </PageWrapper>
  );
}

export default AppPage;
