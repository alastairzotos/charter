import { Box } from "@mui/system";
import React from "react";

export const VerticalLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Box>
  );
};
