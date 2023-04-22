import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AdminAppBar } from "components/admin-app-bar";
import { AdminFooter } from "components/admin-footer";
import { DefaultErrorFallback } from "components/default-error-fallback";
import { ResponsiveLayout } from "components/responsive-layout";
import { RoleRoute } from "components/role-route";
import { SeoHead } from "components/seo/head";
import { VerticalLayout } from "components/vertical-layout";

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
