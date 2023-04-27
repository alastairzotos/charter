import * as React from "react";
import { urls } from "urls";

import { AppBarBase } from "ui";
import { CharterLogo } from "components/lib/backend/_core/charter-logo";
import { AppBarLoginLogout } from "components/lib/backend/_core/app-bar/app-bar-login-logout";

export const BaseAppBar: React.FC = () => (
  <AppBarBase
    sx={{ backgroundColor: "#bbb", color: "#fff" }}
    logo={<CharterLogo title="Admin" url={urls.admin.home()} />}
    rightButton={<AppBarLoginLogout />}
  />
);
