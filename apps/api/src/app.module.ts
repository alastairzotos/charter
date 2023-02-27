import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'environment/environment.module';
import { EnvService } from 'environment/environment.service';
import { BookingsModule } from 'features/bookings/bookings.module';
import { HealthModule } from 'features/health/health.module';
import { ImagesModule } from 'features/images/images.module';
import { OperatorsModule } from 'features/operators/operators.module';
import { PaymentsModule } from 'features/payments/payments.module';
import { ServiceSchemaModule } from 'features/service-schemas/service-schema.module';
import { ServicesModule } from 'features/services/services.module';
import { UsersModule } from 'features/users/users.module';
import { EmailModule } from 'integrations/email/email.module';
import { S3Module } from 'integrations/s3/s3.module';
import { StripeModule } from 'integrations/stripe/stripe.module';
import { JsonBodyMiddleware } from 'middleware/json-body.middleware';
import { RawBodyMiddleware } from 'middleware/raw-body.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvModule,
    HealthModule,
    UsersModule,
    OperatorsModule,
    ServicesModule,
    S3Module,
    ImagesModule,
    BookingsModule,
    EmailModule,
    PaymentsModule,
    StripeModule,
    ServiceSchemaModule,
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        uri: envService.get().dbConnectionString,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: '/payments/webhook',
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
