import * as React from "react";

import { BaseLayout } from "components/_core/base-layout";
import { OperatorsAppBar } from "components/operator/_core/operators-app-bar";

export const OperatorsLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <BaseLayout role="user" appBar={<OperatorsAppBar />}>
    {children}
  </BaseLayout>
);
