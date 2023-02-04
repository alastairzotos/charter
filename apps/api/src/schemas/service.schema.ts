import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ServiceDto, ServiceFieldValue, ServicePricingDto, ServiceType } from 'dtos';
import { Schema as MongooseSchema } from 'mongoose';

import { Operator } from 'schemas/operator.schema';

@Schema({ collection: 'services' })
export class Service implements ServiceDto {
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Operator.name })
  operator: Operator;

  @Prop()
  type: ServiceType;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  price: ServicePricingDto;

  @Prop({ type: Number })
  maxPeople?: number;

  @Prop({ type: Number })
  minPeople?: number;

  @Prop({ type: Array })
  photos: string[];

  @Prop({ type: Object })
  data: Record<string, ServiceFieldValue>;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
