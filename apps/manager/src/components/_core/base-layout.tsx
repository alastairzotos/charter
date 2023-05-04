import { Typography } from "@mui/material";
import { UserRole } from "dtos";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DefaultErrorFallback, StatusSwitch } from "ui";

import { AdminFooter } from "components/_core/admin-footer";
import { BaseAppBar } from "components/_core/app-bar/base-app-bar";
import { ResponsiveLayout } from "components/_core/responsive-layout";
import { RoleRoute } from "components/_core/role-route";
import { SeoHead } from "components/_core/seo-head";
import { VerticalLayout } from "components/_core/vertical-layout";
import { ConfigurationProvider } from "contexts/configuration";
import { useGetConfiguration } from "state/configuration";

interface Props {
  role?: UserRole;
  appBar?: React.ReactNode;
  noPaper?: boolean;
}

export const BaseLayout: React.FC<React.PropsWithChildren<Props>> = ({
  role = "user",
  appBar = <BaseAppBar />,
  noPaper,
  children,
}) => {
  const router = useRouter();
  const [getConfigurationStatus, getConfiguration, configuration] =
    useGetConfiguration((s) => [s.status, s.request, s.value]);

  useEffect(() => {
    getConfiguration();
  }, []);

  return (
    <RoleRoute role={role}>
      <SeoHead subtitle="Charter manager" description="Charter manager" />
      {appBar}
      <VerticalLayout>
        <ResponsiveLayout noPaper={noPaper || router.pathname === "/"}>
          <ErrorBoundary FallbackComponent={DefaultErrorFallback}>
            <StatusSwitch
              status={getConfigurationStatus}
              error={
                <Typography>
                  There was an error loading the configuration
                </Typography>
              }
            >
              <ConfigurationProvider value={configuration!}>
                {children}
              </ConfigurationProvider>
            </StatusSwitch>
          </ErrorBoundary>
        </ResponsiveLayout>

        <AdminFooter />
      </VerticalLayout>
    </RoleRoute>
  );
};
