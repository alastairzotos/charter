import Container from "@mui/material/Container";
import * as React from "react";

import { SeoHead } from "components/lib/backend/_core/seo-head";
import { RegisterForm } from "components/screens/register";

const RegisterPage: React.FC = () => {
  return (
    <>
      <SeoHead subtitle="Register" description="Register your account" />
      <Container maxWidth="sm">
        <RegisterForm />
      </Container>
    </>
  );
};

export default RegisterPage;
