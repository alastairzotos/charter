import { Box } from "@mui/system";
import React from "react";

import { ShinyButton } from "components/lib/site/_core/shiny-button";

interface Props {
  onClick: () => void;
}

export const BookButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
      <ShinyButton onClick={onClick}>Book now</ShinyButton>
    </Box>
  );
};
