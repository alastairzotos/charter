import * as dedent from 'dedent';
import { BookingDto } from 'dtos';
import { urls } from 'urls';
import { getReadableBookingDetails } from 'utils';

import { EnvService } from 'environment/environment.service';
import { EmailData } from 'integrations/email/email.models';

export const emailContent = (env: EnvService) => ({
  bookingMadeOperator: (booking: BookingDto): EmailData => {
    const bookingDetails = getReadableBookingDetails(booking);

    return {
      subject: `New booking for ${booking.service.name} on ${booking.date}`,
      content: dedent`
      <h3>Hello ${booking.operator.name}</h3>
      <p>You have a new booking for <strong>${booking.service.name
        }</strong> on <strong>${booking.date}</strong></p>
      <p>Here are the details:</p>
      <ul>
        ${
          Object.keys(bookingDetails)
            .map(key => (
              `<li><strong>${key}</strong>: ${bookingDetails[key]}</li>`
            ))
            .join('\n')
        }
      </ul>

      <a href="${env.get().frontendUrl}${urls.operators.booking(
          booking._id,
        )}">Click here to view the booking</a>
    `,
    }
  },

  bookingMadeOperatorActionRequired: (booking: BookingDto): EmailData => {
    const bookingDetails = getReadableBookingDetails(booking);

    return {
      subject: `[ACTION REQUIRED] A new booking for ${booking.service.name} on ${booking.date} is waiting for your response`,
      content: dedent`
      <h3>Hello ${booking.operator.name}</h3>
      <p>You have a new booking for <strong>${booking.service.name
        }</strong> on <strong>${booking.date}</strong></p>
      <p>Here are the details:</p>
      <ul>
        ${
          Object.keys(bookingDetails)
            .map(key => (
              `<li><strong>${key}</strong>: ${bookingDetails[key]}</li>`
            ))
            .join('\n')
        }
      </ul>

      <a href="${env.get().frontendUrl}${urls.operators.booking(
          booking._id,
        )}">Click here to approve or reject the booking</a>
    `,
    }
  },

  bookingMadeUserPending: (booking: BookingDto): EmailData => ({
    subject: `Your booking with ${booking.operator.name}`,
    content: dedent`
      <h3>Hello ${booking.name}!</h3>
      <p>Your booking has been made with
        <a href="${env.get().frontendUrl}${urls.user.operator(
      booking.operator,
    )}">${booking.operator.name}</a>
        for
        <a href="${env.get().frontendUrl}${urls.user.service(booking.service)}">${booking.service.name
      }</a>
      </p>
      <p>You will receive an email when the operator responds.</p>
      <p>Payment will only be taken if the operator approves your booking.</p>
      <p>You can view <a href="${env.get().frontendUrl}${urls.user.booking(
        booking._id,
      )}">this page</a> to view the booking</p>
    `,
  }),

  bookingConfirmedUser: (booking: BookingDto): EmailData => ({
    subject: `Your booking for ${booking.service.name} as been confirmed!`,
    content: `
      <p>Get ready ${booking.name}, your booking for <a href="${env.get().frontendUrl
      }${urls.user.service(booking.service)}">${booking.service.name
      }</a> has been confirmed!</p>
      <p>You can view your booking details <a href="${env.get().frontendUrl
      }${urls.user.booking(booking._id)}">on this page</a></p>
    `,
  }),

  bookingRejectedUser: (booking: BookingDto): EmailData => ({
    subject: `Your booking for ${booking.service.name} as been rejected`,
    content: `
      <p>Hello ${booking.name}</p>
      <p>Unfortunately the operstor has rejected your booking for <a href="${env.get().frontendUrl
      }${urls.user.service(booking.service)}">${booking.service.name}</a></p>
      <p>But don't worry, you can always visit <a href="${env.get().frontendUrl
      }">our website</a> to see many more services that you can book!</p>
    `,
  }),
});
