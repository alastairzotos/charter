import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { InstanceDto } from 'dtos';

@Schema({ collection: 'instances' })
export class Instance implements InstanceDto {
  _id: string;

  @Prop()
  name: string;
}

export const InstanceSchema = SchemaFactory.createForClass(Instance);
