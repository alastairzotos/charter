import { Box } from "@mui/system";
import React from "react";

import styles from "src/components/book-button/book-button.module.css";

interface Props {
  onClick: () => void;
}

export const BookButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <button className={styles.glowOnHover} onClick={onClick}>
        Book now
      </button>
    </Box>
  );
};
