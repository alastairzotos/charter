import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsModule } from './features/bookings/bookings.module';
import { EmailModule } from './features/email/email.module';
import { EnvModule } from './features/environment/environment.module';
import { EnvService } from './features/environment/environment.service';
import { HealthModule } from './features/health/health.module';
import { ImagesModule } from './features/images/images.module';
import { OperatorsModule } from './features/operators/operators.module';
import { TripsModule } from './features/trips/trips.module';
import { UsersModule } from './features/users/users.module';
import { S3Module } from './integrations/s3/s3.module';

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
        uri: envService.get().dbConnectionString
      }),
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
