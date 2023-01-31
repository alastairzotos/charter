import { BookingDto, BookingNoId, BookingStatus } from "dtos";
import create from "zustand";

import { FetchStatus } from "src/models";
import { BookingsService } from "src/services/bookings.service";

export interface BookingsStateValues {
  createBookingStatus?: FetchStatus;
  bookingId?: string;

  getBookingsForUserStatus?: FetchStatus;
  userBookings?: BookingDto[];

  getBookingStatus?: FetchStatus;
  booking?: BookingDto;

  setBookingStatusStatus?: FetchStatus;
}

export interface BookingsStateActions {
  createBooking: (booking: BookingNoId) => Promise<void>;
  clearBooking: () => void;
  getBookingsForUser: () => Promise<void>;
  getBooking: (id: string) => Promise<void>;
  setBookingStatus: (id: string, status: BookingStatus) => Promise<void>;
}

export type BookingsState = BookingsStateValues & BookingsStateActions;

export const createBookingsState = (
  initialValues: BookingsStateValues,
  bookingsService: Pick<BookingsService, keyof BookingsService>
) =>
  create<BookingsState>((set, self) => ({
    ...initialValues,

    createBooking: async (booking) => {
      try {
        set({ createBookingStatus: "fetching" });

        const bookingId = await bookingsService.createBooking(booking);

        set({ createBookingStatus: "success", bookingId });
      } catch {
        set({ createBookingStatus: "error" });
      }
    },

    clearBooking: () =>
      set({
        createBookingStatus: undefined,
        bookingId: undefined,
      }),

    getBookingsForUser: async () => {
      try {
        set({ getBookingsForUserStatus: "fetching" });

        const userBookings = await bookingsService.getBookingsForUser();

        set({ getBookingsForUserStatus: "success", userBookings });
      } catch {
        set({ getBookingsForUserStatus: "error" });
      }
    },

    getBooking: async (id) => {
      try {
        set({ getBookingStatus: "fetching" });

        const booking = await bookingsService.getBookingById(id);

        set({ getBookingStatus: "success", booking });
      } catch {
        set({ getBookingStatus: "error" });
      }
    },

    setBookingStatus: async (id, status) => {
      try {
        set({ setBookingStatusStatus: "fetching" });

        await bookingsService.setBookingStatus(id, status);

        set({ setBookingStatusStatus: "success" });
        self().getBookingsForUser();
      } catch {
        set({ setBookingStatusStatus: "error" });
      }
    },
  }));

export const useBookingsState = createBookingsState({}, new BookingsService());
