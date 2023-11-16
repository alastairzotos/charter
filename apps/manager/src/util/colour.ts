import { Theme, lighten, darken } from "@mui/material";

import { localStorageService } from "clients/localstorage.service";

export const offsetColour = (theme: Theme, amount = 0.1) =>
  theme.palette.mode === "dark"
    ? lighten(theme.palette.background.default, amount)
    : darken(theme.palette.background.default, amount);

const COLOUR_MODE_LS_KEY = "@charter:colour-mode";

export type ColourMode = "light" | "dark";

export const getColourMode = (): ColourMode => "light";
// localStorageService.get(COLOUR_MODE_LS_KEY, "light");

export const setColourMode = (mode: ColourMode) =>
  localStorageService.set(COLOUR_MODE_LS_KEY, mode);
