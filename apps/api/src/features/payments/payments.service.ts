import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BookingDto } from 'dtos';
import { BookingsService } from 'features/bookings/bookings.service';
import { BroadcastService } from 'features/broadcast/broadcast.service';
import { StripeService } from 'integrations/stripe/stripe.service';
import { calculateBookingPrice } from 'utils';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly stripeService: StripeService,
    @Inject(forwardRef(() => BookingsService))
    private readonly bookingService: BookingsService,
    private readonly broadcastService: BroadcastService,
  ) {}

  async handleWebhook(body: Buffer, signature: string) {
    const event = await this.stripeService.constructEvent(body, signature);

    if (event.type.startsWith('payment_intent')) {
      const paymentIntentId = event.data.object['id'] as string;
      const booking = await this.bookingService.getBookingByPaymentIntentId(
        paymentIntentId,
      );

      if (!!booking) {
        switch (event.type) {
          case 'payment_intent.succeeded':
            await this.bookingService.setBookingPaymentStatus(
              booking._id,
              'succeeded',
            );
            break;

          case 'payment_intent.payment_failed':
            await this.bookingService.setBookingPaymentStatus(
              booking._id,
              'failed',
            );
            break;

          case 'payment_intent.canceled':
            await this.bookingService.setBookingPaymentStatus(
              booking._id,
              'cancelled',
            );
            break;
        }
      }
    }

    if (event.type.startsWith('setup_intent')) {
      const setupIntentId = event.data.object['id'] as string;
      const booking = await this.bookingService.getBookingBySetupIntentId(
        setupIntentId,
      );

      if (!!booking) {
        switch (event.type) {
          case 'setup_intent.succeeded':
            await this.broadcastService.broadcastPendingBooking(booking);
            break;
        }
      }
    }
  }

  async createPaymentIntent(bookingId: string) {
    const booking = await this.bookingService.getBookingById(bookingId);
    const amount = calculateBookingPrice(booking.priceDetails, booking.service);

    const { id, client_secret } = await this.stripeService.createPaymentIntent(
      amount * 100,
      'EUR',
    );

    await this.bookingService.setBookingPaymentIntentId(bookingId, id);

    return client_secret;
  }

  async getOrCreateCustomer(name: string, email: string) {
    return await this.stripeService.getOrCreateCustomer(name, email);
  }

  async createSetupIntent(bookingId, customerId: string) {
    const { id: setupIntentId, client_secret } =
      await this.stripeService.createSetupIntent(customerId);

    await this.bookingService.setBookingSetupIntentIdAndStripeCustomerId(
      bookingId,
      setupIntentId,
      customerId,
    );

    return client_secret;
  }

  async createPaymentIntentOffSession(
    bookingId: string,
    paymentMethodId: string,
    customerId: string,
  ) {
    const booking = await this.bookingService.getBookingById(bookingId);
    const amount = calculateBookingPrice(booking.priceDetails, booking.service);

    const { id, client_secret } =
      await this.stripeService.createPaymentIntentOffSession(
        amount * 100,
        'EUR',
        paymentMethodId,
        customerId,
      );

    await this.bookingService.setBookingPaymentIntentId(bookingId, id);

    return client_secret;
  }

  async chargeUserOffSession(booking: BookingDto) {
    const paymentMethods =
      await this.stripeService.getPaymentMethodsForCustomerId(
        booking.stripeCustomerId,
      );

    if (
      !paymentMethods ||
      !paymentMethods.data ||
      !paymentMethods.data.length
    ) {
      throw new InternalServerErrorException();
    }

    const paymentMethod = paymentMethods.data[0];

    return await this.createPaymentIntentOffSession(
      booking._id,
      paymentMethod.id,
      booking.stripeCustomerId,
    );
  }
}
