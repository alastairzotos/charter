import { Body, Controller, Post, Headers } from "@nestjs/common";
import { CreatePaymentIntentDto } from "dtos";
import { PaymentsService } from "features/payments/payments.service";

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('payment-intent')
  async createPaymentIntent(
    @Body() { bookingId }: CreatePaymentIntentDto
  ) {
    return await this.paymentsService.createPaymentIntent(bookingId);
  }

  @Post('webhook')
  async webhook(
    @Body() body: Buffer,
    @Headers() headers: Record<string, string>
  ) {
    await this.paymentsService.handleWebhook(body, headers['stripe-signature']);
  }
}
