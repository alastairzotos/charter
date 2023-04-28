import { UserRole } from "dtos";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DefaultErrorFallback } from "ui";

import { AdminFooter } from "components/_core/admin-footer";
import { BaseAppBar } from "components/_core/app-bar/base-app-bar";
import { ResponsiveLayout } from "components/_core/responsive-layout";
import { RoleRoute } from "components/_core/role-route";
import { SeoHead } from "components/_core/seo-head";
import { VerticalLayout } from "components/_core/vertical-layout";

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
  return (
    <RoleRoute role={role}>
      <SeoHead subtitle="Charter manager" description="Charter manager" />
      {appBar}
      <VerticalLayout>
        <ResponsiveLayout noPaper={noPaper}>
          <ErrorBoundary FallbackComponent={DefaultErrorFallback}>
            {children}
          </ErrorBoundary>
        </ResponsiveLayout>

        <AdminFooter />
      </VerticalLayout>
    </RoleRoute>
  );
};
