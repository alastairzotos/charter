import * as React from "react";

export interface ColourModeActions {
  toggleColourMode: () => void;
}

const ColorModeContext = React.createContext<ColourModeActions>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColourMode: () => {},
});

export const ColorModeContextProvider = ColorModeContext.Provider;
export const useColourMode = () => React.useContext(ColorModeContext);
