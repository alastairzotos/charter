import { createQuery } from "@bitmetro/create-query";

import {
  createServiceSchema,
  deleteServiceSchema,
  getServiceSchemaById,
  getServiceSchemas,
  getServiceSchemasByCategoryId,
  updateServiceSchema,
} from "clients/service-schemas.client";

export const useLoadServiceSchemas = createQuery(getServiceSchemas);
export const useLoadServiceSchemaById = createQuery(getServiceSchemaById);
export const useLoadServiceSchemasByCategoryId = createQuery(
  getServiceSchemasByCategoryId
);
export const useCreateServiceSchema = createQuery(createServiceSchema);
export const useUpdateServiceSchema = createQuery(updateServiceSchema);
export const useDeleteServiceSchema = createQuery(deleteServiceSchema);
