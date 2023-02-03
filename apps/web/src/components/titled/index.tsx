import CloseIcon from "@mui/icons-material/Close";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  title: string;
  avatar?: string;
  onClose?: () => void;
}

export const Titled: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  avatar,
  onClose,
  children,
}) => {
  if (onClose) {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", verticalAlign: "middle", gap: 1 }}>
            {!!avatar && <Avatar src={avatar} />}
            <Typography variant="h6">{title}</Typography>
          </Box>

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
      <Box sx={{ display: "flex", verticalAlign: "middle", gap: 1 }}>
        {!!avatar && <Avatar src={avatar} />}
        <Typography variant="h6">{title}</Typography>
      </Box>

      <Box sx={{ mt: 1 }}>{children}</Box>
    </>
  );
};
