import { OperatorDto, ServiceDto, ServiceNoId } from "dtos";

import { httpClient } from "src/clients/http.client";

export const getServicesForOperator = async (
  operatorId: string
): Promise<ServiceDto[]> => {
  const { data } = await httpClient.get<ServiceDto[]>(
    `/services?operatorId=${operatorId}`
  );

  return data;
};

export const getService = async (id: string): Promise<ServiceDto> => {
  const { data } = await httpClient.get<ServiceDto>(`/services/${id}`);

  return data;
};

export const getServiceByIdWithOperator = async (
  id: string
): Promise<{ service: ServiceDto; operator: OperatorDto }> => {
  const { data } = await httpClient.get<{
    service: ServiceDto;
    operator: OperatorDto;
  }>(`/services/with-operator/${id}`);

  return data;
};

export const getServicesWithOperatorsBySchemaId = async (
  schemaId: string
): Promise<ServiceDto[]> => {
  const { data } = await httpClient.get<ServiceDto[]>(
    `/services/by-schema-id/${schemaId}`
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

export const updateService = async (
  id: string,
  newService: Partial<ServiceNoId>
): Promise<void> => {
  await httpClient.patch<
    any,
    unknown,
    { id: string; newService: Partial<ServiceNoId> }
  >("/services", { id, newService });
};

export const deleteService = async (id: string): Promise<void> => {
  await httpClient.delete<any, unknown, { id: string }>("/services", {
    data: { id },
  });
};

export const createService = async (service: ServiceNoId): Promise<string> => {
  const { data } = await httpClient.post<any, { data: string }, ServiceNoId>(
    "/services",
    service
  );

  return data;
};
