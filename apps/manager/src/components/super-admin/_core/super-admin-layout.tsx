import * as React from "react";

import { AutoBreadcrumbs } from "components/_core/auto-breadcrumbs";
import { BaseLayout } from "components/_core/base-layout";
import { SuperAdminAppBar } from "components/super-admin/_core/super-admin-app-bar";

export const SuperAdminLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <BaseLayout role="super-admin" appBar={<SuperAdminAppBar />}>
    <AutoBreadcrumbs />
    {children}
  </BaseLayout>
);
