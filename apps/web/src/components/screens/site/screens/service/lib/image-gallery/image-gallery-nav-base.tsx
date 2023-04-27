import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  position: "left" | "right";
}

export const ImageGalleryNavBase: React.FC<React.PropsWithChildren<Props>> = ({
  onClick,
  disabled,
  position,
  children,
}) => (
  <Box
    sx={{
      position: "absolute",
      left: position === "left" ? 0 : undefined,
      right: position === "right" ? 0 : undefined,
      height: "100%",
      zIndex: 100,
      cursor: "pointer",
    }}
    onClick={onClick as any}
  >
    <IconButton
      disabled={disabled}
      size="large"
      sx={{ color: "white", top: "calc(50% - 20px)" }}
    >
      {children}
    </IconButton>
  </Box>
);
