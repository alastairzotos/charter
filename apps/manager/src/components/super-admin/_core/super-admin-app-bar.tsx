import * as React from "react";
import { urls } from "urls";

import { AppBarLoginLogout } from "components/_core/app-bar/app-bar-login-logout";
import { CoreAppBar } from "components/_core/app-bar/core-app-bar";
import { CharterLogo } from "components/_core/charter-logo";
import { DarkModeSwitch } from "components/_core/dark-mode-switch";
import { SuperAdminInstanceSelector } from "components/super-admin/_core/super-admin-instance-selector";

export const SuperAdminAppBar: React.FC = () => (
  <CoreAppBar
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
