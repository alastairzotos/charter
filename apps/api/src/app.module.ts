import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'environment/environment.module';
import { EnvService } from 'environment/environment.service';
import { BookingsModule } from 'features/bookings/bookings.module';
import { HealthModule } from 'features/health/health.module';
import { ImagesModule } from 'features/images/images.module';
import { OperatorsModule } from 'features/operators/operators.module';
import { ServicesModule } from 'features/services/services.module';
import { UsersModule } from 'features/users/users.module';
import { EmailModule } from 'integrations/email/email.module';
import { S3Module } from 'integrations/s3/s3.module';

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
export class AppModule {}
