import Container from "@mui/material/Container";
import { NextPage } from "next";
import * as React from "react";

import { SeoHead } from "components/_core/seo-head";
import { ForgotPasswordForm } from "components/forgot-password";

const ForgotPasswordPage: NextPage = () => {
  return (
    <>
      <SeoHead
        subtitle="Forgopt password"
        description="Forgot your account password?"
      />
      <Container maxWidth="sm">
        <ForgotPasswordForm />
      </Container>
    </>
  );
};

ForgotPasswordPage.getInitialProps = () => ({});

export default ForgotPasswordPage;
