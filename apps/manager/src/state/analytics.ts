import { BookingStatus } from "dtos";
import create from "zustand";

import { localStorageService } from "clients/localstorage.service";
import { LocalStorageService } from "clients/localstorage.service";

export type AnalyticsViewMode = "Bookings" | "Revenue";

export type AnalyticsFilterType = "placed" | "completed";

export interface AnalyticsValues {
  days: number;
  mode: AnalyticsViewMode;
  filterType: AnalyticsFilterType;
  bookingStatus: BookingStatus;
}

const defaultValues: AnalyticsValues = {
  days: 7,
  mode: "Bookings",
  filterType: "placed",
  bookingStatus: "confirmed",
};

export interface AnalyticsActions {
  init: () => void;

  updateSettings: (settings: Partial<AnalyticsValues>) => void;
}

export type AnalyticsState = AnalyticsValues & AnalyticsActions;

const LOCALSTORAGE_KEY = "@charter/analytics-settings";

const createAnalyticsSettingsState = (
  localStorageService: LocalStorageService
) =>
  create<AnalyticsState>((set, self) => ({
    ...defaultValues,

    init: () => {
      const saved = localStorageService.get(LOCALSTORAGE_KEY);

      if (saved) {
        set(JSON.parse(saved));
      } else {
        localStorageService.set(
          LOCALSTORAGE_KEY,
          JSON.stringify(defaultValues)
        );
      }
    },

    updateSettings: (settings) => {
      set({ ...self(), ...settings });

      const { days, mode, filterType, bookingStatus } = self();
      localStorageService.set(
        LOCALSTORAGE_KEY,
        JSON.stringify({ days, mode, filterType, bookingStatus })
      );
    },
  }));

export const useAnalyticsSettings =
  createAnalyticsSettingsState(localStorageService);
