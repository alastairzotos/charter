import * as React from "react";
import { AppBarBase, AppBarBaseProps, useIsDesktop, useIsMobile } from "ui";

export const CoreAppBar: React.FC<AppBarBaseProps> = (props) => {
  const isMobile = useIsMobile();

  return (
    <AppBarBase
      sx={{
        backgroundColor: (theme: any) =>
          isMobile
            ? "#fff"
            : theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : theme.palette.primary.main,
      }}
      {...props}
    />
  );
};
