import { TripDto } from 'dtos';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Operator } from './operator.schema';

export type TripDocument = Trip & Document;

@Schema({ collection: 'trips' })
export class Trip implements TripDto {
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Operator.name })
  operator: Operator;
  
  @Prop()
  name: string;

  @Prop()
  duration: string;

  @Prop()
  startLocation: string;

  @Prop()
  startTime: string;

  @Prop()
  description: string;

  @Prop([String])
  photos: string[];

  @Prop()
  adultPrice: number;

  @Prop()
  childPrice: number;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
