import Container from "@mui/material/Container";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";

import { SeoHead } from "components/_core/seo-head";
import { usersService } from "clients/user.service";
import { GetResetPwdOtc } from "dtos";
import { Typography } from "@mui/material";
import { ForgotPasswordResetForm } from "components/forgot-password-reset";

interface Props {
  otc: GetResetPwdOtc;
}

const ForgotPasswordResetPage: NextPage<Props> = ({ otc }) => {
  return (
    <>
      <SeoHead
        subtitle="Reset forgotten password"
        description="Reset your forgotten password"
      />
      <Container maxWidth="sm">
        {otc === "not-found" ? (
          <Typography>This password reset link is invalid</Typography>
        ) : otc === "expired" ? (
          <Typography>This password reset link has expired</Typography>
        ) : (
          <ForgotPasswordResetForm otc={otc} />
        )}
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const otc = query?.otc as string;

  return {
    props: {
      otc: await usersService.getResetPwdOtcIdFromCode(otc),
    },
  };
};

export default ForgotPasswordResetPage;
