import { Injectable } from "@nestjs/common";
import { StripeService } from "integrations/stripe/stripe.service";

@Injectable()
export class PaymentsService {
  constructor(private readonly stripeService: StripeService) {}

  async createPaymentIntent(amount: number, currency: string) {
    const paymentIntent = await this.stripeService.createPaymentIntent(amount * 100, currency);
    return paymentIntent.client_secret;
  }
}
