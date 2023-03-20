import { Tab, Tabs as MuiTabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

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

interface TabData {
  label: string;
  content: React.ReactNode;
}

interface Props {
  tabs: TabData[];
}

export const Tabs: React.FC<Props> = ({ tabs }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs value={tabIndex} onChange={handleChange}>
          {tabs.map((tab) => (
            <Tab label={tab.label} />
          ))}
        </MuiTabs>
      </Box>

      {tabs.map((tab, index) => (
        <TabPanel hidden={index !== tabIndex}>{tab.content}</TabPanel>
      ))}
    </Box>
  );
};
