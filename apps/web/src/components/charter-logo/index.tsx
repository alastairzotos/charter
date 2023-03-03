import Link from 'next/link';
import React from 'react';
import ExploreIcon from "@mui/icons-material/Explore";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  title: string;
  url: string;
}

export const CharterLogo: React.FC<Props> = ({ title, url }) => {
  return (
    <>
      <Link
        href={url}
        style={{ textDecoration: "none", color: "white" }}
      >
        <ExploreIcon fontSize="large" sx={{ mr: 1 }} />
      </Link>
      <Link
        href={url}
        style={{ textDecoration: "none", color: "white" }}
      >
        <Typography>{title}</Typography>
      </Link>

      <Box sx={{ pr: 3 }} />
    </>
  );
}
