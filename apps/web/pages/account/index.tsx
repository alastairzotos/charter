import { Typography } from "@mui/material";
import { NextPage } from "next";

import { AccountDetails } from "src/components/account-details";
import { UserLayoutContainer } from "src/components/user-layout/container";

const AccountPage: NextPage = () => {
  return (
    <UserLayoutContainer>
      <Typography variant="h3">Account</Typography>

      <AccountDetails />
    </UserLayoutContainer>
  );
};

AccountPage.getInitialProps = () => ({});

export default AccountPage;
