import * as React from "react";
import { urls } from "urls";

import { AppBarBase } from "src/components/app-bar-base";

export const UserAppBar: React.FC = () => {
  const pages = new Map<string, string>([
    [urls.home(), "Home"],
    [urls.user.operators(), "Operators"],
    [urls.user.services(), "Services"],
  ]);

  return <AppBarBase pages={pages} />;
};
