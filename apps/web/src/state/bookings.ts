import { createQuery } from "@bitmetro/create-query";
import { BookingStatus } from "dtos";

import {
  createBooking,
  getBookingById,
  getBookingPaymentStatus,
  getBookingsByOperatorId,
  getBookingsForUser,
  setBookingStatus,
} from "src/clients/bookings.client";

export const useCreateBooking = createQuery(createBooking);
export const useLoadBookingsForUser = createQuery(getBookingsForUser);
export const useLoadBooking = createQuery(getBookingById);
export const useLoadBookingsByOperatorId = createQuery(getBookingsByOperatorId);
export const useGetBookingPaymentStatus = createQuery(getBookingPaymentStatus);

export const useSetBookingStatus = createQuery(
  async (id: string, status: BookingStatus) => {
    await setBookingStatus(id, status);
    useLoadBookingsForUser.getState().request();
  }
);
