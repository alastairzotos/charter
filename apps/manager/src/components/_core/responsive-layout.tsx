import { Box } from "@mui/system";
import React from "react";
import { useIsDesktop } from "ui";

import { Surface } from "components/_core/surface";

export const ResponsiveLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const isDesktop = useIsDesktop();

  return (
    <div>
      {isDesktop && (
        <Surface sx={{ p: 3, ml: 3, mr: 3, mt: 1, mb: 3 }}>{children}</Surface>
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
