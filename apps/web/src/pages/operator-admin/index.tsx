import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Link from "next/link";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/lib/backend/_core/breadcrumbs";

const OperatorsAdminPage: NextPage = () => {
  return (
    <>
      <Breadcrumbs
        list={[{ href: urls.home(), title: "Home" }]}
        current="Operator"
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Button component={Link} href={urls.operators.dashboard()}>
          Dashboard
        </Button>
        <Button component={Link} href={urls.operators.bookings()}>
          Bookings
        </Button>
      </Box>
    </>
  );
};

OperatorsAdminPage.getInitialProps = () => ({});

export default OperatorsAdminPage;
