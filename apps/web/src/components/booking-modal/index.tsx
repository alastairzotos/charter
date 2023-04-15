import { Box } from "@mui/system";
import React from "react";

import { useIsDesktop } from "src/hooks/use-is-desktop";

export const BookingModal: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const isDesktop = useIsDesktop();

  return (
    <Box
      sx={{
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        boxSizing: "border-box",
        height: isDesktop ? "auto" : "100vh",
        width: isDesktop ? "85%" : "100vw",
        maxWidth: isDesktop ? 600 : undefined,
        overflow: "scroll",
      }}
    >
      {children}
    </Box>
  );
};
