import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  BookingDto,
  BookingNoId,
  BookingPaymentStatus,
  BookingStatus,
  LoggedInUserDetails,
  SetupIntentStatus,
} from 'dtos';

import { BookingsRepository } from 'features/bookings/bookings.repository';
import { OperatorsService } from 'features/operators/operators.service';
import { ServicesService } from 'features/services/services.service';
import { PaymentsService } from 'features/payments/payments.service';
import { QRCodeService } from 'features/qr-code/qr-code.service';
import { getReadableBookingDetails } from 'utils';
import { BroadcastService } from 'features/broadcast/broadcast.service';

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
    private readonly servicesService: ServicesService,
    private readonly bookingsRepository: BookingsRepository,
    private readonly qrCodeService: QRCodeService,
    private readonly broadcastService: BroadcastService,

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

  async setBookingSetupIntentStatus(
    booking: BookingDto,
    setupIntentStatus: SetupIntentStatus,
  ) {
    await this.bookingsRepository.setBookingSetupIntentStatus(
      booking._id,
      setupIntentStatus,
    );

    if (setupIntentStatus === 'succeeded') {
      await this.broadcastService.broadcastPendingBooking(booking);
    }
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

      await this.broadcastService.broadcastSuccessfulBooking(createdBooking);
    } else if (paymentStatus === 'failed') {
      await this.broadcastService.broadcastFailedPayment(createdBooking);
    } else if (paymentStatus === 'cancelled') {
      await this.broadcastService.broadcastCancelledPayment(createdBooking);
    }
  }

  async setBookingStatus(id: string, status: BookingStatus) {
    const booking =
      await this.bookingsRepository.getBookingWithOperatorAndService(id);

    await this.bookingsRepository.setBookingStatus(id, status);

    if (booking.service.approveBookingBeforePayment) {
      if (status === 'confirmed') {
        await this.paymentsService.chargeUserOffSession(booking);
      } else if (status === 'rejected') {
        await this.broadcastService.broadcastRejectedBooking(booking);
      }
    }
  }

  async setBookingFulfillment(id: string, fulfilled: boolean) {
    await this.bookingsRepository.setBookingFulfillment(id, fulfilled);
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

  async deleteBookingsForService(serviceId: string) {
    await this.bookingsRepository.deleteBookingsForService(serviceId);
  }
}
