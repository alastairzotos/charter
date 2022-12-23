import { Injectable } from "@nestjs/common";
import { BookingNoId, BookingStatus, UserDetails } from "dtos";
import { OperatorsService } from "../operators/operators.service";
import { TripsService } from "../trips/trips.service";
import { BookingsRepository } from "./bookings.repository";

@Injectable()
export class BookingsService {
  constructor(
    private readonly operatorsService: OperatorsService,
    private readonly bookingsRepository: BookingsRepository,
  ) {}

  async createBooking(booking: BookingNoId) {
    const id = await this.bookingsRepository.createBooking(booking);

    // Send email to operator and user
    //  booking.email
    //  booking.operator.email

    return id;
  }

  async getBookingWithOperatorAndTrip(id: string) {
    return await this.bookingsRepository.getBookingWithOperatorAndTrip(id);
  }

  async getBookingById(id: string) {
    return await this.bookingsRepository.getBookingById(id);
  }

  async getBookingsForUser(user: UserDetails) {
    if (!user || (user.role !== 'admin' && user.role !== 'operator')) {
      return null;
    }

    const operator = await this.operatorsService.getOperatorByEmail(user.email);
    const bookings = await this.bookingsRepository.getBookingsByOperator(operator);

    return bookings;
  }

  async setBookingStatus(id: string, status: BookingStatus) {
    await this.bookingsRepository.setBookingStatus(id, status);

    // Email user
  }
}
