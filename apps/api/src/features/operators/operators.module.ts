import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'src/environment/environment.module';
import { OperatorsController } from 'src/features/operators/operators.controller';
import { OperatorsRepository } from 'src/features/operators/operators.repository';
import { OperatorsService } from 'src/features/operators/operators.service';
import { TripsModule } from 'src/features/trips/trips.module';
import { UsersModule } from 'src/features/users/users.module';
import { Operator, OperatorSchema } from 'src/schemas/operator.schema';

@Module({
  imports: [
    UsersModule,
    EnvModule,
    TripsModule,
    MongooseModule.forFeature([
      { name: Operator.name, schema: OperatorSchema },
    ]),
  ],
  controllers: [OperatorsController],
  providers: [OperatorsService, OperatorsRepository],
  exports: [OperatorsService],
})
export class OperatorsModule {}
