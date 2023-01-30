import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from "../../schemas/trip.schema";
import { EnvModule } from "../environment/environment.module";
import { OperatorsModule } from "../operators/operators.module";
import { UsersModule } from "../users/users.module";
import { TripsController } from "./trips.controller";
import { TripsRepository } from "./trips.repository";
import { TripsService } from "./trips.service";

@Module({
  imports: [
    UsersModule,
    EnvModule,
    forwardRef(() => OperatorsModule),
    MongooseModule.forFeature([
      { name: Trip.name, schema: TripSchema }
    ]),
  ],
  controllers: [TripsController],
  providers: [TripsService, TripsRepository],
  exports: [TripsService],
})
export class TripsModule {}
