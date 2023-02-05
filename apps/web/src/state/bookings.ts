import { BookingDto, BookingNoId, BookingStatus } from "dtos";

import { BookingsService } from "src/services/bookings.service";
import { createSlice } from "src/state/slice";

const svc = new BookingsService();

export const useCreateBooking = createSlice<string, [booking: BookingNoId]>(
  null,
  async (booking) => await svc.createBooking(booking)
);

export const useLoadBookingsForUser = createSlice<BookingDto[]>(
  null,
  async () => await svc.getBookingsForUser()
);

export const useLoadBooking = createSlice<BookingDto, [id: string]>(
  null,
  async (id) => svc.getBookingById(id)
);

export const useSetBookingStatus = createSlice<
  void,
  [id: string, status: BookingStatus]
>(null, async (id, status) => {
  await svc.setBookingStatus(id, status);
  useLoadBookingsForUser.getState().request();
});
