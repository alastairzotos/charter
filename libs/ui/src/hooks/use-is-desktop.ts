import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

export const useIsDesktop = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("md"));
};

export const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("sm"));
};
