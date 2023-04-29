import { InstanceDto, InstanceNoId } from "dtos";

import { httpClient } from "clients/http.client";

export const getInstances = async () => {
  const { data } = await httpClient.get<InstanceDto[]>("/instances");

  return data;
};

export const getInstanceById = async (id: string) => {
  const { data } = await httpClient.get<InstanceDto>(`/instances/${id}`);

  return data;
};

export const createInstance = async (instance: InstanceNoId) => {
  const { data } = await httpClient.post<any, { data: string }, InstanceNoId>(
    "/instances",
    instance
  );

  return data;
};

export const updateInstance = async (
  id: string,
  newInstance: Partial<InstanceDto>
) => {
  await httpClient.patch<
    any,
    unknown,
    { id: string; newInstance: Partial<InstanceDto> }
  >("/instances", { id, newInstance });
};
