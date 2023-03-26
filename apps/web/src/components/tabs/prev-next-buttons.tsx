import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { useTabs } from "src/components/tabs";

export const TabsPrevNextButtons: React.FC = () => {
  const { tabs, tabIndex, setTabIndex } = useTabs();

  const goToPrev = () => {
    setTabIndex(tabIndex - 1);
  };

  const goToNext = () => {
    setTabIndex(tabIndex + 1);
  };

  const hasPrev = tabIndex > 0;
  const hasNext = tabIndex < tabs.length - 1;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {hasPrev && (
        <Button variant="outlined" onClick={goToPrev}>
          <ChevronLeftIcon />
          Previous
        </Button>
      )}

      <Box sx={{ flexGrow: 1 }} />

      {hasNext && (
        <Button variant="contained" onClick={goToNext}>
          Next
          <ChevronRightIcon />
        </Button>
      )}
    </Box>
  );
};
