import * as React from "react";
import { AppBarBase } from "ui";
import { urls } from "urls";

import { AppBarLoginLogout } from "components/_core/app-bar/app-bar-login-logout";
import { CharterLogo } from "components/_core/charter-logo";
import { DarkModeSwitch } from "components/_core/dark-mode-switch";
import { SuperAdminInstanceSelector } from "components/super-admin/_core/super-admin-instance-selector";

export const SuperAdminAppBar: React.FC = () => (
  <AppBarBase
    logo={<CharterLogo url={urls.superAdmin.home()} />}
    rightButton={
      <>
        <DarkModeSwitch />
        <SuperAdminInstanceSelector />
        <AppBarLoginLogout />
      </>
    }
  />
);
