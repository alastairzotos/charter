import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'schemas/booking.schema';
import { Configuration } from 'schemas/configuration.schema';
import { Feedback } from 'schemas/feedback.schema';
import { Instance } from 'schemas/instance.schema';
import { Operator } from 'schemas/operator.schema';
import { ServiceSchemaCategory } from 'schemas/service-schema-category.schema';
import { ServiceSchema } from 'schemas/service-schema.schema';
import { Service } from 'schemas/service.schema';
import { User } from 'schemas/user.schema';

@Injectable()
export class MigrationsService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(Configuration.name)
    private readonly configurationModel: Model<Configuration>,
    @InjectModel(Feedback.name) private readonly feedbackModel: Model<Feedback>,
    @InjectModel(Instance.name) private readonly instanceModel: Model<Instance>,
    @InjectModel(Operator.name) private readonly operatorModel: Model<Operator>,
    @InjectModel(ServiceSchemaCategory.name)
    private readonly serviceSchemaCategoryModel: Model<ServiceSchemaCategory>,
    @InjectModel(ServiceSchema.name)
    private readonly serviceSchemaModel: Model<ServiceSchema>,
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
}
