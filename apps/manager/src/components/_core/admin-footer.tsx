import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

export const AdminFooter: React.FC = () => {
  return (
    <Box sx={{ bgcolor: grey[300], p: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Image
          src="/bm-logo.png"
          alt={`BitMetro logo`}
          width={64}
          height={64}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Typography variant="subtitle2" color="GrayText">
          &copy; BitMetro {new Date().getFullYear()}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Link
          href={urls.manager.terms()}
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
          href={urls.manager.privacy()}
          style={{ all: "unset", textDecoration: "none", cursor: "pointer" }}
        >
          <Typography variant="subtitle2" color="GrayText">
            Privacy Policy
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};
