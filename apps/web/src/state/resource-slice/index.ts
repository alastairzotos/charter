// import { BookingsService } from "src/services/bookings.service";
// import { BookingDto, BookingNoId } from "dtos";

import create, { Mutate, StoreApi } from "zustand";

/*
Sample code:
  Possible better way to handle state in a reusable way.
*/

export type FetchStatus = 'fetching' | 'success' | 'error';;

export interface SliceValues<T> {
  status?: FetchStatus;
  value: T | null;
}

export interface SliceActions<A extends any[]> {
  load: (...args: A) => Promise<void>;
}

export type SliceState<T, A extends any[]> = SliceValues<T> & SliceActions<A>;

type Get<T, K, F> = K extends keyof T ? T[K] : F;

type HookFn<T, A extends any[]> = (
  setState: Get<Mutate<StoreApi<SliceState<T, A>>, []>, 'setState', never>,
  getState: Get<Mutate<StoreApi<SliceState<T, A>>, []>, 'getState', never>
) => void;

export const createSlice = <T, A extends any[]>(
  initialValue: T | null,
  load: (...args: A) => Promise<T>,
  opts?: {
    beforeLoad?: HookFn<T, A>;
    afterLoad?: HookFn<T, A>;
  }
) =>
  create<SliceState<T, A>>((set, self) => ({
    value: initialValue,

    load: async (...args) => {
      const beforeLoad = opts?.beforeLoad || (() => {});
      const afterLoad = opts?.afterLoad || (() => {});

      try {
        beforeLoad(set, self);
        set({ status: 'fetching' });

        const value = await load(...args);

        set({ status: 'success', value });

        afterLoad(set, self);
      } catch {
        set({ status: 'error' });
      }
    }
  }));

// const svc = new BookingsService();
// const useBookingState = createSlice<BookingDto, [string]>(null, async (id: string) => await svc.getBookingById(id));
// const useBookingsState = createSlice<BookingDto[], []>([], async () => await svc.getBookingsForUser());
// const useCreateBookingsState = createSlice<string, [BookingNoId]>(
//   null,
//   async (booking) => await svc.createBooking(booking),
//   {
//     postLoad: () => useBookingsState.getState().load()
//   }
// );

// const [status, value, load] = useBookingState(s => [s.status, s.value, s.load]);
