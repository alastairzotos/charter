import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  BookingDto,
  BookingNoId,
  BookingPaymentStatus,
  BookingStatus,
  LoggedInUserDetails,
} from 'dtos';

import { BookingsRepository } from 'features/bookings/bookings.repository';
import { OperatorsService } from 'features/operators/operators.service';
import { EmailService } from 'integrations/email/email.service';
import { ServicesService } from 'features/services/services.service';
import { PaymentsService } from 'features/payments/payments.service';
import { TemplatesService } from 'features/templates/templates.service';
import { QRCodeService } from 'features/qr-code/qr-code.service';
import { getReadableBookingDetails } from 'utils';
import { NotificationsService } from 'integrations/notifications/notifications.service';
import { UsersService } from 'features/users/users.service';

export interface ReadableBooking {
  service: {
    id: string;
    name: string;
  };
  data: Record<string, string>;
  status: 'pending' | 'confirmed' | 'rejected';
  fulfilled: boolean;
}

@Injectable()
export class BookingsService {
  constructor(
    private readonly operatorsService: OperatorsService,
    private readonly templatesService: TemplatesService,
    private readonly emailService: EmailService,
    private readonly servicesService: ServicesService,
    private readonly bookingsRepository: BookingsRepository,
    private readonly qrCodeService: QRCodeService,
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => PaymentsService))
    private readonly paymentsService: PaymentsService,
  ) {}

  async createBooking(booking: BookingNoId) {
    const service = booking.service;

    const createdBooking = await this.bookingsRepository.createBooking({
      bookingDate: new Date(),
      ...booking,
      paymentStatus: 'pending',
      status: service.approveBookingBeforePayment ? 'pending' : 'confirmed',
      fulfilled: false,
    });

    if (!service.serviceSchema.shouldPayNow) {
      await this.setBookingPaymentStatus(createdBooking._id, 'succeeded');
    }

    await this.qrCodeService.createQRCodeForBooking(
      await this.getBookingWithOperatorAndService(createdBooking._id),
    );

    return createdBooking;
  }

  async setBookingPaymentIntentId(bookingId: string, paymentIntentId: string) {
    await this.bookingsRepository.setBookingPaymentIntentId(
      bookingId,
      paymentIntentId,
    );
  }

  async setBookingSetupIntentIdAndStripeCustomerId(
    bookingId: string,
    setupIntentId: string,
    stripeCustomerId: string,
  ) {
    await this.bookingsRepository.setBookingSetupIntentIdAndStripeCustomerId(
      bookingId,
      setupIntentId,
      stripeCustomerId,
    );
  }

  async setBookingPaymentStatus(
    id: string,
    paymentStatus: BookingPaymentStatus,
  ) {
    await this.bookingsRepository.setBookingPaymentStatus(id, paymentStatus);

    const createdBooking =
      await this.bookingsRepository.getBookingWithOperatorAndService(id);

    if (paymentStatus === 'succeeded') {
      await this.servicesService.addBookingToService(
        createdBooking.service._id,
      );

      if (!createdBooking.service.approveBookingBeforePayment) {
        await Promise.all([
          this.emailService.sendEmailToOperator(
            createdBooking.operator,
            this.templatesService.bookingMadeOperator(createdBooking),
          ),
          this.emailService.sendEmail(
            createdBooking.email,
            this.templatesService.bookingMadeUser(createdBooking),
          ),
          this.sendPushNotificationToOperatorForBooking(createdBooking),
        ]);
      }

      await this.notifyAdminsOfBooking(createdBooking);
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

  async getBookingsByInstance(instance: string) {
    return await this.bookingsRepository.getBookingsByInstance(instance);
  }

  async getReadableBookingById(id: string): Promise<ReadableBooking> {
    const booking = await this.bookingsRepository.getBookingById(id);

    if (!booking) {
      return null;
    }

    const data = getReadableBookingDetails(booking);

    return {
      service: {
        id: booking.service._id,
        name: booking.service.name,
      },
      data,
      status: booking.status,
      fulfilled: booking.fulfilled,
    };
  }

  async getBookingByPaymentIntentId(paymentIntentId: string) {
    return await this.bookingsRepository.getBookingByPaymentIntentId(
      paymentIntentId,
    );
  }

  async getBookingBySetupIntentId(paymentIntentId: string) {
    return await this.bookingsRepository.getBookingBySetupIntentId(
      paymentIntentId,
    );
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
    const booking =
      await this.bookingsRepository.getBookingWithOperatorAndService(id);

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
      this.emailService.sendEmailToOperator(
        booking.operator,
        this.templatesService.bookingMadeOperatorActionRequired(booking),
      ),
      this.sendPushNotificationToOperatorForBooking(booking),
    ]);
  }

  async notifyAdminsOfBooking(booking: BookingDto) {
    const admins = await this.usersService.getAdmins();

    await Promise.all(
      admins.map((admin) =>
        this.emailService.sendEmail(
          admin.email,
          this.templatesService.bookingMadeAdmin(booking),
        ),
      ),
    );
  }

  async sendPushNotificationToOperatorForBooking(booking: BookingDto) {
    const token = await this.operatorsService.getOperatorNotificationToken(
      booking.operator._id,
    );
    this.notificationsService.notifyOperatorOfBooking({
      token,
      booking,
      onRevoke: async () =>
        await this.operatorsService.revokeNotificationToken(
          booking.operator._id,
        ),
    });
  }

  async setBookingFulfillment(id: string, fulfilled: boolean) {
    await this.bookingsRepository.setBookingFulfillment(id, fulfilled);
  }

  async deleteBookingsForService(serviceId: string) {
    await this.bookingsRepository.deleteBookingsForService(serviceId);
  }
}
