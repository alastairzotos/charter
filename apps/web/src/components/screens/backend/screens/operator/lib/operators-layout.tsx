import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AdminFooter } from "components/screens/backend/lib/admin-footer";
import { DefaultErrorFallback } from "components/lib/default-error-fallback";
import { OperatorsAppBar } from "components/screens/backend/screens/operator/lib/operators-app-bar";
import { ResponsiveLayout } from "components/screens/backend/lib/responsive-layout";
import { RoleRoute } from "components/screens/backend/lib/role-route";
import { SeoHead } from "components/screens/site/lib/seo-head";
import { VerticalLayout } from "components/screens/backend/lib/vertical-layout";

export const OperatorsLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
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
