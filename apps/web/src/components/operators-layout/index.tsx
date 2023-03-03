import { Box, Container, Paper } from "@mui/material";
import * as React from "react";

import { AdminFooter } from "src/components/admin-footer";
import { OperatorsAppBar } from "src/components/operators-app-bar";
import { RoleRoute } from "src/components/role-route";
import { SeoHead } from "src/components/seo/head";

export const OperatorsLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <RoleRoute role="operator">
      <SeoHead subtitle="Operator Admin" description="Manage your bookings" />
      <OperatorsAppBar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Container maxWidth="xl">
            <Paper sx={{ p: 4, mt: 2 }}>{children}</Paper>
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

        <Box sx={{ p: 3 }} />
        <AdminFooter />
      </Box>
    </RoleRoute>
  );
};
