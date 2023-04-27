import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { DefaultErrorFallback } from "components/lib/_core/default-error-fallback";
import { AdminFooter } from "components/lib/backend/_core/admin-footer";
import { ResponsiveLayout } from "components/lib/backend/_core/responsive-layout";
import { RoleRoute } from "components/lib/backend/_core/role-route";
import { VerticalLayout } from "components/lib/backend/_core/vertical-layout";
import { OperatorsAppBar } from "components/lib/backend/operator/_core/operators-app-bar";
import { SeoHead } from "components/lib/site/_core/seo-head";

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
