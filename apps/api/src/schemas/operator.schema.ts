import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { LoggedInUserDetails, OperatorDto } from 'dtos';
import { Document } from 'mongoose';
import { User } from 'schemas/user.schema';
import { OpeningTimesDto } from 'dtos';

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
  openingTimes: OpeningTimesDto;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  owner?: LoggedInUserDetails;

  @Prop({ select: false })
  notificationsToken?: string;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
