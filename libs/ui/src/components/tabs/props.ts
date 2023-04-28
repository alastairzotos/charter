import React from "react";

export interface TabData {
  label: string;
  content: React.ReactNode;
}

export interface Props {
  tabs: TabData[];
  tabIndex: number;
  setTabIndex: (index: number) => void;
}
