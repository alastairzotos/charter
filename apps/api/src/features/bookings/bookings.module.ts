import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'environment/environment.module';
import { BookingsController } from 'features/bookings/bookings.controller';
import { BookingsRepository } from 'features/bookings/bookings.repository';
import { BookingsService } from 'features/bookings/bookings.service';
import { OperatorsModule } from 'features/operators/operators.module';
import { ServicesModule } from 'features/services/services.module';
import { UsersModule } from 'features/users/users.module';
import { EmailModule } from 'integrations/email/email.module';
import { Booking, BookingSchema } from 'schemas/booking.schema';
import { Operator, OperatorSchema } from 'schemas/operator.schema';
import { Service, ServiceSchema } from 'schemas/service.schema';

@Module({
  imports: [
    EnvModule,
    OperatorsModule,
    ServicesModule,
    UsersModule,
    EmailModule,
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Operator.name, schema: OperatorSchema },
      { name: Service.name, schema: ServiceSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository],
  exports: [BookingsService],
})
export class BookingsModule {}
