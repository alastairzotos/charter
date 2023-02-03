import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'environment/environment.module';
import { OperatorsController } from 'features/operators/operators.controller';
import { OperatorsRepository } from 'features/operators/operators.repository';
import { OperatorsService } from 'features/operators/operators.service';
import { ServicesModule } from 'features/services/services.module';
import { UsersModule } from 'features/users/users.module';
import { Operator, OperatorSchema } from 'schemas/operator.schema';

@Module({
  imports: [
    UsersModule,
    EnvModule,
    ServicesModule,
    MongooseModule.forFeature([
      { name: Operator.name, schema: OperatorSchema },
    ]),
  ],
  controllers: [OperatorsController],
  providers: [OperatorsService, OperatorsRepository],
  exports: [OperatorsService],
})
export class OperatorsModule {}
