import { createQuery } from "@bitmetro/create-query";
import { createServiceSchemaCategory, deleteServiceSchemaCategory, getServiceSchemaCategories, getServiceSchemaCategoryById, updateServiceSchemaCategory } from "src/clients/service-schema-categories.client";

export const useLoadServiceSchemaCategories = createQuery(getServiceSchemaCategories);
export const useLoadServiceSchemaCategory = createQuery(getServiceSchemaCategoryById);
export const useCreateServiceSchemaCategory = createQuery(createServiceSchemaCategory);
export const useUpdateServiceSchemaCategory = createQuery(updateServiceSchemaCategory);
export const useDeleteServiceSchemaCategory = createQuery(deleteServiceSchemaCategory);
