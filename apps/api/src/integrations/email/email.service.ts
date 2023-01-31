import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

import { EmailData } from 'src/content/email';
import { EnvService } from 'src/environment/environment.service';

@Injectable()
export class EmailService {
  constructor(envService: EnvService) {
    sgMail.setApiKey(envService.get().sendGridApiKey!);
  }

  async sendEmail(to: string, { subject, content }: EmailData) {
    await sgMail.send({
      from: 'alastairzotos@gmail.com',
      to,
      subject,
      html: content,
    });
  }
}
