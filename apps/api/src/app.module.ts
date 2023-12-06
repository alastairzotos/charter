import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'environment/environment.module';
import { EnvService } from 'environment/environment.service';
import { AiModule } from 'features/ai/ai.module';
import { AutomationsModule } from 'features/automation/automation.module';
import { BookingsModule } from 'features/bookings/bookings.module';
import { BroadcastModule } from 'features/broadcast/broadcast.module';
import { ConfigurationModule } from 'features/configuration/configuration.module';
import { FeedbackModule } from 'features/feedback/feedback.module';
import { HealthModule } from 'features/health/health.module';
import { ImagesModule } from 'features/images/images.module';
import { InstancesModule } from 'features/instances/instances.module';
import { OperatorsModule } from 'features/operators/operators.module';
import { PaymentsModule } from 'features/payments/payments.module';
import { QRCodeModule } from 'features/qr-code/qr-code.module';
import { SearchModule } from 'features/search/search.module';
import { ServiceSchemaCategoriesModule } from 'features/service-schema-categories/service-schema-categories.module';
import { ServiceSchemaModule } from 'features/service-schemas/service-schema.module';
import { ServicesModule } from 'features/services/services.module';
import { TemplatesModule } from 'features/templates/templates.module';
import { UsersModule } from 'features/users/users.module';
import { EmailModule } from 'integrations/email/email.module';
import { NotificationsModule } from 'integrations/notifications/notifications.module';
import { S3Module } from 'integrations/s3/s3.module';
import { StripeModule } from 'integrations/stripe/stripe.module';
import { JsonBodyMiddleware } from 'middleware/json-body.middleware';
import { RawBodyMiddleware } from 'middleware/raw-body.middleware';
import { MigrationsModule } from 'migrations/migrations.module';

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
    ServiceSchemaCategoriesModule,
    SearchModule,
    TemplatesModule,
    QRCodeModule,
    NotificationsModule,
    InstancesModule,
    ConfigurationModule,
    FeedbackModule,
    BroadcastModule,
    MigrationsModule,
    AutomationsModule,
    AiModule,
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
