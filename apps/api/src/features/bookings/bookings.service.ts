import { Injectable } from '@nestjs/common';
import { BookingNoId, BookingStatus, UserDetails } from 'dtos';

import { emailContent } from 'src/content/email';
import { EnvService } from 'src/environment/environment.service';
import { BookingsRepository } from 'src/features/bookings/bookings.repository';
import { OperatorsService } from 'src/features/operators/operators.service';
import { EmailService } from 'src/integrations/email/email.service';

@Injectable()
export class BookingsService {
  constructor(
    private readonly envService: EnvService,
    private readonly operatorsService: OperatorsService,
    private readonly emailService: EmailService,
    private readonly bookingsRepository: BookingsRepository,
  ) {}

  async createBooking(booking: BookingNoId) {
    const { _id } = await this.bookingsRepository.createBooking(booking);
    const createdBooking =
      await this.bookingsRepository.getBookingWithOperatorAndTrip(_id);

    await Promise.all([
      this.emailService.sendEmail(
        booking.operator.email,
        emailContent(this.envService).bookingMadeOperator(createdBooking),
      ),
      this.emailService.sendEmail(
        booking.email,
        emailContent(this.envService).bookingMadeUser(createdBooking),
      ),
    ]);

    return _id;
  }

  async getBookingWithOperatorAndTrip(id: string) {
    return await this.bookingsRepository.getBookingWithOperatorAndTrip(id);
  }

  async getBookingById(id: string) {
    return await this.bookingsRepository.getBookingById(id);
  }

  async getBookingsForUser(user: UserDetails) {
    const operator = await this.operatorsService.getOperatorByEmail(user.email);
    const bookings = await this.bookingsRepository.getBookingsByOperator(
      operator,
    );

    return bookings;
  }

  async setBookingStatus(id: string, status: BookingStatus) {
    await this.bookingsRepository.setBookingStatus(id, status);
    const booking = await this.bookingsRepository.getBookingWithOperatorAndTrip(
      id,
    );

    const email =
      status === 'confirmed'
        ? emailContent(this.envService).bookingConfirmedUser(booking)
        : emailContent(this.envService).bookingRejectedUser(booking);

    await this.emailService.sendEmail(booking.email, email);
  }
}
