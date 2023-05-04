import { ConfigurationDto, defaultConfiguration } from "dtos";
import { createContext, useContext } from "react";

export const ConfigurationContext =
  createContext<ConfigurationDto>(defaultConfiguration);
export const ConfigurationProvider = ConfigurationContext.Provider;

export const useConfiguration = () => useContext(ConfigurationContext);
