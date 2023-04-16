import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

import { EnvService } from 'environment/environment.service';
import { EmailData } from 'integrations/email/email.models';

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
