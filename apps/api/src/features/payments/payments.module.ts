import { forwardRef, Module } from '@nestjs/common';
import { BookingsModule } from 'features/bookings/bookings.module';
import { PaymentsController } from 'features/payments/payments.controller';
import { PaymentsService } from 'features/payments/payments.service';
import { StripeModule } from 'integrations/stripe/stripe.module';

@Module({
  imports: [StripeModule, forwardRef(() => BookingsModule)],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
