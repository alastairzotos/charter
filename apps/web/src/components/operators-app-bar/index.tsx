import * as React from "react";
import { urls } from "urls";

import { AppBarBase } from "src/components/app-bar-base";
import { CharterLogo } from "src/components/charter-logo";

export const OperatorsAppBar: React.FC = () => (
  <AppBarBase sx={{ backgroundColor: "#bbb", color: "#fff" }}>
    <CharterLogo title="Operator" url={urls.operators.home()} />
  </AppBarBase>
);
