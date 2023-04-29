import * as React from "react";
import { AppBarBase } from "ui";
import { urls } from "urls";

import { AppBarLoginLogout } from "components/_core/app-bar/app-bar-login-logout";
import { CharterLogo } from "components/_core/charter-logo";
import { SuperAdminInstanceSelector } from "components/super-admin/_core/super-admin-instance-selector";

export const SuperAdminAppBar: React.FC = () => (
  <AppBarBase
    sx={{ backgroundColor: "#bbb", color: "#fff" }}
    logo={<CharterLogo url={urls.superAdmin.home()} />}
    rightButton={
      <>
        <SuperAdminInstanceSelector />
        <AppBarLoginLogout />
      </>
    }
  />
);
