import { TripDto, TripNoId } from 'dtos';
import create from 'zustand';
import { FetchStatus } from '../../models';
import { TripsService } from '../../services/trips.service';

export interface TripsStateValues {
  currentOperatorId?: string;

  loadTripsStatus?: FetchStatus;
  trips: TripDto[];

  loadTripStatus?: FetchStatus;
  trip?: TripDto;

  updateTripStatus?: FetchStatus;
  createTripStatus?: FetchStatus;
  deleteTripStatus?: FetchStatus;
}

export interface TripsStateActions {
  loadTripsForOperator: (operatorId: string) => Promise<void>;
  loadTrip: (id: string) => Promise<void>;
  updateTrip: (id: string, newTrip: Partial<TripNoId>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  createTrip: (trip: TripNoId) => Promise<void>;
}

export type TripsState = TripsStateValues & TripsStateActions;

export const createTripsState = (initialValues: TripsStateValues, tripsService: Pick<TripsService, keyof TripsService>) =>
  create<TripsState>((set, self) => ({
    ...initialValues,

    loadTripsForOperator: async (operatorId) => {
      set({ currentOperatorId: operatorId });

      try {
        set({ loadTripsStatus: 'fetching' });

        const trips = await tripsService.getTripsForOperator(operatorId);

        set({ loadTripsStatus: 'success', trips });
      } catch {
        set({ loadTripsStatus: 'error' });
      }
    },

    loadTrip: async (id) => {
      try {
        set({ loadTripStatus: 'fetching' });
        
        const trip = await tripsService.getTrip(id);

        set({ loadTripStatus: 'success', trip });
      } catch {
        set({ loadTripStatus: 'error' });
      }
    },

    updateTrip: async (id, newTrip) => {
      try {
        set({ updateTripStatus: 'fetching' });

        await tripsService.updateTrip(id, newTrip);

        set({ updateTripStatus: 'success' });

        self().loadTripsForOperator(self().currentOperatorId!);
      } catch {
        set({ updateTripStatus: 'error' });
      }
    },

    deleteTrip: async (id) => {
      try {
        set({ deleteTripStatus: 'fetching' });

        await tripsService.deleteTrip(id);

        set({ deleteTripStatus: 'success' });

        self().loadTripsForOperator(self().currentOperatorId!);
      } catch {
        set({ deleteTripStatus: 'error' });
      }
    },

    createTrip: async (trip) => {
      try {
        set({ createTripStatus: 'fetching' });

        await tripsService.createTrip(trip);

        set({ createTripStatus: 'success' });
        self().loadTripsForOperator(self().currentOperatorId!);
      } catch {
        set({ createTripStatus: 'error' });
      }
    }
  }))

export const useTripsState = createTripsState(
  {
    trips: []
  },
  new TripsService()
)
