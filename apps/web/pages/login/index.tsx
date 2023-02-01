import Container from "@mui/material/Container";
import * as React from "react";

import { LoginForm } from "src/components/login";
import { SeoHead } from "src/components/seo/head";
import { UserLayoutContainer } from "src/components/user-layout/container";

const LoginPage: React.FC = () => {
  return (
    <UserLayoutContainer>
      <SeoHead subtitle="Login" description="Log in to your account" />
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </UserLayoutContainer>
  );
};

export default LoginPage;
