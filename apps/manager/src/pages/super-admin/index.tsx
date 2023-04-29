import { Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Link from "next/link";
import * as React from "react";
import { urls } from "urls";

const SuperAdminPage: NextPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Button component={Link} href={urls.superAdmin.instances()}>
          Instances
        </Button>

        <Divider variant="middle" sx={{ mt: 2, mb: 2, width: "100%" }} />

        <Button component={Link} href={urls.admin.operators()}>
          Operators
        </Button>
        <Button component={Link} href={urls.admin.bookings()}>
          Bookings
        </Button>

        <Button component={Link} href={urls.admin.serviceSchemas()}>
          Service schemas
        </Button>
        <Button component={Link} href={urls.admin.serviceSchemaCategories()}>
          Service schema categories
        </Button>
      </Box>
    </>
  );
};

SuperAdminPage.getInitialProps = () => ({});

export default SuperAdminPage;
