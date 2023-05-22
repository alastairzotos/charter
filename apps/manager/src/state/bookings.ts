import { createQuery } from "@bitmetro/create-query";
import { BookingStatus } from "dtos";

import {
  getAllBookings,
  getBookingById,
  getBookingsByOperatorId,
  getBookingsForUser,
  setBookingFulfillment,
  setBookingStatus,
} from "clients/bookings.client";

export const useLoadBookingsForUser = createQuery(getBookingsForUser);
export const useLoadBooking = createQuery(getBookingById);
export const useLoadBookingsByOperatorId = createQuery(getBookingsByOperatorId);
export const useLoadAllBookings = createQuery(getAllBookings);
export const useSetBookingFulfillment = createQuery(setBookingFulfillment);

export const useSetBookingStatus = createQuery(
  async (id: string, status: BookingStatus) => {
    await setBookingStatus(id, status);
    useLoadBookingsForUser.getState().request();
  }
);
