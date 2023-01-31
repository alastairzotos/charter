import { Box, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";

import { Footer } from "src/components/footer";

const theme = createTheme({});

export const PageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <div>{children}</div>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};
