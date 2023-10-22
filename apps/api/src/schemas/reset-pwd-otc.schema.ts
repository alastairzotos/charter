import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ResetPwdOtc } from 'dtos';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'schemas/user.schema';

@Schema({ collection: 'reset-pwd-otcs' })
export class ResetPasswordOtc implements ResetPwdOtc {
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ select: false })
  hashedCode: string;

  @Prop()
  expires: number;
}

export const ResetPasswordOtcSchema =
  SchemaFactory.createForClass(ResetPasswordOtc);
