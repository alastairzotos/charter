import {
  BookingDto,
  BookingNoId,
  BookingPaymentStatus,
  BookingStatus,
} from "dtos";

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

export const getBookingById = async (id: string) => {
  const { data } = await httpClient.get<BookingDto>(`/bookings/${id}`);

  return data;
};

export const getBookingWithOperatorAndService = async (id: string) => {
  const { data } = await httpClient.get<BookingDto>(
    `/bookings/with-details/${id}`
  );

  return data;
};

export const getBookingsForUser = async () => {
  const { data } = await httpClient.get<BookingDto[]>("/bookings/for-user");

  return data;
};

export const setBookingStatus = async (id: string, status: BookingStatus) => {
  await httpClient.patch<any, unknown, { id: string; status: BookingStatus }>(
    "/bookings",
    { id, status }
  );
};

export const getBookingPaymentStatus = async (id: string) => {
  const { data } = await httpClient.get<BookingPaymentStatus>(
    `/bookings/payment-status/${id}`
  );
  return data;
};

export const getBookingsByOperatorId = async (id: string) => {
  const { data } = await httpClient.get<BookingDto[]>(
    `/bookings/by-operator-id/${id}`
  );
  return data;
};

export const setBookingFulfillment = async (id: string, fulfilled: boolean) => {
  await httpClient.post<any, unknown, { id: string; fulfilled: boolean }>(
    "/bookings/fulfillment",
    { id, fulfilled }
  );
};
