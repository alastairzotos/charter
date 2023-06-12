import handlebars from 'handlebars';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import * as juice from 'juice';

import { Injectable } from '@nestjs/common';
import {
  BookingConfirmedUserProps,
  BookingMadeAdminProps,
  BookingMadeOperatorActionRequiredProps,
  BookingMadeOperatorProps,
  BookingMadeUserPendingProps,
  BookingRejectedUserProps,
  FeedbackAddedProps,
  OperatorPromotedProps,
} from 'features/templates/templates.models';
import { BookingDto, FeedbackNoId, InstanceDto, OperatorDto } from 'dtos';
import { urls } from 'urls';
import { EmailData } from 'integrations/email/email.models';
import { getReadableBookingDetails } from 'utils';
import { QRCodeService } from 'features/qr-code/qr-code.service';
import { EnvService } from 'environment/environment.service';

@Injectable()
export class TemplatesService {
  private templatesPath = path.resolve(process.cwd(), 'templates');
  private styles = this.loadStyles();
  private templates = this.loadTemplates();

  constructor(
    private readonly envService: EnvService,
    private readonly qrCodeService: QRCodeService,
  ) {}

  bookingMadeUserPending(booking: BookingDto): EmailData {
    return {
      subject: `Your booking with ${booking.operator.name} is processing`,
      content: this.templates.bookingMadeUserPending({
        user: {
          name: booking.name,
        },
        operator: {
          name: booking.operator.name,
          url: this.link(
            booking.instance,
            urls.user.operator(booking.operator),
          ),
        },
        service: {
          name: booking.service.name,
          url: this.link(booking.instance, urls.user.service(booking.service)),
        },
        booking: {
          url: this.link(booking.instance, urls.user.booking(booking._id)),
        },
      }),
    };
  }

  bookingConfirmedUser(booking: BookingDto): EmailData {
    return {
      subject: `Your booking for ${booking.service.name} has been confirmed!`,
      content: this.templates.bookingConfirmedUser({
        user: {
          name: booking.name,
        },
        service: {
          name: booking.service.name,
          url: this.link(booking.instance, urls.user.service(booking.service)),
        },
        booking: {
          url: this.link(booking.instance, urls.user.booking(booking._id)),
          qrCodeUrl: this.qrCodeService.getUrlForBookingQRCode(booking),
          details: Object.entries(getReadableBookingDetails(booking)).map(
            ([key, value]) => ({ key, value }),
          ),
        },
        operator: {
          details: [
            { key: 'Operator', value: booking.operator.name },
            { key: 'Operator Email', value: booking.operator.email },
            { key: 'Operator Phone', value: booking.operator.phoneNumber },
          ],
        },
      }),
    };
  }

  bookingRejectedUser(booking: BookingDto): EmailData {
    return {
      subject: `Your booking for ${booking.service.name} has been rejected`,
      content: this.templates.bookingRejectedUser({
        user: {
          name: booking.name,
        },
        service: {
          name: booking.service.name,
          url: this.link(booking.instance, urls.user.service(booking.service)),
        },
        site: {
          url: this.link(booking.instance),
        },
      }),
    };
  }

  bookingMadeOperator(booking: BookingDto): EmailData {
    const bookingDetails = getReadableBookingDetails(booking);
    return {
      subject: `New booking for ${booking.service.name} on ${booking.date}`,
      content: this.templates.bookingMadeOperator({
        operator: {
          name: booking.operator.name,
        },
        service: {
          name: booking.service.name,
          url: this.link(booking.instance, urls.user.service(booking.service)),
        },
        booking: {
          date: booking.date,
          url: this.linkToManager(urls.operators.booking(booking._id)),
          details: Object.keys(bookingDetails).map((key) => ({
            key,
            value: bookingDetails[key],
          })),
        },
      }),
    };
  }

  bookingMadeOperatorActionRequired(booking: BookingDto): EmailData {
    const bookingDetails = getReadableBookingDetails(booking);
    return {
      subject: `[ACTION REQUIRED] A new booking for ${booking.service.name} on ${booking.date} is waiting for your response`,
      content: this.templates.bookingMadeOperatorActionRequired({
        operator: {
          name: booking.operator.name,
        },
        service: {
          name: booking.service.name,
          url: this.link(booking.instance, urls.user.service(booking.service)),
        },
        booking: {
          date: booking.date,
          url: this.linkToManager(urls.operators.booking(booking._id)),
          details: Object.keys(bookingDetails).map((key) => ({
            key,
            value: bookingDetails[key],
          })),
        },
      }),
    };
  }

