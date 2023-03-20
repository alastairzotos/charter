import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AdminAppBar } from "src/components/admin-app-bar";
import { AdminFooter } from "src/components/admin-footer";
import { DefaultErrorFallback } from "src/components/default-error-fallback";
import { ResponsiveLayout } from "src/components/responsive-layout";
import { RoleRoute } from "src/components/role-route";
import { SeoHead } from "src/components/seo/head";
import { VerticalLayout } from "src/components/vertical-layout";

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
