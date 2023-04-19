import { Injectable } from "@nestjs/common";
import { BookingDto } from "dtos";
import { Expo, ExpoPushTicket } from "expo-server-sdk";

interface NotifyBookingProps {
  token: string,
  booking: BookingDto,
  onRevoke: () => Promise<void>,
}

@Injectable()
export class NotificationsService {
  private expo: Expo;

  constructor() {
    this.expo = new Expo();
  }

  async notifyOperatorOfBooking({
    token,
    booking,
    onRevoke,
  }: NotifyBookingProps) {
    if (!!token) {
      const chunks = this.expo.chunkPushNotifications([
        {
          to: token,
          body: `You have a new booking`,
          data: {
            screen: 'booking',
            params: { bookingId: booking._id.toString() }
          }
        }
      ]);

      const tickets: ExpoPushTicket[] = [];

      for (const chunk of chunks) {
        try {
          const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }

      let response = "";

      for (const ticket of tickets) {
        if (ticket.status === "error") {
          if (ticket.details && ticket.details.error === "DeviceNotRegistered") {
            response = "DeviceNotRegistered";
          }
        }

        if (ticket.status === "ok") {
          response = ticket.id;
        }
      }

      if (response === "DeviceNotRegistered") {
        await onRevoke();
      }

      return response;
    }
  }
}
