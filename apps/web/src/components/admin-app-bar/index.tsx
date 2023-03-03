import * as React from "react";
import { urls } from "urls";

import { AppBarBase } from "src/components/app-bar-base";
import { CharterLogo } from "src/components/charter-logo";

export const AdminAppBar: React.FC = () => (
  <AppBarBase
    sx={{ backgroundColor: "#bbb", color: "#fff" }}
    pages={new Map([[urls.home(), "Home"]])}
  >
    <CharterLogo title="Admin" url={urls.admin.home()} />
  </AppBarBase>
);
