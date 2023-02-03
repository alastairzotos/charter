import { ServiceDto, ServiceNoId } from "dtos";

import { ServicesService } from "src/services/services.service";
import { createSlice } from "src/state/resource-slice";

const svc = new ServicesService();

export const useLoadServices = createSlice<ServiceDto[], [string]>(
  [],
  async (operatorId) => await svc.getServicesForOperator(operatorId)
);

export const useLoadService = createSlice<ServiceDto, [string]>(
  null,
  async (id) => await svc.getService(id)
);

export const useUpdateService = createSlice<
  void,
  [string, Partial<ServiceNoId>]
>(null, async (id, newService) => await svc.updateService(id, newService));

export const useDeleteService = createSlice<void, [string]>(
  null,
  async (id) => await svc.deleteService(id)
);

export const useCreateService = createSlice<string, [ServiceNoId]>(
  null,
  async (service) => await svc.createService(service)
);
