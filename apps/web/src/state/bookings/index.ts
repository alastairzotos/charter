import { BookingNoId } from 'dtos';
import create from 'zustand';
import { FetchStatus } from '../../models';
import { BookingsService } from '../../services/bookings.service';

export interface BookingsStateValues {
  createBookingStatus?: FetchStatus;
  bookingId?: string;
}

export interface BookingsStateActions {
  createBooking: (booking: BookingNoId) => Promise<void>;
}

export type BookingsState = BookingsStateValues & BookingsStateActions;

export const createBookingsState = (initialValues: BookingsStateValues, bookingsService: Pick<BookingsService, keyof BookingsService>) =>
  create<BookingsState>((set) => ({
    ...initialValues,

    createBooking: async (booking) => {
      try {
        set({ createBookingStatus: 'fetching' });

        const bookingId = await bookingsService.createBooking(booking);

        set({ createBookingStatus: 'success', bookingId });
      } catch {
        set({ createBookingStatus: 'error' });
      }
    }
  }))

export const useBookingsState = createBookingsState(
  {},
  new BookingsService()
)
