import { httpClient } from "clients/http.client";
import { ServiceDto } from "dtos";

export const searchWithAi = async (query: string) => {
  const { data } = await httpClient.get<ServiceDto[]>(
    `/ai/search?query=${query}`
  );

  return data;
};
