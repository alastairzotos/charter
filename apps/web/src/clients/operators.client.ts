import { OperatorDto, ServiceDto } from "dtos";

import { httpClient } from "clients/http.client";

export const getOperators = async (): Promise<OperatorDto[]> => {
  const { data } = await httpClient.get<OperatorDto[]>("/operators");

  return data;
};

export const getOperatorWithServicesBySlug = async (
  slug: string
): Promise<{ operator: OperatorDto; services: ServiceDto[] }> => {
  const { data } = await httpClient.get<{
    operator: OperatorDto;
    services: ServiceDto[];
  }>(`/operators/with-services-by-slug/${slug}`);

  return data;
};
