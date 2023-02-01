import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'environment/environment.module';
import { OperatorsModule } from 'features/operators/operators.module';
import { TripsController } from 'features/trips/trips.controller';
import { TripsRepository } from 'features/trips/trips.repository';
import { TripsService } from 'features/trips/trips.service';
import { UsersModule } from 'features/users/users.module';
import { Trip, TripSchema } from 'schemas/trip.schema';

@Module({
  imports: [
    UsersModule,
    EnvModule,
    forwardRef(() => OperatorsModule),
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  controllers: [TripsController],
  providers: [TripsService, TripsRepository],
  exports: [TripsService],
})
export class TripsModule {}
