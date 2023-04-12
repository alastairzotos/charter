import { OperatorDto, OperatorNoId, ServiceDto } from "dtos";

import { httpClient } from "src/clients/http.client";

export const getOperators = async (): Promise<OperatorDto[]> => {
  const { data } = await httpClient.get<OperatorDto[]>("/operators");

  return data;
};

export const getOperator = async (id: string): Promise<OperatorDto> => {
  const { data } = await httpClient.get<OperatorDto>(`/operators/${id}`);

  return data;
};

export const getOperatorByOwner = async (): Promise<OperatorDto> => {
  const { data } = await httpClient.get<OperatorDto>(`/operators/by-owner`);

  return data;
};

export const getOperatorWithServicesById = async (
  id: string
): Promise<{ operator: OperatorDto; services: ServiceDto[] }> => {
  const { data } = await httpClient.get<{
    operator: OperatorDto;
    services: ServiceDto[];
  }>(`/operators/with-services/${id}`);

  return data;
};

export const createOperator = async (
  operator: OperatorNoId
): Promise<string> => {
  const { data } = await httpClient.post<any, { data: string }, OperatorNoId>(
    "/operators",
    operator
  );

  return data;
};

export const updateOperator = async (
  id: string,
  newOperator: Partial<OperatorDto>
): Promise<void> => {
  await httpClient.patch<
    any,
    unknown,
    { id: string; newOperator: Partial<OperatorDto> }
  >("/operators", { id, newOperator });
};

export const deleteOperator = async (id: string): Promise<void> => {
  await httpClient.delete<any, unknown, { id: string }>("/operators", {
    data: { id },
  });
};
