import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as path from 'path';

import { EnvService } from 'environment/environment.service';
import { EmailData } from 'integrations/email/email.models';
import { OperatorDto } from 'dtos';

@Injectable()
export class EmailService {
  constructor(private readonly env: EnvService) {
    sgMail.setApiKey(env.get().sendGridApiKey!);
  }

  async sendEmail(to: string, { subject, content }: EmailData) {
    if (this.env.get().nodeEnv === 'development') {
      const outputPath = path.resolve(process.cwd(), 'test-emails');
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
      } else {
        fsExtra.emptyDirSync(outputPath);
      }

      fs.writeFileSync(
        path.resolve(outputPath, `${subject}.html`),
        content,
        'utf-8',
      );
    } else {
      await sgMail.send({
        from: this.env.get().fromEmail,
        to,
        subject,
        html: content,
      });
    }
  }

  async sendEmailToOperator(operator: OperatorDto, emailData: EmailData) {
    const address = operator.owner?.email || operator.email;

    await this.sendEmail(address, emailData);
  }
}
