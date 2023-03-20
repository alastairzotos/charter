import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AdminFooter } from "src/components/admin-footer";
import { DefaultErrorFallback } from "src/components/default-error-fallback";
import { OperatorsAppBar } from "src/components/operators-app-bar";
import { ResponsiveLayout } from "src/components/responsive-layout";
import { RoleRoute } from "src/components/role-route";
import { SeoHead } from "src/components/seo/head";
import { VerticalLayout } from "src/components/vertical-layout";

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
