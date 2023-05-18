import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { InstanceDto, LoggedInUserDetails, OperatorDto } from 'dtos';
import { Document } from 'mongoose';
import { User } from 'schemas/user.schema';
import { OpeningTimesDto } from 'dtos';
import { Instance } from 'schemas/instance.schema';

export type OperatorDocument = Operator & Document;

@Schema({ collection: 'operators' })
export class Operator implements OperatorDto {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  email: string;

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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Instance.name })
  instance?: InstanceDto;

  @Prop({ select: false })
  notificationsToken?: string;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
