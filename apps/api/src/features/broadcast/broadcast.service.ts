import { Injectable } from '@nestjs/common';
import { BookingDto } from 'dtos';
import { OperatorsService } from 'features/operators/operators.service';
import { TemplatesService } from 'features/templates/templates.service';
import { UsersService } from 'features/users/users.service';
import { EmailService } from 'integrations/email/email.service';
import { NotificationsService } from 'integrations/notifications/notifications.service';

@Injectable()
export class BroadcastService {
  constructor(
    private readonly operatorsService: OperatorsService,
    private readonly templatesService: TemplatesService,
    private readonly emailService: EmailService,
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  async broadcastPendingBooking(booking: BookingDto) {
    await Promise.all([
      this.emailService.sendEmail(
        booking.email,
        this.templatesService.bookingMadeUserPending(booking),
      ),
      this.emailService.sendEmailToOperator(
        booking.operator,
        this.templatesService.bookingMadeOperatorActionRequired(booking),
      ),

      this.sendPushNotificationToOperatorForBooking(booking),
    ]);
  }

  async broadcastPendingBookingReminder(booking: BookingDto) {
    await this.emailService.sendEmailToOperator(
      booking.operator,
      this.templatesService.pendingBookingReminder(booking),
    );
  }

  async broadcastExpiredBooking(booking: BookingDto) {
    await Promise.all([
      this.emailService.sendEmail(
        booking.email,
        this.templatesService.bookingExpiredUser(booking),
      ),
      this.emailService.sendEmailToOperator(
        booking.operator,
        this.templatesService.bookingExpiredOperator(booking),
      ),
    ]);
  }

  async broadcastSuccessfulBooking(booking: BookingDto) {
    // Only notify operator if it's a direct booking with no approval needed. They already know about it otherwise
    if (!booking.service.approveBookingBeforePayment) {
      await Promise.all([
        this.emailService.sendEmailToOperator(
          booking.operator,
          this.templatesService.bookingMadeOperator(booking),
        ),
        this.sendPushNotificationToOperatorForBooking(booking),
      ]);
    }

    // User
    await this.emailService.sendEmail(
      booking.email,
      this.templatesService.bookingConfirmedUser(booking),
    );

    // Admins
    const admins = await this.usersService.getAdmins(
      booking.instance._id.toString(),
    );

    await Promise.all(
      admins.map((admin) =>
        this.emailService.sendEmail(
          admin.email,
          this.templatesService.bookingMadeAdmin(booking),
        ),
      ),
    );
  }

  async broadcastRejectedBooking(booking: BookingDto) {
    await this.emailService.sendEmail(
      booking.email,
      this.templatesService.bookingRejectedUser(booking),
    );
  }

  async broadcastFailedPayment(booking: BookingDto) {
    console.log('failed');
  }

  async broadcastCancelledPayment(booking: BookingDto) {
    console.log('cancelled');
  }

  async sendPushNotificationToOperatorForBooking(booking: BookingDto) {
    const token = await this.operatorsService.getOperatorNotificationToken(
      booking.operator._id,
    );

    this.notificationsService.notifyOperatorOfBooking({
      token,
      booking,
      onRevoke: async () =>
        await this.operatorsService.revokeNotificationToken(
          booking.operator._id,
        ),
    });
  }
}
