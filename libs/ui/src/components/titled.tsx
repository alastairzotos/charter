import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  title: string;
  center?: boolean;
  avatar?: React.ReactNode;
  onClose?: () => void;
}

export const Titled: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  center,
  avatar,
  onClose,
  children,
}) => {
  if (onClose) {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              verticalAlign: "middle",
              justifyContent: center ? "center" : undefined,
              gap: 1,
            }}
          >
            {avatar}
            <Typography variant="h6">{title}</Typography>
          </Box>

          <div>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </Box>

        <Box sx={{ mt: 1 }}>{children}</Box>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          verticalAlign: "middle",
          justifyContent: center ? "center" : undefined,
          gap: 1,
        }}
      >
        {avatar}
        <Typography variant="h6">{title}</Typography>
      </Box>

      <Box sx={{ mt: 1 }}>{children}</Box>
    </>
  );
};
