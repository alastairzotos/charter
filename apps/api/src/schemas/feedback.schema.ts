import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { FeedbackDto, InstanceDto } from 'dtos';
import { Instance } from 'schemas/instance.schema';

@Schema({ collection: 'feedback' })
export class Feedback implements FeedbackDto {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  text: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Instance.name })
  instance?: InstanceDto;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
