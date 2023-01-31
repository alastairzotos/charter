import { Module } from '@nestjs/common';

import { EnvModule } from 'src/environment/environment.module';
import { S3Service } from 'src/integrations/s3/s3.service';

@Module({
  imports: [EnvModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