  operatorPromoted(operator: OperatorDto): EmailData {
    return {
      subject: `[ACTION REQUIRED] You have been made an operator on ${operator.instance.name}`,
      content: this.templates.operatorPromoted({
        operator: {
          name: operator.owner.givenName,
        },
        site: {
          name: operator.instance.name,
          url: operator.instance.url,
          resetPasswordUrl: this.linkToManager(
            `/reset-password?email=${encodeURIComponent(
              operator.owner.email,
            )}&defaultPassword=1`,
          ),
        },
        app: {
          url: '',
        },
      }),
    };
  }

  bookingMadeAdmin(booking: BookingDto): EmailData {
    const bookingDetails = getReadableBookingDetails(booking);
    return {
      subject: `New booking for ${booking.service.name} on ${booking.date}`,
      content: this.templates.bookingMadeAdmin({
        operator: {
          name: booking.operator.name,
          url: this.link(
            booking.instance,
            urls.user.operator(booking.operator),
          ),
        },
        service: {
          name: booking.service.name,
          url: this.link(booking.instance, urls.user.service(booking.service)),
        },
        booking: {
          date: booking.date,
          details: Object.keys(bookingDetails).map((key) => ({
            key,
            value: bookingDetails[key],
          })),
        },
      }),
    };
  }

  feedbackAdded({ name, email, text }: FeedbackNoId): EmailData {
    return {
      subject: '[FEEDBACK ADDED] You have Charter feedback',
      content: this.templates.feedbackAdded({ name, email, text }),
    };
  }

  private loadTemplates() {
    this.loadPartials();

    return {
      bookingMadeUserPending: this.compileTemplate<BookingMadeUserPendingProps>(
        'booking-made-user-pending',
      ),
      bookingConfirmedUser: this.compileTemplate<BookingConfirmedUserProps>(
        'booking-confirmed-user',
      ),
      bookingRejectedUser: this.compileTemplate<BookingRejectedUserProps>(
        'booking-rejected-user',
      ),
      bookingMadeOperator: this.compileTemplate<BookingMadeOperatorProps>(
        'booking-made-operator',
      ),
      bookingMadeOperatorActionRequired:
        this.compileTemplate<BookingMadeOperatorActionRequiredProps>(
          'booking-made-operator-action-required',
        ),
      operatorPromoted:
        this.compileTemplate<OperatorPromotedProps>('operator-promoted'),
      bookingMadeAdmin:
        this.compileTemplate<BookingMadeAdminProps>('booking-made-admin'),
      feedbackAdded: this.compileTemplate<FeedbackAddedProps>('feedback-added'),
    };
  }

  private loadPartials() {
    const partialsPath = path.resolve(this.templatesPath, 'partials');
    const partials = fsExtra.readdirSync(partialsPath);

    for (const partial of partials) {
      const content = fs.readFileSync(
        path.resolve(partialsPath, partial),
        'utf-8',
      );

      handlebars.registerPartial(partial.split('.')[0], () => content);
    }
  }

  private compileTemplate<T>(name: string) {
    return handlebars.compile<T>(this.readTemplateAndResolveStyles(name));
  }

  private readTemplateAndResolveStyles(name: string) {
    return juice(`
      <html>
      <head>
      <style>
        ${this.styles}
      </style>
      </head>
      <body>
        ${fs.readFileSync(
          path.resolve(this.templatesPath, `${name}.handlebars`),
          'utf-8',
        )}
      </body>
      </html>
    `);
  }

  private loadStyles() {
    return fs.readFileSync(
      path.resolve(this.templatesPath, 'styles.css'),
      'utf-8',
    );
  }

  private link(instance: InstanceDto, path?: string) {
    return `${instance.url}${path}`;
  }

  private linkToManager(path: string) {
    return `${this.envService.get().managerUrl}${path}`;
  }
}
