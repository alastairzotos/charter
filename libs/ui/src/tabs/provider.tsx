import React, { createContext, useContext, useState } from "react";
import { Props, TabData } from "./props";

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
