import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DefaultErrorFallback } from "ui";

import { AdminFooter } from "components/lib/backend/_core/admin-footer";
import { ResponsiveLayout } from "components/lib/backend/_core/responsive-layout";
import { RoleRoute } from "components/lib/backend/_core/role-route";
import { VerticalLayout } from "components/lib/backend/_core/vertical-layout";
import { AdminAppBar } from "components/lib/backend/admin/_core/admin-app-bar";
import { SeoHead } from "components/lib/backend/_core/seo-head";
import { UserRole } from "dtos";
import { BaseAppBar } from "components/lib/backend/_core/app-bar/base-app-bar";

interface Props {
  role?: UserRole;
  appBar?: React.ReactNode;
}

export const BaseLayout: React.FC<React.PropsWithChildren<Props>> = ({
  role = "user",
  appBar = <BaseAppBar />,
  children,
}) => {
  return (
    <RoleRoute role={role}>
      <SeoHead subtitle="Charter manager" description="Charter manager" />
      {appBar}
      <VerticalLayout>
        <ResponsiveLayout>
          <ErrorBoundary FallbackComponent={DefaultErrorFallback}>
            {children}
          </ErrorBoundary>
        </ResponsiveLayout>

        <AdminFooter />
      </VerticalLayout>
    </RoleRoute>
  );
};
