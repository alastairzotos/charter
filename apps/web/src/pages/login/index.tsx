import Container from "@mui/material/Container";
import { NextPage } from "next";
import * as React from "react";

import { SeoHead } from "components/lib/site/_core/seo-head";
import { UserLayoutContainer } from "components/lib/site/_core/user-layout-container";
import { LoginForm } from "components/screens/site/login/login";

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
