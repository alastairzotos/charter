import * as React from "react";
import { AppBarBase } from "ui";
import { urls } from "urls";

import { AppBarLoginLogout } from "components/_core/app-bar/app-bar-login-logout";
import { CharterLogo } from "components/_core/charter-logo";

export const AdminAppBar: React.FC = () => (
  <AppBarBase
    logo={<CharterLogo url={urls.admin.home()} />}
    rightButton={<AppBarLoginLogout />}
  />
);
