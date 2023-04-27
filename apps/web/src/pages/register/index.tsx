import Container from "@mui/material/Container";
import * as React from "react";

import { SeoHead } from "components/lib/site/_core/seo-head";
import { UserLayoutContainer } from "components/lib/site/_core/user-layout-container";
import { RegisterForm } from "components/screens/register";

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
