import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from 'environment/environment.module';
import { ConfigurationController } from 'features/configuration/configuration.controller';
import { ConfigurationRepository } from 'features/configuration/configuration.repository';
import { ConfigurationService } from 'features/configuration/configuration.service';
import { UsersModule } from 'features/users/users.module';
import {
  Configuration,
  ConfigurationSchema,
} from 'schemas/configuration.schema';

@Module({
  imports: [
    EnvModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: Configuration.name, schema: ConfigurationSchema },
    ]),
  ],
  controllers: [ConfigurationController],
  providers: [ConfigurationService, ConfigurationRepository],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
