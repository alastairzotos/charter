import { Injectable } from "@nestjs/common";
import { BookingsService } from "features/bookings/bookings.service";
import { StripeService } from "integrations/stripe/stripe.service";
import { calculateBookingPrice } from "utils";

@Injectable()
export class PaymentsService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly bookingService: BookingsService,
  ) { }

  async handleWebhook(body: Buffer, signature: string) {
    const event = await this.stripeService.constructEvent(body, signature);

    const paymentIntentId = event.data.object['id'] as string;
    const booking = await this.bookingService.getBookingByPaymentIntentId(paymentIntentId);

    if (!!booking) {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.bookingService.setBookingPaymentStatus(booking._id, 'succeeded');
          break;

        case 'payment_intent.payment_failed':
          await this.bookingService.setBookingPaymentStatus(booking._id, 'failed');
          break;

        case 'payment_intent.canceled':
          await this.bookingService.setBookingPaymentStatus(booking._id, 'cancelled');
          break;
      }
    }
  }

  async createPaymentIntent(bookingId: string) {
    const booking = await this.bookingService.getBookingById(bookingId);
    const amount = calculateBookingPrice(booking.priceDetails, booking.service);

    const { id, client_secret } = await this.stripeService.createPaymentIntent(amount * 100, "EUR");

    await this.bookingService.setBookingPaymentIntentId(bookingId, id);

    return client_secret;
  }

  async getOrCreateCustomer(name: string, email: string) {
    return await this.stripeService.getOrCreateCustomer(name, email);
  }

  async createSetupIntent(bookingId, customerId: string) {
    const { id, client_secret } = await this.stripeService.createSetupIntent(customerId);

    await this.bookingService.setBookingSetupIntentId(bookingId, id);

    return client_secret;
  }
}
