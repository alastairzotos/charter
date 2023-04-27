import Container from "@mui/material/Container";
import { NextPage } from "next";
import * as React from "react";

import { UserLayoutContainer } from "components/screens/site/lib/user-layout-container";
import { SeoHead } from "components/screens/site/lib/seo-head";
import { LoginForm } from "components/screens/site/screens/login/screens/login";

const LoginPage: NextPage = () => {
  return (
    <UserLayoutContainer>
      <SeoHead subtitle="Login" description="Log in to your account" />
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </UserLayoutContainer>
  );
};

LoginPage.getInitialProps = () => ({});

export default LoginPage;
