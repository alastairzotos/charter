import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'src/environment/environment.module';
import { BookingsController } from 'src/features/bookings/bookings.controller';
import { BookingsRepository } from 'src/features/bookings/bookings.repository';
import { BookingsService } from 'src/features/bookings/bookings.service';
import { OperatorsModule } from 'src/features/operators/operators.module';
import { TripsModule } from 'src/features/trips/trips.module';
import { UsersModule } from 'src/features/users/users.module';
import { EmailModule } from 'src/integrations/email/email.module';
import { Booking, BookingSchema } from 'src/schemas/booking.schema';
import { Operator, OperatorSchema } from 'src/schemas/operator.schema';
import { Trip, TripSchema } from 'src/schemas/trip.schema';

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
