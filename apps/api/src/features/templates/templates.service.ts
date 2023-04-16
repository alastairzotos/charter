import handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import * as juice from 'juice';

import { Injectable } from "@nestjs/common";
import { EnvService } from "environment/environment.service";
import { BookingMadeUserProps } from 'features/templates/templates.models';
import { BookingDto } from 'dtos';
import { urls } from 'urls';
import { EmailData } from 'integrations/email/email.models';

@Injectable()
export class TemplatesService {
  private templatesPath = path.resolve(process.cwd(), 'templates');
  private styles = this.loadStyles();
  private templates = this.loadTemplates();

  constructor(private readonly env: EnvService) { }

  bookingMadeUser(booking: BookingDto): EmailData {
    return {
      subject: `Your booking with ${booking.operator.name}`,
      content: this.templates.bookingMadeUser({
        user: {
          name: booking.name,
        },
        operator: {
          name: booking.operator.name,
          url: `${this.env.get().frontendUrl}${urls.user.operator(booking.operator)}`
        },
        service: {
          name: booking.service.name,
          url: `${this.env.get().frontendUrl}${urls.user.service(booking.service)}`,
        },
        booking: {
          url: `${this.env.get().frontendUrl}${urls.user.booking(booking._id)}`
        }
      })
    }
  }

  private loadTemplates() {
    return {
      bookingMadeUser: this.compileTemplate<BookingMadeUserProps>('booking-made-user')
    }
  }

  private compileTemplate<T>(name: string) {
    return handlebars.compile<T>(this.readTemplateAndResolveStyles(name));
  }

  private readTemplateAndResolveStyles(name: string) {
    return juice(`
      <style>
        ${this.styles}
      </style>

      ${fs.readFileSync(path.resolve(this.templatesPath, `${name}.handlebars`), 'utf-8')}
    `)
  }

  private loadStyles() {
    return fs.readFileSync(path.resolve(this.templatesPath, 'styles.css'), 'utf-8');
  }
}
