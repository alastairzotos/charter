import { ServiceSchemaDto, ServiceSchemaNoId } from "dtos";

import { httpClient } from "clients/http.client";

export const getServiceSchemas = async (): Promise<ServiceSchemaDto[]> => {
  const { data } = await httpClient.get<ServiceSchemaDto[]>("/service-schemas");

  return data;
};

export const getServiceSchemaById = async (
  id: string
): Promise<ServiceSchemaDto> => {
  const { data } = await httpClient.get<ServiceSchemaDto>(
    `/service-schemas/${id}`
  );

  return data;
};

export const createServiceSchema = async (
  serviceSchema: ServiceSchemaNoId
): Promise<string> => {
  const { data } = await httpClient.post<
    any,
    { data: string },
    ServiceSchemaNoId
  >(`/service-schemas`, serviceSchema);

  return data;
};

export const updateServiceSchema = async (
  id: string,
  newServiceSchema: Partial<ServiceSchemaDto>
) => {
  await httpClient.patch<
    any,
    unknown,
    { id: string; newServiceSchema: Partial<ServiceSchemaDto> }
  >(`/service-schemas`, { id, newServiceSchema });
};

export const deleteServiceSchema = async (id: string) => {
  await httpClient.delete<any, unknown, { id: string }>(`/service-schemas`, {
    data: { id },
  });
};
