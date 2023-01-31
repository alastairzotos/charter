import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'src/environment/environment.module';
import { OperatorsModule } from 'src/features/operators/operators.module';
import { TripsController } from 'src/features/trips/trips.controller';
import { TripsRepository } from 'src/features/trips/trips.repository';
import { TripsService } from 'src/features/trips/trips.service';
import { UsersModule } from 'src/features/users/users.module';
import { Trip, TripSchema } from 'src/schemas/trip.schema';

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
