import Button from "@mui/material/Button";
import Link from "next/link";
import * as React from "react";
import { urls } from "urls";

import { useUserState } from "src/state/user";

export const AppBarLoginLogout: React.FC = () => {
  const [accessToken, logout] = useUserState((s) => [s.accessToken, s.logout]);

  return (
    <>
      {!accessToken && (
        <Button component={Link} color="inherit" href={urls.login()}>
          Login
        </Button>
      )}

      {!!accessToken && (
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      )}
    </>
  );
};
