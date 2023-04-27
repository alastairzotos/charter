import {
  BookingDto,
  BookingNoId,
  BookingPaymentStatus,
  BookingStatus,
} from "dtos";

import { httpClient } from "clients/http.client";

export const getBookingById = async (id: string) => {
  const { data } = await httpClient.get<BookingDto>(`/bookings/${id}`);

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
