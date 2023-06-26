import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EnvModule } from 'environment/environment.module';

import { AutomationService } from 'features/automation/automation.service';
import { BookingsModule } from 'features/bookings/bookings.module';
import { BroadcastModule } from 'features/broadcast/broadcast.module';
import { InstancesModule } from 'features/instances/instances.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EnvModule,
    InstancesModule,
    BookingsModule,
    BroadcastModule,
  ],
  exports: [AutomationService],
  providers: [AutomationService],
})
export class AutomationsModule {}
