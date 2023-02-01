import { Box, Container } from "@mui/system";
import React from "react";

interface Props {
  alternative?: boolean;
}

export const UserLayoutContainer: React.FC<React.PropsWithChildren<Props>> = ({
  alternative,
  children,
}) => {
  if (alternative) {
    return (
      <Box sx={{ bgcolor: "Background" }}>
        <Container maxWidth="xl">
          <Box sx={{ p: 4 }}>{children}</Box>
        </Container>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 4 }}>{children}</Box>
    </Container>
  );
};
