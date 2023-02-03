import { BookingDto, BookingNoId, BookingStatus } from "dtos";

import { BookingsService } from "src/services/bookings.service";
import { createSlice } from "src/state/resource-slice";

const svc = new BookingsService();

export const useLoadBookingsForUser = createSlice<BookingDto[]>(
  null,
  async () => await svc.getBookingsForUser()
);

export const useLoadBooking = createSlice<BookingDto, [string]>(
  null,
  async (id) => svc.getBookingById(id)
);

export const useCreateBooking = createSlice<string, [BookingNoId]>(
  null,
  async (booking) => await svc.createBooking(booking)
);

export const useSetBookingStatus = createSlice<void, [string, BookingStatus]>(
  null,
  async (id, status) => {
    await svc.setBookingStatus(id, status);
    useLoadBookingsForUser.getState().request();
  }
);
