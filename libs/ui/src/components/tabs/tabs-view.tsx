import { Tab, Tabs as MuiTabs } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SwipeableViews from "react-swipeable-views";
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

interface Props {
  swipeable?: boolean;
}

export const TabsView: React.FC<Props> = ({ swipeable = true }) => {
  const { tabs, tabIndex, setTabIndex } = useTabs();

  const handleChange = (_: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  if (tabs.length === 1) {
    return <TabPanel hidden={false}>{tabs[0].content}</TabPanel>;
  }

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

      {swipeable && (
        <SwipeableViews index={tabIndex} onChangeIndex={setTabIndex}>
          {tabs.map((tab, index) => (
            <TabPanel key={index} hidden={index !== tabIndex}>
              {tab.content}
            </TabPanel>
          ))}
        </SwipeableViews>
      )}

      {!swipeable && (
        <>
          {tabs.map((tab, index) => (
            <TabPanel key={index} hidden={index !== tabIndex}>
              {tab.content}
            </TabPanel>
          ))}
        </>
      )}
    </Box>
  );
};
