import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { InstanceDto, LoggedInUserDetails, UserRole } from 'dtos';
import { Document } from 'mongoose';
import { Instance } from 'schemas/instance.schema';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User implements LoggedInUserDetails {
  _id: string;

  @Prop({ trim: true })
  email: string;

  @Prop({ select: false })
  hashedPassword: string;

  @Prop({ trim: true })
  givenName: string;

  @Prop()
  role: UserRole;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Instance.name })
  instance?: InstanceDto;
}

export const UserSchema = SchemaFactory.createForClass(User);
