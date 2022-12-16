import { Module } from '@nestjs/common';
import { EnvService } from './environment.service';

@Module({
  exports: [EnvService],
  providers: [EnvService]
})
export class EnvModule {}
