import { Button, styled } from "@mui/material";
import React from "react";

const MainButton = styled(Button)(() => ({
  height: 40,
  fontSize: "1.1em",
  fontWeight: 500,
  textTransform: "uppercase",
  backgroundColor: "#345eeb",
  borderRadius: 0,

  "&:hover": {
    backgroundColor: "#2241a8",
  },

  "&:disabled": {
    backgroundColor: "#5e73b8",
  },

  "& i": {
    color: "white",
  },

  "& span": {
    color: "white",
    marginLeft: 8,
  },
}));

export const GoogleLoginButton: React.FC<
  React.ComponentProps<typeof Button>
> = (props) => (
  <MainButton {...props} size="large">
    <i className="fa fa-google"></i>
    <span>Login with Google</span>
  </MainButton>
);
