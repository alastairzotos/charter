import { Module } from "@nestjs/common";
import { PaymentsController } from "features/payments/payments.controller";
import { PaymentsService } from "features/payments/payments.service";
import { StripeModule } from "integrations/stripe/stripe.module";

@Module({
  imports: [StripeModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
