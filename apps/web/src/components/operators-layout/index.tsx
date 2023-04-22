import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AdminFooter } from "components/admin-footer";
import { DefaultErrorFallback } from "components/default-error-fallback";
import { OperatorsAppBar } from "components/operators-app-bar";
import { ResponsiveLayout } from "components/responsive-layout";
import { RoleRoute } from "components/role-route";
import { SeoHead } from "components/seo/head";
import { VerticalLayout } from "components/vertical-layout";

export const OperatorsLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <RoleRoute role="operator">
      <SeoHead subtitle="Operator Admin" description="Manage your bookings" />
      <OperatorsAppBar />

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
