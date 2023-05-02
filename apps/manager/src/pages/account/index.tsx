import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { KeyValues } from "ui";
import { urls } from "urls";

import { DeleteAccountButton } from "components/_core/delete-account-button";
import { useUserState } from "state/users";
import { SETTINGS_WIDTH } from "util/misc";

export const AccountDetails: React.FC = () => {
  const user = useUserState((s) => s.loggedInUser);

  if (!user) {
    return <Typography>You are not logged in</Typography>;
  }

  return (
    <>
      <KeyValues
        sx={{ width: SETTINGS_WIDTH, mb: 3, mt: 3 }}
        kv={{
          Name: user.givenName,
          Email: user.email,
          Role: user.role,
        }}
      />

      <DeleteAccountButton />

      <Box sx={{ mt: 2 }}>
        <Button component={Link} href={urls.manager.terms()}>
          Terms & Conditions
        </Button>
        <Button component={Link} href={urls.manager.privacy()}>
          Privacy policy
        </Button>
      </Box>
    </>
  );
};

export default AccountDetails;
