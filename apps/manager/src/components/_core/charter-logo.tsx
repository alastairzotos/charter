import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  url: string;
}

export const CharterLogo: React.FC<Props> = ({ url }) => {
  return (
    <>
      <Link href={url} style={{ textDecoration: "none", color: "white" }}>
        <Image
          src="/bm-logo-black.svg"
          alt="BitMetro logo"
          width={40}
          height={40}
          style={{
            marginRight: 10,
            marginBottom: 6,
            filter: "opacity(50%)",
          }}
        />
      </Link>
      <Link href={url} style={{ textDecoration: "none", color: "white" }}>
        <Typography>Charter</Typography>
      </Link>

      <Box sx={{ pr: 3 }} />
    </>
  );
};
