import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'environment/environment.module';
import { BookingsModule } from 'features/bookings/bookings.module';
import { OperatorsModule } from 'features/operators/operators.module';
import { ServiceSchemaCategoriesModule } from 'features/service-schema-categories/service-schema-categories.module';
import { ServiceSchemaModule } from 'features/service-schemas/service-schema.module';
import { ServicesController } from 'features/services/services.controller';
import { ServicesRepository } from 'features/services/services.repository';
import { ServicesService } from 'features/services/services.service';
import { UsersModule } from 'features/users/users.module';
import { Service, ServiceSchema } from 'schemas/service.schema';

@Module({
  imports: [
    UsersModule,
    EnvModule,
    forwardRef(() => ServiceSchemaModule),
    forwardRef(() => OperatorsModule),
    forwardRef(() => ServiceSchemaCategoriesModule),
    forwardRef(() => BookingsModule),
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository],
  exports: [ServicesService],
})
export class ServicesModule {}
