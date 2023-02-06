import { Box, SxProps } from "@mui/system";
import React from "react";

const bookingModalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface Props {
  sx?: SxProps;
}

export const BookingModal: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  sx,
}) => {
  return <Box sx={{ ...bookingModalStyle, ...sx }}>{children}</Box>;
};
