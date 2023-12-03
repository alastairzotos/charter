import * as React from "react";
import { urls } from "urls";

import { AppBarLoginLogout } from "components/_core/app-bar/app-bar-login-logout";
import { CoreAppBar } from "components/_core/app-bar/core-app-bar";
import { CharterLogo } from "components/_core/charter-logo";

export const BaseAppBar: React.FC = () => {
  return (
    <CoreAppBar
      logo={<CharterLogo url={urls.admin.home()} />}
      rightButton={<AppBarLoginLogout />}
    />
  );
};
