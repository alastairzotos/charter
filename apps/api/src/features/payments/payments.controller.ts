import { Body, Controller, Post } from "@nestjs/common";
import { CreatePaymentIntentDto } from "dtos";
import { PaymentsService } from "features/payments/payments.service";

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('payment-intent')
  async createPaymentIntent(
    @Body() { amount, currency }: CreatePaymentIntentDto
  ) {
    return await this.paymentsService.createPaymentIntent(amount, currency);
  }
}
