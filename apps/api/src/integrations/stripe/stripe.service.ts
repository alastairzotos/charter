import { Injectable } from "@nestjs/common";
import { EnvService } from "environment/environment.service";
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor(private readonly env: EnvService) {
    this.stripe = new Stripe(env.get().stripeSecretKey, {
      // @ts-ignore
      apiVersion: env.get().stripeApiVersion,
    })
  }

  async createPaymentIntent(amount: number, currency: string) {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    })
  }

  async createPaymentIntentOffSession(amount: number, currency: string, paymentMethodId: string, customerId: string) {
    try {
      return await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethodId,
        customer: customerId,
        off_session: true,
        confirm: true,
      })
    } catch (err) {
      console.log(err);
      return await this.stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
    }
  }

  async constructEvent(body: Buffer, signature: string) {
    return await this.stripe.webhooks.constructEventAsync(body, signature, this.env.get().stripeWebhookSecret);
  }

  async getOrCreateCustomer(name: string, email: string) {
    const customersByEmail = await this.stripe.customers.list({ email });

    if (customersByEmail.data.length) {
      return customersByEmail.data[0];
    }

    return await this.stripe.customers.create({ name, email });
  }

  async createSetupIntent(customer: string) {
    return await this.stripe.setupIntents.create({ customer, payment_method_types: ['card'] })
  }

  async getPaymentMethodsForCustomerId(customer: string) {
    return await this.stripe.paymentMethods.list({
      customer,
      type: 'card',
    })
  }
}
