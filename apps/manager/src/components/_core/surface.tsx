import { Paper, SxProps } from "@mui/material";
import React from "react";

interface Props {
  sx?: SxProps;
}

export const Surface: React.FC<React.PropsWithChildren<Props>> = ({
  sx,
  children,
}) => (
  <Paper variant="outlined" sx={sx}>
    {children}
  </Paper>
);
