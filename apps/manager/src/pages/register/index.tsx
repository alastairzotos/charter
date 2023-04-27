import Container from "@mui/material/Container";
import * as React from "react";

import { RegisterForm } from "components/screens/register";
import { SeoHead } from "components/lib/backend/_core/seo-head";

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
