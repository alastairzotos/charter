import "styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import CookieConsent from "react-cookie-consent";
import { PageWrapper } from "ui";

import { UserLayout } from "components/_core/user-layout";

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
