import { Typography } from "@mui/material";
import { NextPage } from "next";

import { AccountDetails } from "components/screens/site/screens/account-details/screens/account-details";
import { UserLayoutContainer } from "components/screens/site/lib/user-layout-container";

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
