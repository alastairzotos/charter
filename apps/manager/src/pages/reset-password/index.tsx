import Container from "@mui/material/Container";
import { NextPage } from "next";
import * as React from "react";

import { SeoHead } from "components/_core/seo-head";
import { ResetPasswordForm } from "components/reset-password";

const ResetPasswordPage: NextPage = () => {
  return (
    <>
      <SeoHead
        subtitle="Reset password"
        description="Reset your account password"
      />
      <Container maxWidth="sm">
        <ResetPasswordForm />
      </Container>
    </>
  );
};

ResetPasswordPage.getInitialProps = () => ({});

export default ResetPasswordPage;
