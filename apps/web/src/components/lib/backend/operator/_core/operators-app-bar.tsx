import * as React from "react";
import { urls } from "urls";

import { AppBarBase } from "components/lib/_core/app-bar/app-bar-base";
import { CharterLogo } from "components/lib/backend/_core/charter-logo";

export const OperatorsAppBar: React.FC = () => (
  <AppBarBase
    sx={{ backgroundColor: "#bbb", color: "#fff" }}
    logo={<CharterLogo title="Operator" url={urls.operators.home()} />}
  />
);
