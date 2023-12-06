import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from 'environment/environment.module';
import { AiController } from 'features/ai/ai.controller';
import { AiRepository } from 'features/ai/ai.repository';
import { AiService } from 'features/ai/ai.service';
import { Service, ServiceSchema } from 'schemas/service.schema';

@Module({
  imports: [
    EnvModule,
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  controllers: [AiController],
  providers: [AiService, AiRepository],
  exports: [AiService, AiRepository],
})
export class AiModule {}
