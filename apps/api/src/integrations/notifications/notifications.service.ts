import { Injectable } from '@nestjs/common';
import { BookingDto } from 'dtos';
import { Expo, ExpoPushReceipt, ExpoPushTicket } from 'expo-server-sdk';
import { backOff } from 'exponential-backoff';

interface NotifyBookingProps {
  token: string;
  booking: BookingDto;
  onRevoke: () => Promise<void>;
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
            screen: 'newBooking',
            params: { bookingId: booking._id.toString() },
          },
        },
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

      let response = '';

      for (const ticket of tickets) {
        if (ticket.status === 'error') {
          if (
            ticket.details &&
            ticket.details.error === 'DeviceNotRegistered'
          ) {
            response = 'DeviceNotRegistered';
          }
        }

        if (ticket.status === 'ok') {
          response = ticket.id;
        }
      }

      if (response === 'DeviceNotRegistered') {
        await onRevoke();
      } else {
        await this.handleReceipt(response, onRevoke);
      }

      return response;
    }
  }

  private async handleReceipt(ticketId: string, onRevoke: () => Promise<void>) {
    try {
      const receipt = await backOff(
        async () => await this.getReceipt(ticketId),
        {
          delayFirstAttempt: true,
          startingDelay: 1000,
          timeMultiple: 2,
          numOfAttempts: 10,
          maxDelay: 5 * 1000,
        },
      );

      if (
        receipt &&
        receipt.status === 'error' &&
        receipt.details &&
        receipt.details.error === 'DeviceNotRegistered'
      ) {
        onRevoke();
      }
    } catch (e) {
      console.log(e);
    }
  }

  private async getReceipt(ticketId: string) {
    let receiptIdChunks = this.expo.chunkPushNotificationReceiptIds([ticketId]);

    let receipt: { [id: string]: ExpoPushReceipt };

    for (const chunk of receiptIdChunks) {
      try {
        receipt = await this.expo.getPushNotificationReceiptsAsync(chunk);
      } catch (e) {
        console.error(e);
      }
    }

    if (!receipt) {
      throw new Error('no receipt');
    }

    return receipt[ticketId];
  }
}
