import { SxProps, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  sx?: SxProps;
  url: string;
}

const LogoImage = styled(Image)(({ theme }) => ({
  filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
}));

export const CharterLogo: React.FC<Props> = ({ sx, url }) => {
  return (
    <Link
      href={url}
      style={{ textDecoration: "none", color: "white", lineHeight: 0 }}
    >
      <LogoImage
        src="/charter-large.png"
        alt="Charter logo"
        width={120}
        height={60}
        sx={sx}
      />
    </Link>
  );
};
