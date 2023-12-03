import { Container, Typography } from "@mui/material";
import { NextPage } from "next";

import { SeoHead } from "components/_core/seo-head";
import { LoginForm } from "components/login";

const ResetLoginPage: NextPage = () => {
  return (
    <>
      <SeoHead subtitle="Login" description="Log in to your account" />
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          Login
        </Typography>
        <LoginForm includeSocials={false} />
      </Container>
    </>
  );
};

ResetLoginPage.getInitialProps = () => ({});

export default ResetLoginPage;
