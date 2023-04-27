import { createQuery } from "@bitmetro/create-query";

import {
  createBooking,
  getBookingPaymentStatus,
} from "clients/bookings.client";

export const useCreateBooking = createQuery(createBooking);
export const useGetBookingPaymentStatus = createQuery(getBookingPaymentStatus);
