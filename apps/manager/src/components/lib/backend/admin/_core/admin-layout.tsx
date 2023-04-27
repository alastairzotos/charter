import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DefaultErrorFallback } from "ui";

import { AdminFooter } from "components/lib/backend/_core/admin-footer";
import { ResponsiveLayout } from "components/lib/backend/_core/responsive-layout";
import { RoleRoute } from "components/lib/backend/_core/role-route";
import { VerticalLayout } from "components/lib/backend/_core/vertical-layout";
import { AdminAppBar } from "components/lib/backend/admin/_core/admin-app-bar";
import { SeoHead } from "components/lib/backend/_core/seo-head";

export const AdminLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <RoleRoute role="admin">
      <SeoHead subtitle="Admin" description="Manage operators and bookings" />
      <AdminAppBar />
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
