import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";

const theme = createTheme({});

export const PageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
