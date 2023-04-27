import { ServiceDto } from "dtos";

import { httpClient } from "clients/http.client";

export const getServiceBySlug = async (slug: string): Promise<ServiceDto> => {
  const { data } = await httpClient.get<ServiceDto>(
    `/services/by-slug/${slug}`
  );

  return data;
};

export const getServicesWithOperatorsBySchemaCategoryId = async (
  categoryId: string
): Promise<ServiceDto[]> => {
  const { data } = await httpClient.get<ServiceDto[]>(
    `/services/by-schema-category-id/${categoryId}`
  );

  return data;
};

export const getPopularServices = async (): Promise<ServiceDto[]> => {
  const { data } = await httpClient.get<ServiceDto[]>("/services/popular");

  return data;
};
