import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OperatorDto } from 'dtos';

export type OperatorDocument = Operator & Document;

@Schema({ collection: 'operators' })
export class Operator implements OperatorDto {
  _id: string;

  @Prop()
  name: string;
  
  @Prop()
  email: string

  @Prop()
  phoneNumber: string;

  @Prop()
  address: string;

  @Prop()
  photo: string;

  @Prop()
  description: string;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
