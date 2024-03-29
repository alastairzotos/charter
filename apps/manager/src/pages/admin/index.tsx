import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Link from "next/link";
import * as React from "react";
import { urls } from "urls";

const AdminPage: NextPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Button component={Link} href={urls.admin.operators()}>
          Operators
        </Button>
        <Button component={Link} href={urls.admin.bookings()}>
          Bookings
        </Button>
        <Button component={Link} href={urls.admin.serviceTypes()}>
          Service types
        </Button>
      </Box>
    </>
  );
};

AdminPage.getInitialProps = () => ({});

export default AdminPage;
