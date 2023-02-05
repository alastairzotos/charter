import { Box } from "@mui/system";
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

export const BookingModal: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <Box sx={bookingModalStyle}>{children}</Box>;
};
