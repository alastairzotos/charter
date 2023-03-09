import { SearchResponseDto } from "dtos";

import { httpClient } from "src/clients/http.client";

export const searchOperatorsAndServices = async (term: string) => {
  const { data } = await httpClient.get<SearchResponseDto>(
    `/search?term=${term}`
  );

  return data;
};
