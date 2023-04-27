import { Tab, Tabs as MuiTabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useContext, useState } from "react";

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
  tabIndex: number;
  setTabIndex: (index: number) => void;
}

export const TabsContext = createContext<Props>({
  tabs: [],
  tabIndex: 0,
  setTabIndex: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
export const useTabs = () => useContext(TabsContext);

export const TabsProvider: React.FC<
  React.PropsWithChildren<{ tabs: TabData[] }>
> = ({ tabs, children }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <TabsContext.Provider
      value={{
        tabs,
        tabIndex,
        setTabIndex,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export const TabsView: React.FC = () => {
  const { tabs, tabIndex, setTabIndex } = useTabs();

  const handleChange = (_: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs value={tabIndex} onChange={handleChange}>
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
