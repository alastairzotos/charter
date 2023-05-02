import {
  Body,
  Controller,
  Post,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateCustomerDto,
  CreatePaymentIntentDto,
  CreateSetupIntentDto,
} from 'dtos';
import { PaymentsService } from 'features/payments/payments.service';
import { SentryInterceptor } from 'interceptors/sentry.interceptor';

@Controller('payments')
@UseInterceptors(SentryInterceptor)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('webhook')
  async webhook(
    @Body() body: Buffer,
    @Headers() headers: Record<string, string>,
  ) {
    await this.paymentsService.handleWebhook(body, headers['stripe-signature']);
  }

  @Post('payment-intent')
  async createPaymentIntent(@Body() { bookingId }: CreatePaymentIntentDto) {
    return await this.paymentsService.createPaymentIntent(bookingId);
  }

  @Post('customer')
  async getOrCreateCustomer(@Body() { name, email }: CreateCustomerDto) {
    return await this.paymentsService.getOrCreateCustomer(name, email);
  }

  @Post('setup-intent')
  async createSetupIntent(
    @Body() { bookingId, customerId }: CreateSetupIntentDto,
  ) {
    return await this.paymentsService.createSetupIntent(bookingId, customerId);
  }
}
