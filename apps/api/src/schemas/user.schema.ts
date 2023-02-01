import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LoggedInUserDetails, UserRole } from 'dtos';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User implements LoggedInUserDetails {
  _id: string;

  @Prop()
  email: string;

  @Prop({ select: false })
  hashedPassword: string;

  @Prop()
  givenName: string;

  @Prop()
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
