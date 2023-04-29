import { InstanceDto } from "dtos";
import create from "zustand";

export const INSTANCE_STORAGE_KEY = "@charter/current-instance";

interface CurrentInstanceValues {
  currentInstance: InstanceDto | null;
}

interface CurrentInstanceActions {
  init: (instances: InstanceDto[]) => void;
  setCurrentInstance: (currentInstance: InstanceDto) => void;
}

export const useCurrentInstance = create<
  CurrentInstanceValues & CurrentInstanceActions
>((set) => ({
  currentInstance: null,

  init: (instances) => {
    const id = localStorage.getItem(INSTANCE_STORAGE_KEY);
    if (id) {
      set({
        currentInstance: instances.find((instance) => instance._id === id),
      });
    }
  },
  setCurrentInstance: (currentInstance) => {
    localStorage.setItem(INSTANCE_STORAGE_KEY, currentInstance._id);
    set({ currentInstance });
  },
}));
