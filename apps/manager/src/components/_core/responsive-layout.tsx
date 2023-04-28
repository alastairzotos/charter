import { Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useIsDesktop } from "ui";

interface Props {
  noPaper?: boolean;
}

export const ResponsiveLayout: React.FC<React.PropsWithChildren<Props>> = ({
  noPaper,
  children,
}) => {
  const isDesktop = useIsDesktop();

  return (
    <div>
      {isDesktop && (
        <Container maxWidth="xl">
          {noPaper && <Box sx={{ p: 3, mt: 3, mb: 3 }}>{children}</Box>}
          {!noPaper && (
            <Paper variant="outlined" sx={{ p: 3, mt: 3, mb: 6 }}>
              {children}
            </Paper>
          )}
        </Container>
      )}
      {!isDesktop && (
        <Box
          sx={{
            height: "100%",
            backgroundColor: "white",
            p: 1,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};
