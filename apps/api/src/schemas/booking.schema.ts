import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BookingDto, BookingStatus, OperatorDto } from 'dtos';
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
  date: string;

  @Prop()
  adultGuests: number;

  @Prop()
  childGuests: number;

  @Prop(String)
  status: BookingStatus;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
