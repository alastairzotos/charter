import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EnvModule } from "../environment/environment.module";
import { OperatorsModule } from "../operators/operators.module";
import { Booking, BookingSchema } from "../schemas/booking.schema";
import { Operator, OperatorSchema } from "../schemas/operator.schema";
import { Trip, TripSchema } from "../schemas/trip.schema";
import { TripsModule } from "../trips/trips.module";
import { UsersModule } from "../users/users.module";
import { BookingsController } from "./bookings.controller";
import { BookingsRepository } from "./bookings.repository";
import { BookingsService } from "./bookings.service";

@Module({
  imports: [
    EnvModule,
    OperatorsModule,
    TripsModule,
    UsersModule,
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
