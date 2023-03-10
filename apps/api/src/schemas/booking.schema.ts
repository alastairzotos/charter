import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BookingDto, BookingPaymentStatus, BookingPriceDetails, BookingStatus, OperatorDto } from 'dtos';
import { Document, Schema as MongooseSchema } from 'mongoose';

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

  @Prop()
  name: string;

  @Prop()
  email: string;

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

  @Prop()
  notes?: string;

  @Prop()
  paymentIntentId?: string;

  @Prop()
  paymentStatus: BookingPaymentStatus;

  @Prop(String)
  status: BookingStatus;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
