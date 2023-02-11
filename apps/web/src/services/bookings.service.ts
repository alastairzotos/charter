import {
  BookingDto,
  BookingNoId,
  BookingPaymentStatus,
  BookingStatus,
} from "dtos";
import { httpClient } from "src/services/http.service";

export class BookingsService {
  async createBooking(booking: BookingNoId): Promise<string> {
    const { data } = await httpClient.post<
      any,
      { data: string },
      BookingNoId
    >("/bookings", booking);

    return data;
  }

  async getBookingById(id: string) {
    const { data } = await httpClient.get<BookingDto>(`/bookings/${id}`);

    return data;
  }

  async getBookingWithOperatorAndService(id: string) {
    const { data } = await httpClient.get<BookingDto>(
      `/bookings/with-details/${id}`
    );

    return data;
  }

  async getBookingsForUser() {
    const { data } = await httpClient.get<BookingDto[]>(
      "/bookings/for-user"
    );

    return data;
  }

  async setBookingStatus(id: string, status: BookingStatus) {
    await httpClient.patch<
      any,
      unknown,
      { id: string; status: BookingStatus }
    >("/bookings", { id, status });
  }

  async getBookingPaymentStatus(id: string) {
    const { data } = await httpClient.get<BookingPaymentStatus>(
      `/bookings/payment-status/${id}`
    );
    return data;
  }
}
