import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OpeningTimesDto, ServiceDto, ServiceFieldValue, ServicePricingDto, ServiceSchemaDto } from 'dtos';
import { Schema as MongooseSchema } from 'mongoose';

import { Operator } from 'schemas/operator.schema';
import { ServiceSchema as ServiceSchemaSchema } from 'schemas/service-schema.schema';

@Schema({ collection: 'services' })
export class Service implements ServiceDto {
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Operator.name })
  operator: Operator;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: ServiceSchemaSchema.name })
  serviceSchema: ServiceSchemaDto;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  content: Record<string, string | string[]>;

  @Prop({ type: Object })
  price: ServicePricingDto;

  @Prop({ type: Number })
  maxPeople: number | null;

  @Prop({ type: Number })
  minPeople: number | null;

  @Prop({ type: Array })
  photos: string[];

  @Prop({ type: Object })
  data: Record<string, ServiceFieldValue>;

  @Prop()
  numberOfBookings: number;

  @Prop()
  hidden: boolean;

  @Prop()
  approveBookingBeforePayment: boolean;

  @Prop({ type: Object })
  openingTimes: OpeningTimesDto;

  @Prop()
  hasCutoffDays?: boolean;

  @Prop()
  cutoffDays?: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
