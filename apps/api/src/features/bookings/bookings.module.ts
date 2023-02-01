import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'environment/environment.module';
import { BookingsController } from 'features/bookings/bookings.controller';
import { BookingsRepository } from 'features/bookings/bookings.repository';
import { BookingsService } from 'features/bookings/bookings.service';
import { OperatorsModule } from 'features/operators/operators.module';
import { TripsModule } from 'features/trips/trips.module';
import { UsersModule } from 'features/users/users.module';
import { EmailModule } from 'integrations/email/email.module';
import { Booking, BookingSchema } from 'schemas/booking.schema';
import { Operator, OperatorSchema } from 'schemas/operator.schema';
import { Trip, TripSchema } from 'schemas/trip.schema';

@Module({
  imports: [
    EnvModule,
    OperatorsModule,
    TripsModule,
    UsersModule,
    EmailModule,
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Operator.name, schema: OperatorSchema },
      { name: Trip.name, schema: TripSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository],
  exports: [BookingsService],
})
export class BookingsModule {}
