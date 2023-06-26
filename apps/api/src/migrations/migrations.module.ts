import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MigrationsService } from 'migrations/migrations.service';
import { Booking, BookingSchema } from 'schemas/booking.schema';
import {
  Configuration,
  ConfigurationSchema,
} from 'schemas/configuration.schema';
import { Feedback, FeedbackSchema } from 'schemas/feedback.schema';
import { Instance, InstanceSchema } from 'schemas/instance.schema';
import { Operator, OperatorSchema } from 'schemas/operator.schema';
import {
  ServiceSchemaCategory,
  ServiceSchemaCategorySchema,
} from 'schemas/service-schema-category.schema';
import {
  ServiceSchema as ServiceSchemaModel,
  ServiceSchemaSchema,
} from 'schemas/service-schema.schema';
import { Service, ServiceSchema } from 'schemas/service.schema';
import { User, UserSchema } from 'schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Configuration.name, schema: ConfigurationSchema },
      { name: Feedback.name, schema: FeedbackSchema },
      { name: Instance.name, schema: InstanceSchema },
      { name: Operator.name, schema: OperatorSchema },
      { name: ServiceSchemaCategory.name, schema: ServiceSchemaCategorySchema },
      { name: ServiceSchemaModel.name, schema: ServiceSchemaSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [MigrationsService],
  exports: [MigrationsService],
})
export class MigrationsModule {}
