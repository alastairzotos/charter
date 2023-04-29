import { createQuery } from "@bitmetro/create-query";

import {
  createInstance,
  getInstanceById,
  getInstances,
  updateInstance,
} from "clients/instances.client";

export const useGetInstances = createQuery(getInstances);
export const useGetInstanceById = createQuery(getInstanceById);
export const useCreateInstance = createQuery(createInstance);
export const useUpdateInstance = createQuery(updateInstance);
