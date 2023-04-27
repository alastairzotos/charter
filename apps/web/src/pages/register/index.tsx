import Container from "@mui/material/Container";
import * as React from "react";

import { SeoHead } from "components/screens/site/lib/seo-head";
import { UserLayoutContainer } from "components/screens/site/lib/user-layout-container";
import { RegisterForm } from "components/screens/site/screens/register";

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
