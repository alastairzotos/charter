import { Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

export const ResponsiveLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div>
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
    </div>
  );
};
