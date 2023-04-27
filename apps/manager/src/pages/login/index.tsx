import Container from "@mui/material/Container";
import { NextPage } from "next";
import * as React from "react";

import { SeoHead } from "components/lib/backend/_core/seo-head";
import { LoginForm } from "components/screens/login";

const LoginPage: NextPage = () => {
  return (
    <>
      <SeoHead subtitle="Login" description="Log in to your account" />
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </>
  );
};

LoginPage.getInitialProps = () => ({});

export default LoginPage;
