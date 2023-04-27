import * as React from "react";
import { urls } from "urls";

import { CharterLogo } from "components/lib/backend/_core/charter-logo";
import { AppBarBase } from "ui";
import { AppBarLoginLogout } from "components/lib/backend/_core/app-bar/app-bar-login-logout";

export const OperatorsAppBar: React.FC = () => (
  <AppBarBase
    sx={{ backgroundColor: "#bbb", color: "#fff" }}
    logo={<CharterLogo title="Operator" url={urls.operators.home()} />}
    rightButton={<AppBarLoginLogout />}
  />
);
