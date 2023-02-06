import { Injectable } from '@nestjs/common';
import { BookingNoId, BookingPaymentStatus, BookingStatus, UserDetails } from 'dtos';

import { emailContent } from 'content/email';
import { EnvService } from 'environment/environment.service';
import { BookingsRepository } from 'features/bookings/bookings.repository';
import { OperatorsService } from 'features/operators/operators.service';
import { EmailService } from 'integrations/email/email.service';

@Injectable()
export class BookingsService {
  constructor(
    private readonly envService: EnvService,
    private readonly operatorsService: OperatorsService,
    private readonly emailService: EmailService,
    private readonly bookingsRepository: BookingsRepository,
  ) { }

  async createBooking(booking: BookingNoId) {
    const { _id } = await this.bookingsRepository.createBooking(booking);
    return _id;
  }

  async setBookingPaymentIntentId(bookingId: string, paymentIntentId: string) {
    await this.bookingsRepository.setBookingPaymentIntentId(bookingId, paymentIntentId);
  }

  async setBookingPaymentStatus(id: string, paymentStatus: BookingPaymentStatus) {
    await this.bookingsRepository.setBookingPaymentStatus(id, paymentStatus);

    const createdBooking =
      await this.bookingsRepository.getBookingWithOperatorAndService(id);

    if (paymentStatus === 'succeeded') {
      await Promise.all([
        this.emailService.sendEmail(
          createdBooking.operator.email,
          emailContent(this.envService).bookingMadeOperator(createdBooking),
        ),
        this.emailService.sendEmail(
          createdBooking.email,
          emailContent(this.envService).bookingMadeUser(createdBooking),
        ),
      ]);
    }
  }

  async getBookingWithOperatorAndService(id: string) {
    return await this.bookingsRepository.getBookingWithOperatorAndService(id);
  }

  async getBookingById(id: string) {
    return await this.bookingsRepository.getBookingById(id);
  }

  async getBookingByPaymentIntentId(paymentIntentId: string) {
    return await this.bookingsRepository.getBookingByPaymentIntentId(paymentIntentId);
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
    const booking = await this.bookingsRepository.getBookingWithOperatorAndService(
      id,
    );

    const email =
      status === 'confirmed'
        ? emailContent(this.envService).bookingConfirmedUser(booking)
        : emailContent(this.envService).bookingRejectedUser(booking);

    await this.emailService.sendEmail(booking.email, email);
  }
}
