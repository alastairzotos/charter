import { Box, Paper } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";

import { AdminAppBar } from "src/components/admin-app-bar";
import { RoleRoute } from "src/components/role-route";
import { SeoHead } from "src/components/seo/head";

export const AdminLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <RoleRoute role="admin">
      <SeoHead subtitle="Admin" description="Manage operators and bookings" />
      <AdminAppBar />
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Container maxWidth="xl">
          <Paper sx={{ p: 3, mt: 3, mb: 6 }}>{children}</Paper>
        </Container>
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          height: "100%",
          backgroundColor: "white",
          p: 3,
        }}
      >
        {children}
      </Box>
    </RoleRoute>
  );
};
