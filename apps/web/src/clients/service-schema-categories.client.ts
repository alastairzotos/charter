import { ServiceSchemaCategoryDto } from "dtos";

import { httpClient } from "clients/http.client";

export const getServiceSchemaCategories = async (): Promise<
  ServiceSchemaCategoryDto[]
> => {
  const { data } = await httpClient.get<ServiceSchemaCategoryDto[]>(
    "/service-schema-categories"
  );

  return data;
};

export const getServiceSchemaCategoryById = async (id: string) => {
  const { data } = await httpClient.get<ServiceSchemaCategoryDto>(
    `/service-schema-categories/${id}`
  );

  return data;
};
