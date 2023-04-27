import * as React from "react";

import { BaseLayout } from "components/lib/backend/_core/base-layout";
import { OperatorsAppBar } from "components/lib/backend/operator/_core/operators-app-bar";

export const OperatorsLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <BaseLayout role="user" appBar={<OperatorsAppBar />}>
    {children}
  </BaseLayout>
);
