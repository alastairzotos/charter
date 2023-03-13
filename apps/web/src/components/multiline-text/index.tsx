import { SxProps, Typography } from "@mui/material";
import React from "react";

interface Props {
  sx?: SxProps;
  content?: string;
}

export const MultilineText: React.FC<Props> = ({ sx, content }) => {
  const lines = (content || '').split("\n");

  return (
    <>
      {lines.map((line, index) => (
        <Typography key={index} sx={{ mt: 2, mb: 2, ...sx }}>
          {line}
        </Typography>
      ))}
    </>
  );
};
