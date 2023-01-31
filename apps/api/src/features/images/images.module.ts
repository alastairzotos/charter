import { Module } from '@nestjs/common';

import { EnvModule } from 'src/environment/environment.module';
import { ImagesController } from 'src/features/images/images.controller';
import { ImagesService } from 'src/features/images/images.service';
import { S3Module } from 'src/integrations/s3/s3.module';

@Module({
  imports: [S3Module, EnvModule],
  providers: [ImagesService],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
