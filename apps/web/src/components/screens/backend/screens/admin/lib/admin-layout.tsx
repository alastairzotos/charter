import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AdminAppBar } from "components/screens/backend/screens/admin/lib/admin-app-bar";
import { AdminFooter } from "components/screens/backend/lib/admin-footer";
import { DefaultErrorFallback } from "components/lib/default-error-fallback";
import { ResponsiveLayout } from "components/screens/backend/lib/responsive-layout";
import { RoleRoute } from "components/screens/backend/lib/role-route";
import { SeoHead } from "components/screens/site/lib/seo-head";
import { VerticalLayout } from "components/screens/backend/lib/vertical-layout";

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
