import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'src/environment/environment.module';
import { EnvService } from 'src/environment/environment.service';
import { BookingsModule } from 'src/features/bookings/bookings.module';
import { HealthModule } from 'src/features/health/health.module';
import { ImagesModule } from 'src/features/images/images.module';
import { OperatorsModule } from 'src/features/operators/operators.module';
import { TripsModule } from 'src/features/trips/trips.module';
import { UsersModule } from 'src/features/users/users.module';
import { EmailModule } from 'src/integrations/email/email.module';
import { S3Module } from 'src/integrations/s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvModule,
    HealthModule,
    UsersModule,
    OperatorsModule,
    TripsModule,
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
