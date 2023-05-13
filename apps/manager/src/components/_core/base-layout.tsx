import { Box, Toolbar, Typography } from "@mui/material";
import { UserRole } from "dtos";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DefaultErrorFallback, StatusSwitch } from "ui";
import { urls } from "urls";

import { AdminFooter } from "components/_core/admin-footer";
import { BaseAppBar } from "components/_core/app-bar/base-app-bar";
import { AutoBreadcrumbs } from "components/_core/auto-breadcrumbs";
import { AppDrawer, DRAWER_WIDTH } from "components/_core/drawer";
import { ResponsiveLayout } from "components/_core/responsive-layout";
import { RoleRoute } from "components/_core/role-route";
import { SeoHead } from "components/_core/seo-head";
import { VerticalLayout } from "components/_core/vertical-layout";
import { AdminAppBar } from "components/admin/_core/admin-app-bar";
import { OperatorsAppBar } from "components/operator/_core/operators-app-bar";
import { SuperAdminAppBar } from "components/super-admin/_core/super-admin-app-bar";
import { ConfigurationProvider } from "contexts/configuration";
import { useGetConfiguration } from "state/configuration";

interface Props {
  role?: UserRole;
}

const appBarForRole: Record<UserRole, React.ReactNode> = {
  user: <BaseAppBar />,
  admin: <AdminAppBar />,
  operator: <OperatorsAppBar />,
  "super-admin": <SuperAdminAppBar />,
};

export const BaseLayout: React.FC<React.PropsWithChildren<Props>> = ({
  role = "user",
  children,
}) => {
  const router = useRouter();

  const hideDrawerUrls = [
    urls.home(),
    urls.login(),
    urls.register(),
    urls.account(),
  ];
  const showDrawer = !hideDrawerUrls.includes(router.pathname);

  const [getConfigurationStatus, getConfiguration, configuration] =
    useGetConfiguration((s) => [s.status, s.request, s.value]);

  useEffect(() => {
    getConfiguration();
  }, []);

  return (
    <RoleRoute role={role}>
      <SeoHead subtitle="Charter manager" description="Charter manager" />

      <Box sx={{ display: "flex" }}>
        {appBarForRole[role]}

        {showDrawer && (
          <Box
            component="nav"
            sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
          >
            <AppDrawer role={role} />
          </Box>
        )}

        <Box
          component="main"
          sx={{ flexGrow: 1, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}
        >
          <Toolbar />

          <AutoBreadcrumbs />

          <VerticalLayout>
            <ResponsiveLayout>
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
        </Box>
      </Box>
    </RoleRoute>
  );
};
