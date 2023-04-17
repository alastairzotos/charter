import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BookingDto, BookingNoId, BookingPaymentStatus, BookingStatus, LoggedInUserDetails, UserDetails } from 'dtos';

import { EnvService } from 'environment/environment.service';
import { BookingsRepository } from 'features/bookings/bookings.repository';
import { OperatorsService } from 'features/operators/operators.service';
import { EmailService } from 'integrations/email/email.service';
import { ServicesService } from 'features/services/services.service';
import { PaymentsService } from 'features/payments/payments.service';
import { TemplatesService } from 'features/templates/templates.service';

@Injectable()
export class BookingsService {
  constructor(
    private readonly operatorsService: OperatorsService,
    private readonly templatesService: TemplatesService,
    private readonly emailService: EmailService,
    private readonly servicesService: ServicesService,
    private readonly bookingsRepository: BookingsRepository,

    @Inject(forwardRef(() => PaymentsService))
    private readonly paymentsService: PaymentsService,
  ) { }

  async createBooking(booking: BookingNoId) {
    const service = booking.service;

    const createdBooking = await this.bookingsRepository.createBooking({
      bookingDate: new Date(),
      ...booking,
      paymentStatus: 'pending',
      status: service.approveBookingBeforePayment ? "pending" : "confirmed"
    });

    if (!service.serviceSchema.shouldPayNow) {
      await this.setBookingPaymentStatus(createdBooking._id, 'succeeded');
    }
    
    return createdBooking;
  }

  async setBookingPaymentIntentId(bookingId: string, paymentIntentId: string) {
    await this.bookingsRepository.setBookingPaymentIntentId(bookingId, paymentIntentId);
  }

  async setBookingSetupIntentIdAndStripeCustomerId(bookingId: string, setupIntentId: string, stripeCustomerId: string) {
    await this.bookingsRepository.setBookingSetupIntentIdAndStripeCustomerId(bookingId, setupIntentId, stripeCustomerId);
  }

  async setBookingPaymentStatus(id: string, paymentStatus: BookingPaymentStatus) {
    await this.bookingsRepository.setBookingPaymentStatus(id, paymentStatus);

    const createdBooking =
      await this.bookingsRepository.getBookingWithOperatorAndService(id);

    if (paymentStatus === 'succeeded') {
      await Promise.all([
        this.servicesService.addBookingToService(createdBooking.service._id),
        this.emailService.sendEmail(
          createdBooking.operator.email,
          this.templatesService.bookingMadeOperator(createdBooking),
        ),
        this.emailService.sendEmail(
          createdBooking.email,
          this.templatesService.bookingMadeUser(createdBooking),
        ),
      ]);
    }
  }

  async getBookingPaymentStatus(id: string) {
    return await this.bookingsRepository.getBookingPaymentStatus(id);
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

  async getBookingBySetupIntentId(paymentIntentId: string) {
    return await this.bookingsRepository.getBookingBySetupIntentId(paymentIntentId);
  }

  async getBookingsForUser(user: LoggedInUserDetails) {
    const operator = await this.operatorsService.getOperatorByOwnerId(user._id);
    const bookings = await this.bookingsRepository.getBookingsByOperator(
      operator,
    );

    return bookings;
  }

  async getBookingsByOperatorId(id: string) {
    return await this.bookingsRepository.getBookingsByOperatorId(id);
  }

  async setBookingStatus(id: string, status: BookingStatus) {
    const booking = await this.bookingsRepository.getBookingWithOperatorAndService(
      id,
    );

    if (status === 'confirmed' && booking.service.approveBookingBeforePayment) {
      await this.paymentsService.chargeUserOffSession(booking);
    }

    await this.bookingsRepository.setBookingStatus(id, status);

    const email =
      status === 'confirmed'
        ? this.templatesService.bookingConfirmedUser(booking)
        : this.templatesService.bookingRejectedUser(booking);

    await this.emailService.sendEmail(booking.email, email);
  }

  async notifyPartiesOfPendingBooking(booking: BookingDto) {
    await Promise.all([
      this.emailService.sendEmail(
        booking.email,
        this.templatesService.bookingMadeUserPending(booking),
      ),
      this.emailService.sendEmail(
        booking.operator.email,
        this.templatesService.bookingMadeOperatorActionRequired(booking),
      )
    ])
  }
}
