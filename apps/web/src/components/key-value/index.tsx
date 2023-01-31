import { Typography } from "@mui/material";
import React from "react";

interface Props {
  label: string;
  value: React.ReactNode;
  secondary?: boolean;
}

export const KeyValue: React.FC<Props> = ({ label, value, secondary }) => {
  return (
    <Typography color={secondary ? "text.secondary" : undefined}>
      <strong>{label}</strong>: {value}
    </Typography>
  );
};
