import { Button } from "@mui/material";
import React from "react";

export const LoginButton: React.FC<React.ComponentProps<typeof Button>> = (
  props
) => (
  <Button {...props} variant="contained" color="info" sx={{ gap: 1 }}>
    {/* <i className="fa fa-facebook"></i> */}
    {props.children}
  </Button>
);
