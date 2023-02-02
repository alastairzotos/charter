import { Box, Container, SxProps } from "@mui/system";
import React from "react";

interface Props {
  alternative?: boolean;
}

const padding: SxProps = {
  pt: {
    xs: 1,
    md: 3,
  },
  pb: {
    xs: 1,
    md: 3,
  },
  pl: {
    xs: 1,
    md: 12,
  },
  pr: {
    xs: 1,
    md: 12,
  },
};

export const UserLayoutContainer: React.FC<React.PropsWithChildren<Props>> = ({
  alternative,
  children,
}) => {
  return (
    <Box
      sx={{
        ...padding,
        bgcolor: alternative ? "Background" : undefined,
      }}
    >
      {children}
    </Box>
  );
};
