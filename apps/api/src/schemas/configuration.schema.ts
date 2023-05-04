import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ConfigurationDto, defaultConfiguration } from 'dtos';

@Schema({ collection: 'configuration' })
export class Configuration implements ConfigurationDto {
  _id: string;

  @Prop({ default: defaultConfiguration.googleLogin })
  googleLogin: boolean;

  @Prop({ default: defaultConfiguration.facebookLogin })
  facebookLogin: boolean;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
