import { Button } from "@mui/material";
import React from "react";

import styles from "src/components/google-login-button/google-login-button.module.css";

export const GoogleLoginButton: React.FC<
  React.ComponentProps<typeof Button>
> = (props) => (
  <Button {...props} size="large" className={styles.button}>
    <i className="fa fa-google"></i>
    <span className={styles.span}>Login with Google</span>
  </Button>
);
