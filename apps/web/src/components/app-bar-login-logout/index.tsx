import Button from "@mui/material/Button";
import Link from "next/link";
import * as React from "react";
import { urls } from "urls";

import { AppBarLoggedInButton } from "src/components/app-bar-logged-in-button";
import { useUserState } from "src/state/users";

export const AppBarLoginLogout: React.FC = () => {
  const [accessToken] = useUserState((s) => [s.accessToken]);

  return (
    <>
      {!accessToken && (
        <Button component={Link} color="inherit" href={urls.login()}>
          Login
        </Button>
      )}

      {!!accessToken && <AppBarLoggedInButton />}
    </>
  );
};
