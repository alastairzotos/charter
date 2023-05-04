import { ConfigurationDto } from "dtos";

import { httpClient } from "clients/http.client";

export const getConfiguration = async () => {
  const { data } = await httpClient.get<ConfigurationDto>("/config");

  return data;
};

export const updateConfiguration = async (
  newConfig: Partial<ConfigurationDto>
) => {
  await httpClient.post<any, unknown, Partial<ConfigurationDto>>(
    "/config",
    newConfig
  );
};
