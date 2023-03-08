import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Day, OperatorDto, OperatorOpeningHoursDto } from 'dtos';
import { Document } from 'mongoose';

export type OperatorDocument = Operator & Document;

@Schema({ collection: 'operators' })
export class Operator implements OperatorDto {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  address: string;

  @Prop()
  photo: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  openingTimes: Record<Day, OperatorOpeningHoursDto>;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
