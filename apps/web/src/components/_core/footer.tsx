import { Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

import { APP_NAME } from "util/misc";

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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Link
          href={urls.user.terms()}
          style={{ all: "unset", textDecoration: "none", cursor: "pointer" }}
        >
          <Typography variant="subtitle2" color="GrayText">
            Terms and Conditions
          </Typography>
        </Link>

        <Typography variant="subtitle2" color="GrayText" sx={{ ml: 2, mr: 2 }}>
          &middot;
        </Typography>

        <Link
          href={urls.user.privacy()}
          style={{ all: "unset", textDecoration: "none", cursor: "pointer" }}
        >
          <Typography variant="subtitle2" color="GrayText">
            Privacy Policy
          </Typography>
        </Link>

        <Typography variant="subtitle2" color="GrayText" sx={{ ml: 2, mr: 2 }}>
          &middot;
        </Typography>

        <Link
          href={urls.user.cancellation()}
          style={{ all: "unset", textDecoration: "none", cursor: "pointer" }}
        >
          <Typography variant="subtitle2" color="GrayText">
            Cancellation Policy
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};
