import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import {
  DefaultBookingFieldType,
  PricingStrategyType,
  ServiceSchemaContentSectionDto,
  ServiceSchemaCategoryDto,
  ServiceSchemaDto,
  ServiceSchemaFieldDto,
  AdditionalBookingField,
  InstanceDto,
} from 'dtos';
import { ServiceSchemaCategory } from 'schemas/service-schema-category.schema';
import { Instance } from 'decorators/instance.decorator';

@Schema({ collection: 'service_schemas' })
export class ServiceSchema implements ServiceSchemaDto {
  _id: string;

  @Prop()
  name: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: ServiceSchemaCategory.name,
  })
  schemaCategory: ServiceSchemaCategoryDto | null;

  @Prop({ type: Array })
  defaultBookingFields: DefaultBookingFieldType[];

  @Prop({ type: Array })
  additionalBookingFields: AdditionalBookingField[];

  @Prop()
  pricingStrategy: PricingStrategyType;

  @Prop()
  shouldPayNow: boolean;

  @Prop({ type: Array })
  fields: ServiceSchemaFieldDto[];

  @Prop({ type: Array })
  contentSections: ServiceSchemaContentSectionDto[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Instance.name })
  instance?: InstanceDto;
}

export const ServiceSchemaSchema = SchemaFactory.createForClass(ServiceSchema);
