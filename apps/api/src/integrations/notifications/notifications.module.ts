import { Module } from "@nestjs/common";
import { NotificationsService } from "integrations/notifications/notifications.service";

@Module({
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
