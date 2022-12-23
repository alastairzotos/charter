import { Injectable } from "@nestjs/common";
import { BookingNoId } from "dtos";
import { OperatorsService } from "../operators/operators.service";
import { TripsService } from "../trips/trips.service";
import { BookingsRepository } from "./bookings.repository";

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepository: BookingsRepository,
  ) {}

  async createBooking(booking: BookingNoId) {
    const id = await this.bookingsRepository.createBooking(booking);

    // Send email to operator and user
    // booking.email
    // booking.operator.email

    return id;
  }

  async getBookingWithOperatorAndTrip(id: string) {
    const booking = await this.bookingsRepository.getBookingWithOperatorAndTrip(id);

    console.log(booking);
    return booking;
  }
}
