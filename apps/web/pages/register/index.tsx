import Container from "@mui/material/Container";
import * as React from "react";

import { RegisterForm } from "src/components/register";
import { SeoHead } from "src/components/seo/head";

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
