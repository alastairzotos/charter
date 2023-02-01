import { IconButton } from "@mui/material";
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
  <IconButton
    onClick={onClick}
    disabled={disabled}
    size="large"
    sx={{
      position: "absolute",
      left: position === "left" ? 0 : undefined,
      right: position === "right" ? 0 : undefined,
      top: "50%",
      zIndex: 100,
      color: "white",
      transform: "translateY(-50%)",
    }}
  >
    {children}
  </IconButton>
);
