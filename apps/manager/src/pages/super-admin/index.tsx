import { Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Link from "next/link";
import * as React from "react";
import { urls } from "urls";

import { useCurrentInstance } from "state/current-instance";

const SuperAdminPage: NextPage = () => {
  const { currentInstance } = useCurrentInstance();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Button component={Link} href={urls.superAdmin.configuration()}>
          Configuration
        </Button>
        <Button component={Link} href={urls.superAdmin.instances()}>
          Instances
        </Button>

        {currentInstance && (
          <>
            <Divider variant="middle" sx={{ mt: 2, mb: 2, width: "100%" }} />

            <Button component={Link} href={urls.admin.operators()}>
              Operators
            </Button>
            <Button component={Link} href={urls.admin.bookings()}>
              Bookings
            </Button>

            <Button component={Link} href={urls.admin.serviceTypes()}>
              Service types
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

SuperAdminPage.getInitialProps = () => ({});

export default SuperAdminPage;
