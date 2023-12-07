import { httpClient } from "clients/http.client";
import { AskAiDto, ServiceDto } from "dtos";

export const searchWithAi = async (query: string) => {
  const { data } = await httpClient.get<ServiceDto[]>(
    `/ai/search?query=${query}`
  );

  return data;
};

export const askWithAi = async (query: string) => {
  const { data } = await httpClient.get<AskAiDto>(`/ai/ask?query=${query}`);

  return data;
};
