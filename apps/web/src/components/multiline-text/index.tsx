import { Typography } from "@mui/material";
import React from "react";

interface Props {
  content: string;
}

export const MultilineText: React.FC<Props> = ({ content }) => {
  const lines = content.split("\n");

  return (
    <>
      {lines.map((line, index) => (
        <Typography key={index} sx={{ mt: 2, mb: 2 }}>
          {line}
        </Typography>
      ))}
    </>
  );
};
