import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultBookingFieldType, PricingStrategyType, ServiceSchemaDto, ServiceSchemaFieldDto } from 'dtos';

@Schema({ collection: 'service_schemas' })
export class ServiceSchema implements ServiceSchemaDto {
  _id: string;

  @Prop()
  label: string;

  @Prop()
  pluralLabel: string;

  @Prop()
  description: string;

  @Prop({ type: Array })
  defaultBookingFields: DefaultBookingFieldType[];

  @Prop()
  pricingStrategy: PricingStrategyType;

  @Prop()
  shouldPayNow: boolean;

  @Prop({ type: Array })
  fields: ServiceSchemaFieldDto[];
}

export const ServiceSchemaSchema = SchemaFactory.createForClass(ServiceSchema);
