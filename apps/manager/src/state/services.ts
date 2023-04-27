import { createQuery } from "@bitmetro/create-query";

import {
  createService,
  deleteService,
  getService,
  getServicesForOperatorIncludingHidden,
  updateService,
} from "clients/services.client";

export const useLoadServicesIncludingHidden = createQuery(
  getServicesForOperatorIncludingHidden
);
export const useLoadService = createQuery(getService);
export const useUpdateService = createQuery(updateService);
export const useDeleteService = createQuery(deleteService);
export const useCreateService = createQuery(createService);
