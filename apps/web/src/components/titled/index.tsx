import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  title: string;
  onClose?: () => void;
}

export const Titled: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  onClose,
  children,
}) => {
  if (onClose) {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">{title}</Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mt: 1 }}>{children}</Box>
      </>
    );
  }

  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ mt: 1 }}>{children}</Box>
    </>
  );
};
