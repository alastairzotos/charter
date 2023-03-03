import { ServiceSchemaCategoryDto, ServiceSchemaCategoryNoId } from "dtos";

import { httpClient } from "src/clients/http.client";

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

export const createServiceSchemaCategory = async (
  category: ServiceSchemaCategoryNoId
) => {
  const { data } = await httpClient.post<
    any,
    { data: string },
    ServiceSchemaCategoryNoId
  >(`/service-schema-categories`, category);

  return data;
};

export const updateServiceSchemaCategory = async (
  id: string,
  newSchemaServiceCategory: Partial<ServiceSchemaCategoryDto>
) => {
  await httpClient.patch<
    any,
    unknown,
    { id: string; newSchemaServiceCategory: Partial<ServiceSchemaCategoryDto> }
  >(`/service-schema-categories`, { id, newSchemaServiceCategory });
};

export const deleteServiceSchemaCategory = async (id: string) => {
  await httpClient.delete<any, unknown, { id: string }>(
    `/service-schema-categories`,
    {
      data: { id },
    }
  );
};
