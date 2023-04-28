import { Tab, Tabs as MuiTabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useContext, useState } from "react";
import { useTabs } from "./provider";

interface TabPanelProps {
  hidden: boolean;
}

const TabPanel: React.FC<React.PropsWithChildren<TabPanelProps>> = ({
  hidden,
  children,
}) => {
  return (
    <>
      {!hidden && (
        <Box
          sx={{
            pt: 3,
            pb: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {children}
        </Box>
      )}
    </>
  );
};

export const TabsView: React.FC = () => {
  const { tabs, tabIndex, setTabIndex } = useTabs();

  const handleChange = (_: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </MuiTabs>
      </Box>

      {tabs.map((tab, index) => (
        <TabPanel key={index} hidden={index !== tabIndex}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};
