import { Typography } from "@mui/material";
import { NextPage } from "next";

import { UserLayoutContainer } from "components/lib/site/_core/user-layout-container";
import { AccountDetails } from "components/screens/site/account/account-details";

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
