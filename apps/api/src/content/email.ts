import { BookingDto } from "dtos";
import * as dedent from 'dedent';
import { paramCase } from 'change-case';
import { EnvService } from "../environment/environment.service";

export interface EmailData {
  subject: string;
  content: string;
}

export const emailContent = (env: EnvService) => ({
  bookingMadeOperator: (booking: BookingDto): EmailData => ({
    subject: `New booking for ${booking.trip.name} on ${booking.date}`,
    content: dedent`
      <h3>Hello ${booking.operator.name}</h3>
      <p>You have a new booking for <strong>${booking.trip.name}</strong> on <strong>${booking.date}</strong></p>
      <p>Here are the details:</p>
      <ul>
        <li><strong>Name of guest</strong>: ${booking.name}</li>
        <li><strong>Guest email</strong>: ${booking.email}</li>
        <li><strong>Number of guests</strong>: ${booking.guests}</li>
        <li><strong>Date</strong>: ${booking.date}</li>
      </ul>

      <a href="${env.get().frontendUrl}/operator-admin/booking/${booking._id}">Click here to confirm the booking</a>
    `,
  }),

  bookingMadeUser: (booking: BookingDto): EmailData => ({
    subject: `Your booking with ${booking.operator.name}`,
    content: dedent`
      <h3>Hello ${booking.name}!</h3>
      <p>Your booking has been successfully made with
        <a href="${env.get().frontendUrl}/operator/${paramCase(booking.operator.name)}-${booking.operator._id}">${booking.operator.name}</a>
        for
        <a href="${env.get().frontendUrl}/trip/${booking.trip._id}">${booking.trip.name}</a>
      </p>
      <p>You can view <a href="${env.get().frontendUrl}/booking/${booking._id}">this page</a> to see status updates about your booking, but don't worry, we'll email you as soon as the operator confirms or rejects your booking!</p>
    `
  }),

  bookingConfirmedUser: (booking: BookingDto): EmailData => ({
    subject: `Your booking for ${booking.trip.name} as been confirmed!`,
    content: `
      <p>Get ready ${booking.name}, your booking for <a href="${env.get().frontendUrl}/trip/${booking.trip._id}">${booking.trip.name}</a> has been confirmed!</p>
      <p>You can view your booking details <a href="${env.get().frontendUrl}/booking/${booking._id}">on this page</a></p>
    `
  }),

  bookingRejectedUser: (booking: BookingDto): EmailData => ({
    subject: `Your booking for ${booking.trip.name} as been rejected`,
    content: `
      <p>Hello ${booking.name}</p>
      <p>Unfortunately the operstor has rejected your booking for <a href="${env.get().frontendUrl}/trip/${booking.trip._id}">${booking.trip.name}</a></p>
      <p>But don't worry, you can always visit <a href="${env.get().frontendUrl}">our website</a> to see many more trips that you can take!</p>
    `
  })
})
