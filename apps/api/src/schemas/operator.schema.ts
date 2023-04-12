import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Day, LoggedInUserDetails, OperatorDto, OperatorOpeningHoursDto } from 'dtos';
import { Document } from 'mongoose';
import { User } from 'schemas/user.schema';

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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  owner?: LoggedInUserDetails;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
