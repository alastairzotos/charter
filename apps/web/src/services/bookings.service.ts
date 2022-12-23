import { BookingDto, BookingNoId, BookingStatus, OperatorDto, TripDto } from "dtos";
import { HttpService } from "./http.service";

export class BookingsService extends HttpService {
  async createBooking(booking: BookingNoId): Promise<string> {
    const { data } = await this.httpClient.post<any, { data: string }, BookingNoId>('/bookings', booking);

    return data;
  }

  async getBookingById(id: string) {
    const { data } = await this.httpClient.get<BookingDto>(`/bookings/${id}`);

    return data;
  }

  async getBookingWithOperatorAndTrip(id: string) {
    const { data } = await this.httpClient.get<BookingDto>(`/bookings/with-details/${id}`);

    return data;
  }

  async getBookingsForUser() {
    const { data } = await this.httpClient.get<BookingDto[]>(`/bookings/for-user`);

    return data;
  }

  async setBookingStatus(id: string, status: BookingStatus) {
    await this.httpClient.patch<any, {}, { id: string, status: BookingStatus }>('/bookings', { id, status });
  }
}
