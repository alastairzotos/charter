import { Module } from '@nestjs/common';

import { HealthController } from 'src/features/health/health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
