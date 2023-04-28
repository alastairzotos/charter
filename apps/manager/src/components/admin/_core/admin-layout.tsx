import * as React from "react";

import { AutoBreadcrumbs } from "components/_core/auto-breadcrumbs";
import { BaseLayout } from "components/_core/base-layout";
import { AdminAppBar } from "components/admin/_core/admin-app-bar";

export const AdminLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <BaseLayout role="admin" appBar={<AdminAppBar />}>
    <AutoBreadcrumbs />
    {children}
  </BaseLayout>
);
