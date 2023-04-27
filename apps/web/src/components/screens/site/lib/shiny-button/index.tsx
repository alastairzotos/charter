import { ButtonProps } from "@mui/material";
import React from "react";

import styles from "components/screens/site/lib/shiny-button/glow-on-hover.module.css";

export const ShinyButton = (props: ButtonProps<"button">) => {
  return <button {...props} className={styles.glowOnHover} />;
};
