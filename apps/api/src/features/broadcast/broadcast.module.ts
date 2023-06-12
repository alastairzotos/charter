import { Module } from '@nestjs/common';
import { BroadcastService } from 'features/broadcast/broadcast.service';
import { OperatorsModule } from 'features/operators/operators.module';
import { TemplatesModule } from 'features/templates/templates.module';
import { UsersModule } from 'features/users/users.module';
import { EmailModule } from 'integrations/email/email.module';
import { NotificationsModule } from 'integrations/notifications/notifications.module';

@Module({
  imports: [
    NotificationsModule,
    EmailModule,
    TemplatesModule,
    OperatorsModule,
    UsersModule,
  ],
  providers: [BroadcastService],
  exports: [BroadcastService],
})
export class BroadcastModule {}
