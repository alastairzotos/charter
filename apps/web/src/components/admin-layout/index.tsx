import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";

import { AdminAppBar } from "src/components/admin-app-bar";
import { SeoHead } from "src/components/seo/head";

export const AdminLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <SeoHead subtitle="Admin" description="Manage operators and bookings" />
      <AdminAppBar />
      <Container maxWidth="xl">
        <Paper sx={{ p: 3, mt: 3 }}>{children}</Paper>
      </Container>
    </>
  );
};
