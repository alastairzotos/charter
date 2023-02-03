import { ServiceDto, ServiceNoId } from "dtos";
import create from "zustand";

import { FetchStatus } from "src/models";
import { ServicesService } from "src/services/services.service";

export interface ServicesStateValues {
  currentOperatorId?: string;

  loadServicesStatus?: FetchStatus;
  services: ServiceDto[];

  loadServiceStatus?: FetchStatus;
  service?: ServiceDto;

  updateServiceStatus?: FetchStatus;
  createServiceStatus?: FetchStatus;
  deleteServiceStatus?: FetchStatus;
}

export interface ServicesStateActions {
  loadServicesForOperator: (operatorId: string) => Promise<void>;
  loadService: (id: string) => Promise<void>;
  updateService: (
    id: string,
    newService: Partial<ServiceNoId>
  ) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  createService: (service: ServiceNoId) => Promise<void>;
}

export type ServicesState = ServicesStateValues & ServicesStateActions;

export const createServicesState = (
  initialValues: ServicesStateValues,
  servicesService: Pick<ServicesService, keyof ServicesService>
) =>
  create<ServicesState>((set, self) => ({
    ...initialValues,

    loadServicesForOperator: async (operatorId) => {
      set({ currentOperatorId: operatorId });

      try {
        set({ loadServicesStatus: "fetching" });

        const services = await servicesService.getServicesForOperator(
          operatorId
        );

        set({ loadServicesStatus: "success", services });
      } catch {
        set({ loadServicesStatus: "error" });
      }
    },

    loadService: async (id) => {
      try {
        set({ loadServiceStatus: "fetching" });

        const service = await servicesService.getService(id);

        set({ loadServiceStatus: "success", service });
      } catch {
        set({ loadServiceStatus: "error" });
      }
    },

    updateService: async (id, newService) => {
      try {
        set({ updateServiceStatus: "fetching" });

        await servicesService.updateService(id, newService);

        set({ updateServiceStatus: "success" });

        self().loadServicesForOperator(self().currentOperatorId!);
      } catch {
        set({ updateServiceStatus: "error" });
      }
    },

    deleteService: async (id) => {
      try {
        set({ deleteServiceStatus: "fetching" });

        await servicesService.deleteService(id);

        set({ deleteServiceStatus: "success" });

        self().loadServicesForOperator(self().currentOperatorId!);
      } catch {
        set({ deleteServiceStatus: "error" });
      }
    },

    createService: async (service) => {
      try {
        set({ createServiceStatus: "fetching" });

        await servicesService.createService(service);

        set({ createServiceStatus: "success" });
        self().loadServicesForOperator(self().currentOperatorId!);
      } catch {
        set({ createServiceStatus: "error" });
      }
    },
  }));

export const useServicesState = createServicesState(
  {
    services: [],
  },
  new ServicesService()
);
