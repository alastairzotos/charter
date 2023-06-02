import * as React from "react";

export interface ColourModeState {
  colourMode: "light" | "dark";
  toggleColourMode: () => void;
}

const ColorModeContext = React.createContext<ColourModeState>({
  colourMode: "light",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColourMode: () => {},
});

export const ColorModeContextProvider = ColorModeContext.Provider;
export const useColourMode = () => React.useContext(ColorModeContext);
