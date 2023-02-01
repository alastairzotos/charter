import Button from "@mui/material/Button";
import Link from "next/link";
import * as React from "react";
import { urls } from "urls";

import { useUserState } from "src/state/user";
import { AppBarLoggedInButton } from "src/components/app-bar-logged-in-button";

export const AppBarLoginLogout: React.FC = () => {
  const [accessToken] = useUserState((s) => [s.accessToken]);

  return (
    <>
      {!accessToken && (
        <Button component={Link} color="inherit" href={urls.login()}>
          Login
        </Button>
      )}

      {!!accessToken && (
        <AppBarLoggedInButton />
      )}
    </>
  );
};
