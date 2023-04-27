import { Typography } from "@mui/material";
import React from "react";

import { KeyValues } from "components/lib/key-values";
import { useUserState } from "state/users";
import { SETTINGS_WIDTH } from "util/misc";
import { DeleteAccountButton } from "components/screens/site/screens/account-details/lib/delete-account-button";

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
    </>
  );
};
