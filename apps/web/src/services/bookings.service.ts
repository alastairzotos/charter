import { BookingDto, BookingNoId, OperatorDto, TripDto } from "dtos";
import { HttpService } from "./http.service";

export class BookingsService extends HttpService {
  async createBooking(booking: BookingNoId): Promise<string> {
    const { data } = await this.httpClient.post<any, { data: string }, BookingNoId>('/bookings', booking);

    return data;
  }

  async getBookingWithOperatorAndTrip(id: string) {
    const { data } = await this.httpClient.get<BookingDto>(`/bookings/with-details/${id}`);

    return data;
  }
}
