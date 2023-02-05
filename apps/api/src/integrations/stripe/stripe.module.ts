import { Module } from "@nestjs/common";
import { EnvModule } from "environment/environment.module";
import { StripeService } from "integrations/stripe/stripe.service";

@Module({
  imports: [EnvModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
