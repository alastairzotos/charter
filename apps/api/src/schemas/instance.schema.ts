import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { InstanceDto, LoggedInUserDetails } from 'dtos';

@Schema({ collection: 'instances' })
export class Instance implements InstanceDto {
  _id: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  url: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  admins: LoggedInUserDetails[];
}

export const InstanceSchema = SchemaFactory.createForClass(Instance);
