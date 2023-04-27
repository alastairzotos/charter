import * as React from "react";
import { AppBarBase } from "ui";
import { urls } from "urls";

import { AppBarLoginLogout } from "components/lib/backend/_core/app-bar/app-bar-login-logout";
import { CharterLogo } from "components/lib/backend/_core/charter-logo";

export const OperatorsAppBar: React.FC = () => (
  <AppBarBase
    sx={{ backgroundColor: "#bbb", color: "#fff" }}
    logo={<CharterLogo title="Operator" url={urls.operators.home()} />}
    rightButton={<AppBarLoginLogout />}
  />
);
