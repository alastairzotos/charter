import Container from "@mui/material/Container";
import * as React from "react";

import { RegisterForm } from "components/register";
import { SeoHead } from "components/seo/head";
import { UserLayoutContainer } from "components/user-layout/container";

const RegisterPage: React.FC = () => {
  return (
    <UserLayoutContainer>
      <SeoHead subtitle="Register" description="Register your account" />
      <Container maxWidth="sm">
        <RegisterForm />
      </Container>
    </UserLayoutContainer>
  );
};

export default RegisterPage;
