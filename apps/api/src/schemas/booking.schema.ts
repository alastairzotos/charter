import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AdditionalBookingFieldContent,
  BookingDto,
  BookingPaymentStatus,
  BookingPriceDetails,
  BookingStatus,
  InstanceDto,
  OperatorDto,
} from 'dtos';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Instance } from 'schemas/instance.schema';

import { Operator } from 'schemas/operator.schema';
import { Service } from 'schemas/service.schema';

export type BookingDocument = Booking & Document;

@Schema({ collection: 'bookings' })
export class Booking implements BookingDto {
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Service.name })
  service: Service;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Operator.name })
  operator: OperatorDto;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Instance.name })
  instance: InstanceDto;

  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  date?: string;

  @Prop()
  time?: string;

  @Prop()
  numberOfPeople?: number;

  @Prop({ type: Object })
  priceDetails: BookingPriceDetails;

  @Prop({ type: Date })
  bookingDate?: Date;

  @Prop({ type: Object })
  additionalFields?: Record<string, AdditionalBookingFieldContent>;

  @Prop()
  notes?: string;

  @Prop()
  paymentIntentId?: string;

  @Prop()
  setupIntentId?: string;

  @Prop()
  stripeCustomerId?: string;

  @Prop()
  paymentStatus: BookingPaymentStatus;

  @Prop(String)
  status: BookingStatus;

  @Prop()
  fulfilled: boolean;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
