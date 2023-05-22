import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { InstanceDto, ServiceSchemaCategoryDto } from 'dtos';
import { Instance } from 'decorators/instance.decorator';

@Schema({ collection: 'service-schema-categories' })
export class ServiceSchemaCategory implements ServiceSchemaCategoryDto {
  _id: string;

  @Prop({ trim: true })
  name: string;

  @Prop()
  pluralName: string;

  @Prop()
  description: string;

  @Prop()
  photo: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Instance.name })
  instance?: InstanceDto;
}

export const ServiceSchemaCategorySchema = SchemaFactory.createForClass(
  ServiceSchemaCategory,
);
