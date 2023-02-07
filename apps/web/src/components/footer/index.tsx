import { Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";

import { APP_NAME } from "src/util/misc";

export const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: blueGrey[100], p: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Image
          src="/booking-logo.jpg"
          alt={`${APP_NAME} logo`}
          width={64}
          height={64}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Typography variant="subtitle2" color="GrayText">
          &copy; {APP_NAME} {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};
