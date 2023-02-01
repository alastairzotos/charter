import { Module } from '@nestjs/common';

import { EnvModule } from 'environment/environment.module';
import { ImagesController } from 'features/images/images.controller';
import { ImagesService } from 'features/images/images.service';
import { S3Module } from 'integrations/s3/s3.module';

@Module({
  imports: [S3Module, EnvModule],
  providers: [ImagesService],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
