import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ServiceSchemaCategoryDto } from "dtos";

@Schema({ collection: 'service-schema-categories' })
export class ServiceSchemaCategory implements ServiceSchemaCategoryDto {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  pluralName: string;

  @Prop()
  photo: string;
}

export const ServiceSchemaCategorySchema = SchemaFactory.createForClass(ServiceSchemaCategory);
