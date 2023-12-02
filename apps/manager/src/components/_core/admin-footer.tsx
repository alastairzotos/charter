import { Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

import { offsetColour } from "util/colour";

const FooterBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10),
  backgroundColor: offsetColour(theme),
}));

export const AdminFooter: React.FC = () => {
  return (
    <FooterBox>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link href="https://www.bitmetro.io" target="_blank">
          <Image
            src="/bm-logo-new-white.png"
            alt={`BitMetro logo`}
            width={64}
            height={64}
          />
        </Link>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Link
          href="https://www.bitmetro.io"
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <Typography variant="subtitle2" color="GrayText">
            &copy; bitmetro {new Date().getFullYear()}
          </Typography>
        </Link>
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
    </FooterBox>
  );
};
