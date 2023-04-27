import { BookingDto, BookingNoId, BookingPaymentStatus } from "dtos";

import { httpClient } from "clients/http.client";

export const createBooking = async (
  booking: BookingNoId
): Promise<BookingDto> => {
  const { data } = await httpClient.post<
    any,
    { data: BookingDto },
    BookingNoId
  >("/bookings", booking);

  return data;
};

export const getBookingWithOperatorAndService = async (id: string) => {
  const { data } = await httpClient.get<BookingDto>(
    `/bookings/with-details/${id}`
  );

  return data;
};

export const getBookingPaymentStatus = async (id: string) => {
  const { data } = await httpClient.get<BookingPaymentStatus>(
    `/bookings/payment-status/${id}`
  );
  return data;
};
