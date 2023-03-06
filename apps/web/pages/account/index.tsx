import { Typography } from "@mui/material";
import { NextPage } from "next";

import { DeleteAccountButton } from "src/components/delete-account-button";
import { UserLayoutContainer } from "src/components/user-layout/container";

const AccountPage: NextPage = () => {
  return (
    <UserLayoutContainer>
      <Typography variant="h3">Account</Typography>

      <DeleteAccountButton />
    </UserLayoutContainer>
  );
};

export default AccountPage;
